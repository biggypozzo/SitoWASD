# WASD — The Science of Control

Premium WASD Shop experience built with React, Vite, Framer Motion, Express, tRPC, Drizzle, and managed file storage.

## Run the downloaded ZIP locally

The ZIP intentionally does not include `node_modules`. After extracting it, run these commands from the project root:

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000` in the browser. If port 3000 is already in use, the server automatically selects the next available port and prints its URL in the terminal. You can also choose a port explicitly:

```bash
PORT=3001 pnpm dev
```

Requirements: Node.js 20 or newer and pnpm 10 or newer. The scripts use `cross-env`, so `pnpm dev` works in Windows Command Prompt, PowerShell, macOS, and Linux.

## What `ELIFECYCLE` means

`ELIFECYCLE` is only pnpm's final summary that a script exited with an error. The useful cause is always printed in the lines immediately above it. In a freshly extracted ZIP, the usual cause is a missing dependency because `pnpm install` has not been run yet. Install dependencies first, then retry `pnpm dev`.

If port 3000 is already in use, use the platform-specific syntax below:

```bash
# Windows Command Prompt
set PORT=3001&& pnpm dev

# Windows PowerShell
$env:PORT=3001; pnpm dev

# macOS / Linux
PORT=3001 pnpm dev
```

For a clean local verification:

```bash
pnpm install
pnpm check
pnpm test
pnpm build
pnpm dev
```

## Environment variables

The visual storefront works locally without authentication or database environment variables. Full-stack features such as Manus OAuth, database persistence, and managed storage require the environment variables supplied by the WebDev/Manus runtime, including `DATABASE_URL`, `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, `BUILT_IN_FORGE_API_URL`, and `BUILT_IN_FORGE_API_KEY`.

Do not commit real credentials or production `.env` files.

## Bundled visual assets

The crown logo and macro material image are included in `client/public/assets/` and are referenced through `/assets/...`, so they remain available after downloading and extracting the ZIP. User-submitted feedback attachments use the managed storage integration and require the full-stack runtime configuration.
## Deploy su Vercel

Questo progetto è configurato per Vercel come SPA Vite statica.

Build locale:

```bash
pnpm build
```

Output: `dist/public`

Per Vercel è sufficiente importare il repository/progetto. La configurazione in `vercel.json` imposta automaticamente il build command, la directory di output e il fallback SPA per le route di Wouter.

Per il server Express usato solo per l'esecuzione locale è disponibile `pnpm build:full`; `pnpm start` usa la build server-side locale. Vercel non utilizza il server Express per questa versione statica.

