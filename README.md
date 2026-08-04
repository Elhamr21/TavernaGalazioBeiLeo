# Taverna Galazio bei Leo — CMS Setup

## Prerequisites

- Node.js 20+ and an AWS account with credentials configured locally (`aws configure` or an SSO profile).
- AWS CLI installed (used once to create the admin user).

## 1. Install dependencies

```bash
npm install
```

## 2. Deploy the Amplify backend (Cognito, DynamoDB, S3)

```bash
npx ampx sandbox
```

This deploys a personal cloud sandbox to your AWS account and writes `amplify_outputs.json` to the repo root (gitignored — regenerated per environment). Leave it running in a terminal during local development; it hot-redeploys on save. For a shared/production backend, use `npx ampx pipeline-deploy` from CI instead (see [Amplify Hosting](https://docs.amplify.aws)).

## 3. Create the admin user

Self-signup is disabled — there's exactly one admin account, created via the AWS CLI. Get the User Pool ID from `amplify_outputs.json` → `auth.user_pool_id`.

```bash
aws cognito-idp admin-create-user \
  --user-pool-id <POOL_ID> \
  --username owner@example.com \
  --user-attributes Name=email,Value=owner@example.com Name=email_verified,Value=true \
  --message-action SUPPRESS \
  --temporary-password '<TempPassw0rd!>'

aws cognito-idp admin-add-user-to-group \
  --user-pool-id <POOL_ID> \
  --username owner@example.com \
  --group-name Admin
```

Then sign in once at `/login` with that email + temporary password — you'll be prompted to set a permanent password (the `admin-create-user` flow always forces this on first login).

## 4. Seed the initial content

The seed script mirrors the exact content that used to be hardcoded in the site (see `lib/content/defaults.ts`) into DynamoDB, and uploads the matching images from `public/` to S3. It signs in as the admin, so run it **after** step 3's first login (the permanent-password login) is complete.

```bash
# .env.local
SEED_ADMIN_EMAIL=owner@example.com
SEED_ADMIN_PASSWORD=<your permanent password>
```

```bash
npm run seed
```

Safe to re-run — already-seeded records/lists are skipped.

## 5. Run it

```bash
npm run dev      # local development
npm run build    # production build
```

Deploy to **AWS Amplify Hosting** by connecting this repo in the Amplify Console (it runs `ampx pipeline-deploy` then `next build` automatically on push), or run `npx ampx pipeline-deploy --branch <name> --app-id <id>` from your own CI.

## What's CMS-managed vs. what stays in code

Every visible text, image, and repeatable list (menu items, gallery images, reviews, events, experience features) shown on the **homepage** is editable from `/admin`. Deliberately **not** CMS-managed, per the project's content rules:

- The full printed menu at `/speisekarte` (static scanned PDF pages) — unchanged.
- Opening hours, SEO/meta tags, colors/fonts/layout, the secondary "Cafe La Vita" header logo, and all destination URLs (reservation widget, Google Maps links, etc.) — these stay in source code.
