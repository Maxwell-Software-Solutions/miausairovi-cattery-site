import type { VercelRequest, VercelResponse } from '@vercel/node';
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../keystatic.config';

// GitHub OAuth authentication for Keystatic
// Note: Use GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (without VITE_ prefix) in Vercel environment variables
const handler = makeGenericAPIRouteHandler({
  config: keystaticConfig,
  clientId: process.env.GITHUB_CLIENT_ID || process.env.VITE_GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET || process.env.VITE_GITHUB_CLIENT_SECRET,
});

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Keystatic API called:', {
      method: req.method,
      url: req.url,
      path: req.url?.split('?')[0],
      query: req.query,
    });

    // Construct the full URL with proper query parameters
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const fullUrl = `${protocol}://${host}${req.url}`;

    console.log('Full URL:', fullUrl);

    // Convert VercelRequest to KeystaticRequest
    const keystaticRequest = {
      method: req.method || 'GET',
      url: fullUrl,
      headers: req.headers as Record<string, string>,
      json: async () => req.body,
      text: async () => (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)),
    };

    const response = await handler(keystaticRequest as any);

    console.log('Keystatic response:', {
      status: response.status,
      headers: Object.keys(response.headers || {}),
    });

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
  } catch (error) {
    console.error('Keystatic API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined,
    });
  }
}
