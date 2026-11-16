<p>Vite and TypeScript built React application utilized by Planning to manage project vesting lifecycles.</p>

<h1>Deployed</h1>
<a href="https://dev.franklintn.gov/vesting" target="_blank">https://dev.franklintn.gov/vesting</a>

<h1>API</h1>
https://api.franklin-gov.com/api/v2/eng | <a href="https://github.com/City-of-Franklin-IT/eng-api-ts" target="_blank">GitHub</a><br>
https://dev.franklintn.gov/api/v2/eng <em>Proxy</em><br>
<a href="https://dev.franklintn.gov/api/v2/eng/api-docs" target="_blank">API Docs</a>

<h1>Database</h1>
[COFDBV08].[project_vesting]


<h1>Configuration</h1>
<p>App settings (app base/title, Azure AD / Entra IDs, API and MCP URLs) live in <code>src/config.ts</code> and are imported where needed via <code>@/config</code>. There are no <code>.env</code> files. In development (<code>import.meta.env.DEV</code>) the API and MCP URLs point to <code>cofasv38</code> and auth is bypassed with <code>MOCK_TOKEN</code>. Production builds use the <code>dev.franklintn.gov</code> URLs, so changing them requires a rebuild.</p>

<h1>Docker</h1>
<p>The <code>Dockerfile</code> builds the app and serves it with nginx on port <code>6005</code> under <code>/vesting</code>.</p>
<pre>docker build -t ghcr.io/city-of-franklin-it/project-vesting-vite-ts:1.0.0 .
docker compose -f deploy/docker-compose.yml up -d</pre>
<p>The app is then available at <code>http://localhost:6005/vesting/</code>.</p>

<h1>Development</h1>
<pre>npm ci          # npm 11 recommended; npm 10.9.x can crash resolving vitest 4.1.x
npm run dev     # dev server
npm run build   # tsc + vite build
npm run test    # vitest</pre>
