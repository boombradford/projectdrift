# Project Drift

Project Drift is a real-data change monitor for PSI, CrUX, on-page SEO, and CTA shifts. It runs manual scans and compares the latest snapshot to the previous one, surfacing evidence-backed deltas and actions.

## Features
- Manual Drift runs (latest vs previous only)
- PSI lab metrics + CrUX field data
- On-page SEO + CTA extraction
- Evidence-first deltas and actions

## Development
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy
Deploy to `drift.fluxninelabs.com`.

## Notes
- Storage is in-memory for the MVP. A restart clears history.

## Environment
Create `.env.local` with:
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```
