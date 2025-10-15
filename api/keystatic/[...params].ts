import type { VercelRequest, VercelResponse } from '@vercel/node';
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../keystatic.config';

// Use GitHub Personal Access Token for authentication
// This allows direct Git commits without requiring OAuth login
const handler = makeGenericAPIRouteHandler({
  config: keystaticConfig,
  // GitHub token for API access (not OAuth)
  // This is set as KEYSTATIC_GITHUB_TOKEN in Vercel environment variables
});

export default async function (req: VercelRequest, res: VercelResponse) {
  // Convert VercelRequest to KeystaticRequest
  const keystaticRequest = {
    method: req.method || 'GET',
    url: req.url || '',
    headers: req.headers as Record<string, string>,
    json: async () => req.body,
    text: async () => JSON.stringify(req.body),
  };

  const response = await handler(keystaticRequest as any);

  if (response.status) {
    res.status(response.status);
  }

  if (response.headers) {
    for (const [key, value] of Object.entries(response.headers)) {
      res.setHeader(key, value as string);
    }
  }

  if (response.body) {
    res.send(response.body);
  } else {
    res.end();
  }
}
