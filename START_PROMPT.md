# First-Time Setup

Follow these steps to make this project your own.

## 1. Rename the project

Replace **Billet** with the chosen project name across the codebase. This is a case-sensitive find-and-replace in the files listed below — "Billet" becomes the display name, "billet" becomes a kebab-case slug derived from it.

**Files to update:**

| File | What to change |
|------|---------------|
| `package.json` | `name` field → slug |
| `SECURITY.md` | "Billet" → display name in prose |
| `src/server/templates/home.tsx` | Page title |
| `src/server/templates/forms.tsx` | Page title |
| `src/server/templates/projects.tsx` | Page title |
| `src/server/components/layouts.tsx` | Logo text in `<span>Billet</span>` |

## 2. Remove original repo references

These are links specific to the original Billet repository. Remove or update them:

- `src/server/templates/home.tsx` — The "Get Started" button linking to `github.com/new?template_name=Billet`. Change the href to `/` or their own repo URL.
- `src/server/components/layouts.tsx` — The footer GitHub link (`github.com/alexpricedev/Billet`). Update to their repo URL or remove.
- `src/server/components/layouts.tsx` — The "Built by alexprice.dev" attribution. Remove or replace.

## 3. Rewrite the home page

The home page (`src/server/templates/home.tsx`) is currently a marketing landing page for the Billet starter. Replace this with a simple welcome page for their project. Keep it minimal — just a heading with the project name and a short description. They'll build their own home page from here.

## 4. Delete the stack page

Remove the stack page and all its associated files:

**Delete these files:**
- `src/server/templates/stack.tsx`
- `src/server/controllers/app/stack.tsx`
- `src/client/pages/stack.ts`
- `src/client/pages/stack.css`
- `src/client/pages/stack.test.ts`

**Remove references from:**
- `src/server/controllers/app/index.ts` — remove the `stack` barrel export
- `src/server/controllers/app/static.test.ts` — remove the stack test case
- `src/server/routes/app.tsx` — remove the `/stack` route entry and its import
- `src/server/components/nav.tsx` — remove the stack nav link
- `src/client/main.ts` — remove the stack import and `registerPage` call
- `src/client/style.css` — remove the `@import "./pages/stack.css"` line

## 5. Clean up the README

The README has marketing sections that should be stripped for a fork. Keep the useful reference sections, remove the sales pitch.

**Remove:**
- The logo, centered title, badges, TLDR quote, and "Get started" link (everything before the first `---`)
- "Why Billet?" section (etymology, philosophy, "when it isn't the right fit")
- "Built for AI Agents" section (architecture pitch, feedback stack table)
- The GitHub template link in Quick Start
- "Made with love in Sheffield" footer

**Keep:**
- What's Included
- Quick Start (but update to say `bun run dev` after cloning)
- Project Structure
- Contributing
- Deploy
- License

**Replace the header with:**

```markdown
# <Project Name>

A full-stack TypeScript app built with Bun.

---
```

Replace any remaining "Billet" references in the kept sections with the project name.

## 6. Verify

Run `bun run check` to make sure there are no lint or type errors from the changes. Then run `bun run test` to confirm all tests pass. Start the dev server with `bun run dev` and check it works at http://localhost:3333.
