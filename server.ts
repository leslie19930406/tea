import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());
app.use(cookieParser());

// Resolved host/App URL from env or runtime
const APP_URL =
  process.env.APP_URL ||
  'https://ais-dev-zwnnrbifzfmvbypdulbi63-608436014397.asia-east1.run.app';
const SHARED_APP_URL =
  'https://ais-pre-zwnnrbifzfmvbypdulbi63-608436014397.asia-east1.run.app';

function getRedirectUri(req: Request): string {
  // Client can specify redirect_uri or fallback to runtime APP_URL
  const queryRedirect = req.query.redirect_uri as string;
  if (queryRedirect) return queryRedirect;
  return `${APP_URL.replace(/\/+$/, '')}/auth/callback`;
}

function getGitHubToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  if (req.cookies && req.cookies.gh_token) {
    return req.cookies.gh_token;
  }
  return null;
}

// -------------------------------------------------------------
// Pu-erh Tea Foreign Trade Export Endpoints
// -------------------------------------------------------------

app.get('/puerh-tea-project.zip', (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'puerh-tea-project.zip');
  res.download(filePath, 'puerh-tea-project.zip');
});

app.get('/download/project-zip', (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'puerh-tea-project.zip');
  res.download(filePath, 'puerh-tea-project.zip');
});

app.post('/api/inquiry', (req: Request, res: Response) => {
  const { fullName, companyName, email, inquiryType, targetTeas, estimatedVolumeKg, preferredTradeTerm } = req.body;
  const referenceId = `YA-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
  
  console.log(`[Export Inquiry Received] Ref: ${referenceId} from ${companyName || 'Unknown'} (${fullName || 'Partner'}) for ${targetTeas?.join(', ') || 'General'}`);
  
  res.json({
    success: true,
    referenceId,
    receivedAt: new Date().toISOString(),
    status: 'DISPATCHED_TO_KUNMING_HUB',
    estimatedTurnaround: 'Within 12 hours',
    exportOffice: 'Kunming Comprehensive Bonded Zone Logistics Hub, Yunnan',
  });
});

app.get('/api/shipping/estimate', (req: Request, res: Response) => {
  const port = (req.query.port as string) || 'los-angeles';
  const mode = (req.query.mode as string) || 'air';
  res.json({
    port,
    mode,
    hsCode: '0902.40.90',
    originPort: 'Shenzhen Yantian / Guangzhou Nansha Port',
    phytosanitaryRequired: true,
    originCertificateType: 'Form A / RCEP / General CO',
  });
});

// -------------------------------------------------------------
// OAuth & Config Endpoints
// -------------------------------------------------------------

app.get('/api/auth/config', (req: Request, res: Response) => {
  const clientId = process.env.GITHUB_CLIENT_ID || null;
  const hasSecret = Boolean(process.env.GITHUB_CLIENT_SECRET);
  res.json({
    hasOAuthConfig: Boolean(clientId && hasSecret),
    clientId: clientId || null,
    devCallbackUrl: `${APP_URL.replace(/\/+$/, '')}/auth/callback`,
    sharedCallbackUrl: `${SHARED_APP_URL.replace(/\/+$/, '')}/auth/callback`,
    currentAppUrl: APP_URL,
  });
});

app.get('/api/auth/github/url', (req: Request, res: Response) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = getRedirectUri(req);

  if (!clientId) {
    return res.status(400).json({
      error: 'GITHUB_CLIENT_ID is not configured in environment variables.',
      instruction:
        'Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET, or connect using a Personal Access Token (PAT).',
    });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user,repo,user:email',
    state: Math.random().toString(36).substring(2, 15),
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.json({ url: authUrl, redirectUri });
});

// Callback handler supporting both /auth/callback and /auth/callback/
const callbackHandler = async (req: Request, res: Response) => {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code || typeof code !== 'string') {
    return res.status(400).send(`
      <html>
        <body style="background:#0d1117;color:#f85149;font-family:system-ui;padding:40px;text-align:center;">
          <h2>Authorization Failed</h2>
          <p>No authorization code received from GitHub.</p>
          <button onclick="window.close()" style="background:#238636;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">Close</button>
        </body>
      </html>
    `);
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (tokenData.error || !tokenData.access_token) {
      return res.status(400).send(`
        <html>
          <body style="background:#0d1117;color:#f85149;font-family:system-ui;padding:40px;text-align:center;">
            <h2>GitHub Authentication Error</h2>
            <p>${tokenData.error_description || tokenData.error || 'Failed to exchange token.'}</p>
            <button onclick="window.close()" style="background:#238636;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;margin-top:16px;">Close Window</button>
          </body>
        </html>
      `);
    }

    const accessToken = tokenData.access_token;

    // Secure cookie setup compliant with AI Studio iframe constraints:
    // secure: true and sameSite: 'none' are mandatory!
    res.cookie('gh_token', accessToken, {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>GitHub Connected</title>
        </head>
        <body style="background:#0d1117;color:#c9d1d9;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="background:#161b22;border:1px solid #30363d;border-radius:12px;padding:32px;text-align:center;max-width:420px;box-shadow:0 8px 24px rgba(0,0,0,0.5);">
            <svg style="width:48px;height:48px;fill:#2ea043;margin:0 auto 16px;" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <h3 style="color:#f0f6fc;margin:0 0 8px;font-size:20px;">GitHub Connected!</h3>
            <p style="color:#8b949e;font-size:14px;margin:0 0 20px;">Closing window and updating your dashboard...</p>
            <button onclick="window.close()" style="background:#21262d;border:1px solid #30363d;color:#c9d1d9;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:13px;">Close Window</button>
          </div>
          <script>
            try {
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', token: '${accessToken}' }, '*');
                setTimeout(() => {
                  window.close();
                }, 400);
              } else {
                window.location.href = '/';
              }
            } catch(e) {
              console.error(e);
            }
          </script>
        </body>
      </html>
    `);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).send(`
      <html>
        <body style="background:#0d1117;color:#f85149;font-family:system-ui;padding:40px;text-align:center;">
          <h2>Server Error</h2>
          <p>${message}</p>
        </body>
      </html>
    `);
  }
};

