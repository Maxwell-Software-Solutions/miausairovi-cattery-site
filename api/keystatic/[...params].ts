import type { VercelRequest, VercelResponse } from '@vercel/node';
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../keystatic.config';

const handler = makeGenericAPIRouteHandler({
  config: keystaticConfig,
  clientId: process.env.VITE_GITHUB_CLIENT_ID,
  clientSecret: process.env.VITE_GITHUB_CLIENT_SECRET,
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
