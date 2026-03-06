# Structural Improvements Plan for casinelli.io

**Goal:** Host a blog and three pages that show off programs (one of which is JaySON).

---

## Current State Summary

| Area | Status |
|------|--------|
| **Homepage** | Header, 3 app cards (Color, Jayson, Theme UI), footer |
| **Navigation** | Home, Apps, Blog, Mission |
| **Programs** | JaySON fully built; Color & Theme UI are placeholders |
| **Blog** | Routes, components, DB schema exist; **`blog-api.ts` is missing** |
| **Mission** | Placeholder page |

---

## Major Structural Recommendations

### 1. Clarify Information Architecture

**Current:** Home → Apps (landing) → 3 app subpages. "Apps" is vague.

**Recommendation:** Use a clearer hierarchy:

```
Home
├── Blog
├── Programs (or "Projects")
│   ├── JaySON
│   ├── Color
│   └── Theme UI
└── Mission (optional)
```

- Rename **Apps** → **Programs** (or **Projects**) in nav and URLs.
- Make the Programs page a focused showcase for the three tools, not just a card grid.
- **Implemented:** Projects. Each project has its own set of pages exploring the application and demoing the project.
---

### 2. Make JaySON the Lead Program

JaySON is the only fully built program. Give it more prominence:

- **Homepage:** Larger or first card, or a short "Featured" section.
- **Programs page:** JaySON first, with a short description and link to the live tool.
- **Program detail pages:** JaySON page should include:
  - What it does
  - Features (Validator, Schema Info, Infer Schema, Generate Types, Transform)
  - Link to the live app
  - Link to the npm package (`@casinelli/jayson`)

Color and Theme UI can stay as "Coming soon" or minimal placeholders until they're ready.

---

### 3. Implement the Blog API

The blog UI expects `~/lib/blog-api` but that file is missing. You need:

- `src/lib/blog-api.ts` that:
  - Calls the blog server at `localhost:3001` (or your deployed URL)
  - Exports `fetchPublishedPosts()` and `fetchPostBySlug()`
  - Exports a `BlogPost` type

Until this exists, the blog will not work. The blog server is minimal; you'll need to either:

- Implement the blog server API (e.g. `/api/posts`, `/api/posts/:slug`), or
- Use a different backend (e.g. Supabase + Prisma) if you prefer to keep everything in the main app.

---

### 4. Programs Page Structure

**Current:** `/apps` is a card grid only.

**Recommendation:** Turn it into a proper Programs showcase:

- **Hero/intro:** "Tools and programs I've built."
- **Program cards:** Each with:
  - Name and short description
  - Status (Live / In development / Coming soon)
  - Link to the program page
- **JaySON:** Mark as "Live" and feature it first.
- **Color & Theme UI:** Mark as "In development" or "Coming soon" and keep links to their pages.

---

### 5. URL Structure

| Current | Recommended | Reason |
|---------|-------------|--------|
| `/apps` | `/programs` | Clearer purpose |
| `/apps/jayson` | `/programs/jayson` | Consistent with Programs section |
| `/apps/color` | `/programs/color` | Same |
| `/apps/theme-ui` | `/programs/theme-ui` | Same |

If you keep `/apps`, that's fine; the main change is making the Programs section feel intentional and consistent.

---

### 6. Mission Page

You mentioned "three pages that show off programs." If Mission is not one of them:

- Keep it in the nav if it's important for your brand.
- Or move it to the footer or About.
- Or remove it until you have content.

---

### 7. Homepage Layout

**Current:** Header → 3 app cards → footer.

**Recommendation:**

- **Above the fold:** Site title, short tagline, and primary actions (e.g. "View Programs", "Read Blog").
- **Programs section:** 3 program cards, with JaySON emphasized.
- **Blog teaser:** 2–3 latest posts or a "Read more" link.
- **Footer:** Nav links and any secondary info.

---

### 8. Program Detail Page Template

Use a shared structure for each program:

1. **Hero:** Name, one-line description, status badge.
2. **Description:** What it does and who it's for.
3. **Features:** Bullet list or short sections.
4. **Try it:** Link or embed to the live tool.
5. **Links:** Repo, npm, docs, etc.

JaySON can follow this now; Color and Theme UI can use a simplified "Coming soon" version.

---

## Priority Order

1. **Implement `blog-api.ts`** so the blog works.
2. **Upgrade the Programs page** into a real showcase.
3. **Improve the JaySON page** with description, features, and links.
4. **Rename Apps → Programs** (or Projects) if you want clearer IA.
5. **Refine the homepage** with clearer sections and CTAs.
6. **Decide on Mission** (keep, move, or remove).

---

## Quick Wins

- Add a "Featured" or "Live" badge to the JaySON card.
- Add a short "About" or "What I build" section on the homepage.
- Add an RSS feed for the blog once the API is in place.
- Add meta tags and Open Graph for blog posts and program pages.