app.get(['/auth/callback', '/auth/callback/'], callbackHandler);

// -------------------------------------------------------------
// PAT & Manual Auth Endpoints
// -------------------------------------------------------------

app.post('/api/auth/pat', async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Personal Access Token is required' });
  }

  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        'User-Agent': 'GitHub-Connect-App',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userRes.ok) {
      return res.status(401).json({
        error: 'Invalid GitHub Token or insufficient permissions.',
      });
    }

    const user = await userRes.json();

    // Store in cookie
    res.cookie('gh_token', token.trim(), {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user,
      method: 'pat',
      token: token.trim(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('gh_token', {
    secure: true,
    sameSite: 'none',
    httpOnly: true,
  });
  res.json({ success: true });
});

// -------------------------------------------------------------
// GitHub API Proxy (prevents CORS and uses token if available)
// -------------------------------------------------------------

app.get('/api/github/user', async (req: Request, res: Response) => {
  const token = getGitHubToken(req);
  const username = req.query.username as string;

  if (!token && !username) {
    return res.status(401).json({ authenticated: false, error: 'Not authenticated' });
  }

  const endpoint = username
    ? `https://api.github.com/users/${encodeURIComponent(username)}`
    : 'https://api.github.com/user';

  const headers: Record<string, string> = {
    'User-Agent': 'GitHub-Connect-App',
    Accept: 'application/vnd.github.v3+json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const ghRes = await fetch(endpoint, { headers });
    if (!ghRes.ok) {
      const errData = await ghRes.json().catch(() => ({}));
      return res.status(ghRes.status).json({ error: errData.message || 'GitHub API error' });
    }
    const userData = await ghRes.json();
    res.json({
      authenticated: Boolean(token),
      user: userData,
      isTokenUser: Boolean(token && !username),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

app.get('/api/github/repos', async (req: Request, res: Response) => {
  const token = getGitHubToken(req);
  const username = req.query.username as string;
  const sort = (req.query.sort as string) || 'updated';
  const perPage = (req.query.per_page as string) || '30';
  const page = (req.query.page as string) || '1';

  let endpoint = `https://api.github.com/user/repos?sort=${sort}&per_page=${perPage}&page=${page}&affiliation=owner,collaborator`;

  if (username) {
    endpoint = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=${sort}&per_page=${perPage}&page=${page}`;
  } else if (!token) {
    return res.status(401).json({ error: 'Missing token or username parameter' });
  }

  const headers: Record<string, string> = {
    'User-Agent': 'GitHub-Connect-App',
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const ghRes = await fetch(endpoint, { headers });
    if (!ghRes.ok) {
      const err = await ghRes.json().catch(() => ({}));
      return res.status(ghRes.status).json({ error: err.message || 'Failed to fetch repositories' });
    }
    const repos = await ghRes.json();
    res.json(repos);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

app.get('/api/github/repos/:owner/:repo', async (req: Request, res: Response) => {
  const token = getGitHubToken(req);
  const { owner, repo } = req.params;
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;

  const headers: Record<string, string> = {
    'User-Agent': 'GitHub-Connect-App',
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const ghRes = await fetch(endpoint, { headers });
    if (!ghRes.ok) {
      const err = await ghRes.json().catch(() => ({}));
      return res.status(ghRes.status).json({ error: err.message || 'Repo not found' });
    }
    const data = await ghRes.json();
    res.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

app.get('/api/github/repos/:owner/:repo/readme', async (req: Request, res: Response) => {
  const token = getGitHubToken(req);
  const { owner, repo } = req.params;
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`;

  const headers: Record<string, string> = {
    'User-Agent': 'GitHub-Connect-App',
    Accept: 'application/vnd.github.html+json', // Fetches rendered HTML directly!
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const ghRes = await fetch(endpoint, { headers });
    if (!ghRes.ok) {
      return res.status(404).json({ error: 'README not found' });
    }
    const html = await ghRes.text();
    res.json({ html });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

app.get('/api/github/repos/:owner/:repo/commits', async (req: Request, res: Response) => {
  const token = getGitHubToken(req);
  const { owner, repo } = req.params;
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=15`;

  const headers: Record<string, string> = {
    'User-Agent': 'GitHub-Connect-App',
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const ghRes = await fetch(endpoint, { headers });
    if (!ghRes.ok) {
      return res.json([]);
    }
    const commits = await ghRes.json();
    res.json(commits);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

app.get('/api/github/events', async (req: Request, res: Response) => {
  const token = getGitHubToken(req);
  const username = req.query.username as string;

  if (!username && !token) {
    return res.status(400).json({ error: 'Username or token required' });
  }

  const endpoint = username
    ? `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=20`
    : `https://api.github.com/user/events?per_page=20`;

  const headers: Record<string, string> = {
    'User-Agent': 'GitHub-Connect-App',
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const ghRes = await fetch(endpoint, { headers });
    if (!ghRes.ok) {
      return res.json([]);
    }
    const events = await ghRes.json();
    res.json(events);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

// Star/Unstar a repository
app.post('/api/github/repos/:owner/:repo/star', async (req: Request, res: Response) => {
  const token = getGitHubToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication with star scope required' });
  }

  const { owner, repo } = req.params;
  const action = req.body.action === 'unstar' ? 'DELETE' : 'PUT';
  const endpoint = `https://api.github.com/user/starred/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;

  try {
    const ghRes = await fetch(endpoint, {
      method: action,
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'GitHub-Connect-App',
        Accept: 'application/vnd.github.v3+json',
        'Content-Length': '0',
      },
    });

    if (ghRes.status === 204) {
      res.json({ success: true, starred: action === 'PUT' });
    } else {
      const err = await ghRes.json().catch(() => ({}));
      res.status(ghRes.status).json({ error: err.message || 'Star action failed' });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

// -------------------------------------------------------------
// Vite Integration & Static Serving
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
