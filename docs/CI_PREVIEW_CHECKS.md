# CI Preview Checks

This repository includes automated CI checks to catch preview issues early in pull requests.

## Workflows

### Playwright UI Checks (`.github/workflows/preview-ui.yml`)
Automated visual and behavior checks for the UI:
- DOM overlap detection
- Hover styles validation
- Responsive design checks at different breakpoints
- PNG usage detection (enforces SVG usage)
- Image dimensions for CLS prevention

### Lighthouse CI (`.github/workflows/lhci.yml`)
Performance and quality budgets:
- Cumulative Layout Shift (CLS) < 0.01
- Total page weight < 1.5MB
- Image size budget < 800KB
- Duplicate JavaScript detection
- Image optimization checks

### ESLint Custom Rules
Additional linting rules to enforce best practices:
- `custom/no-png-in-public`: Prevents PNG files in `/public/` directory (except favicon.png)
- `custom/use-design-tokens`: Warns about hardcoded color values, encourages CSS variables

## Running Locally

### Playwright Tests
```bash
npm run test          # Run all tests
npm run test:ui       # Run tests in UI mode
npm run test:debug    # Run tests in debug mode
```

### Lighthouse
```bash
npm run build
npm run preview       # In one terminal
npm run lighthouse:ci # In another terminal
```

### ESLint
```bash
npm run lint
```

## Test Configuration

- **Playwright Config**: `playwright.config.ts`
- **Lighthouse Config**: `lighthouserc.json`
- **ESLint Config**: `eslint.config.js`
- **Custom ESLint Rules**: `eslint-rules/`

## Usage in Pull Requests

When checks fail, use:
```
@copilot Please fix failing Playwright and Lighthouse checks on this PR.
```

## Notes

- Tests run automatically on pull requests
- Playwright report artifacts are uploaded on failure
- Lighthouse reports are stored temporarily via the action
- Custom ESLint rules help maintain code quality standards
