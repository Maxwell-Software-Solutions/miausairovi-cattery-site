import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: ['html', 'json'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  try {
    const runnerResult = await lighthouse(url, options);

    // Extract scores
    const { lhr } = runnerResult;
    const scores = {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
      seo: Math.round(lhr.categories.seo.score * 100),
    };

    console.log('\n=== Lighthouse Scores ===');
    console.log(`Performance: ${scores.performance}`);
    console.log(`Accessibility: ${scores.accessibility}`);
    console.log(`Best Practices: ${scores.bestPractices}`);
    console.log(`SEO: ${scores.seo}`);
    console.log(
      `Average: ${Math.round((scores.performance + scores.accessibility + scores.bestPractices + scores.seo) / 4)}`
    );
    console.log('========================\n');

    // Save HTML report
    const reportHtml = runnerResult.report[0];
    const reportPath = join(__dirname, '..', 'lighthouse-report.html');
    writeFileSync(reportPath, reportHtml);
    console.log(`HTML report saved to: ${reportPath}`);

    // Save JSON report
    const reportJson = runnerResult.report[1];
    const jsonPath = join(__dirname, '..', 'lighthouse-report.json');
    writeFileSync(jsonPath, reportJson);
    console.log(`JSON report saved to: ${jsonPath}`);

    // List key issues
    console.log('\n=== Key Issues to Fix ===');

    const audits = lhr.audits;
    const issues = [];

    Object.keys(audits).forEach((key) => {
      const audit = audits[key];
      if (audit.score !== null && audit.score < 1 && audit.score !== undefined) {
        issues.push({
          title: audit.title,
          score: audit.score,
          displayValue: audit.displayValue,
          description: audit.description,
        });
      }
    });

    // Sort by score (lowest first)
    issues.sort((a, b) => a.score - b.score);

    // Show top 10 issues
    issues.slice(0, 10).forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.title} (Score: ${Math.round(issue.score * 100)})`);
      if (issue.displayValue) {
        console.log(`   ${issue.displayValue}`);
      }
    });
    console.log('========================\n');

    return scores;
  } catch (error) {
    console.error('Lighthouse audit failed:', error);
    throw error;
  } finally {
    await chrome.kill();
  }
}

// Run the audit
const url = process.env.LIGHTHOUSE_URL || 'http://localhost:4173';
console.log(`Running Lighthouse audit on: ${url}\n`);

runLighthouse(url)
  .then((scores) => {
    const avgScore = Math.round((scores.performance + scores.accessibility + scores.bestPractices + scores.seo) / 4);
    if (avgScore >= 90) {
      console.log('✅ Excellent scores! Average: ' + avgScore);
      process.exit(0);
    } else if (avgScore >= 75) {
      console.log('⚠️  Good scores, but room for improvement. Average: ' + avgScore);
      process.exit(0);
    } else {
      console.log('❌ Scores need improvement. Average: ' + avgScore);
      process.exit(0);
    }
  })
  .catch((error) => {
    console.error('Failed to run Lighthouse:', error);
    process.exit(1);
  });
