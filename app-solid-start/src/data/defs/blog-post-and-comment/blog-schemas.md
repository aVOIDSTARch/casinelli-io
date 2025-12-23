# Blog Schemas Documentation

This directory contains JSON Schema definitions for a comprehensive blog system.

## Schemas

### blog-post.schema.json

The main schema for blog posts, supporting rich content, metadata, and interactions.

### comment.schema.json

Schema for threaded comments with moderation and reaction support.

---

## Blog Post Schema

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | uuid | Unique identifier |
| `title` | string | Post title (4-200 chars) |
| `slug` | string | URL-friendly identifier (kebab-case) |
| `content` | string | Main content body |
| `author` | object | Author information |
| `createdAt` | date-time | Creation timestamp |
| `status` | enum | Publication status |

### Content Fields

| Field | Type | Description |
|-------|------|-------------|
| `subtitle` | string | Optional subtitle (max 300 chars) |
| `description` | string | SEO summary (max 500 chars) |
| `excerpt` | string | Preview text (max 1000 chars) |
| `contentFormat` | enum | `html`, `markdown`, `mdx`, `plaintext` |
| `codeBlocks` | array | Code snippets with syntax highlighting |
| `tableOfContents` | object | Auto-generated TOC |

### Author & Contributors

```json
{
  "author": {
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Software developer",
    "website": "https://johndoe.com",
    "social": {
      "twitter": "johndoe",
      "github": "johndoe",
      "linkedin": "johndoe",
      "mastodon": "@johndoe@mastodon.social"
    }
  },
  "coAuthors": []
}
```

### Media

```json
{
  "featuredImage": {
    "url": "https://example.com/hero.jpg",
    "alt": "Hero image description",
    "caption": "Photo by Jane Doe",
    "credit": "Jane Doe Photography",
    "width": 1920,
    "height": 1080,
    "blurhash": "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
    "thumbnails": {
      "small": "https://example.com/hero-sm.jpg",
      "medium": "https://example.com/hero-md.jpg"
    }
  },
  "images": [],
  "embeds": [
    {
      "type": "youtube",
      "url": "https://youtube.com/watch?v=...",
      "caption": "Tutorial video"
    }
  ],
  "attachments": [
    {
      "url": "https://example.com/file.pdf",
      "filename": "guide.pdf",
      "mimeType": "application/pdf",
      "size": 1024000
    }
  ]
}
```

Supported embed types: `youtube`, `vimeo`, `twitter`, `codepen`, `codesandbox`, `gist`, `spotify`, `soundcloud`, `custom`

### Organization

```json
{
  "categories": ["Technology", "Web Development"],
  "tags": ["javascript", "react", "tutorial"],
  "series": {
    "name": "React Fundamentals",
    "part": 1,
    "totalParts": 5
  },
  "relatedPosts": ["uuid-1", "uuid-2"],
  "previousPost": "uuid-prev",
  "nextPost": "uuid-next"
}
```

### Status & Visibility

| Status | Description |
|--------|-------------|
| `draft` | Work in progress |
| `pending_review` | Awaiting approval |
| `scheduled` | Will publish at `scheduledAt` |
| `published` | Live and visible |
| `archived` | Hidden but preserved |
| `deleted` | Soft deleted |

| Visibility | Description |
|------------|-------------|
| `public` | Anyone can view |
| `private` | Only author can view |
| `password_protected` | Requires password |
| `members_only` | Registered users only |
| `paid` | Paid subscribers only |

### Timestamps

```json
{
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-16T14:00:00Z",
  "publishedAt": "2024-01-15T12:00:00Z",
  "scheduledAt": null
}
```

### SEO & Social

```json
{
  "seo": {
    "metaTitle": "Custom title for search engines",
    "metaDescription": "Custom description (max 160 chars)",
    "canonicalUrl": "https://example.com/original-post",
    "focusKeyword": "react tutorial",
    "noIndex": false,
    "noFollow": false,
    "structuredData": {}
  },
  "openGraph": {
    "title": "Title for Facebook/LinkedIn",
    "description": "Description for social sharing",
    "image": "https://example.com/og-image.jpg",
    "type": "article"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Title for Twitter",
    "description": "Description for Twitter",
    "image": "https://example.com/twitter-image.jpg"
  }
}
```

### Comments Configuration

```json
{
  "comments": [],
  "commentSettings": {
    "enabled": true,
    "moderation": "auto",
    "allowAnonymous": false,
    "requireApproval": false,
    "closeAfterDays": 90,
    "maxDepth": 3
  }
}
```

### Engagement & Stats

```json
{
  "reactions": {
    "enabled": true,
    "counts": {
      "like": 42,
      "love": 10,
      "clap": 5
    }
  },
  "stats": {
    "views": 1500,
    "uniqueViews": 1200,
    "likes": 42,
    "shares": 15,
    "bookmarks": 8,
    "commentCount": 12
  },
  "readingTime": {
    "minutes": 8,
    "words": 1600
  }
}
```

### Internationalization

```json
{
  "locale": "en-US",
  "translations": {
    "es": "uuid-spanish-version",
    "fr": "uuid-french-version"
  }
}
```

### Monetization

```json
{
  "sponsorship": {
    "isSponsored": true,
    "sponsor": "Acme Corp",
    "disclosureText": "This post is sponsored by Acme Corp"
  }
}
```

### Versioning

```json
{
  "revision": 3,
  "revisionHistory": [
    {
      "revision": 1,
      "changedAt": "2024-01-15T10:30:00Z",
      "changedBy": "user-123",
      "changeNote": "Initial draft"
    },
    {
      "revision": 2,
      "changedAt": "2024-01-15T14:00:00Z",
      "changedBy": "user-123",
      "changeNote": "Added code examples"
    }
  ]
}
```

### Custom Fields

For any additional metadata not covered by the schema:

```json
{
  "customFields": {
    "difficulty": "intermediate",
    "prerequisites": ["JavaScript basics"],
    "estimatedCost": 0
  }
}
```

---

## Comment Schema

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | uuid | Unique identifier |
| `postId` | uuid | Parent blog post ID |
| `content` | string | Comment text (1-10000 chars) |
| `createdAt` | date-time | When posted |
| `status` | enum | Moderation status |

### Threading

```json
{
  "parentId": "uuid-parent-comment",
  "rootId": "uuid-top-level-comment",
  "depth": 2,
  "replyCount": 3,
  "replies": []
}
```

### Author Types

**Registered User:**
```json
{
  "author": {
    "id": "user-123",
    "displayName": "John Doe",
    "username": "johndoe",
    "avatar": "https://example.com/avatar.jpg",
    "profileUrl": "https://example.com/users/johndoe",
    "isRegistered": true,
    "isVerified": true,
    "isModerator": false,
    "isAdmin": false,
    "badges": [
      { "type": "top_contributor", "label": "Top Contributor", "icon": "star" }
    ],
    "reputation": 1250
  }
}
```

**Anonymous User:**
```json
{
  "author": {
    "displayName": "Anonymous",
    "email": "anon@example.com",
    "website": "https://example.com",
    "isRegistered": false,
    "gravatarHash": "md5hash"
  }
}
```

### Moderation Status

| Status | Description |
|--------|-------------|
| `pending` | Awaiting review |
| `approved` | Visible to all |
| `spam` | Marked as spam |
| `rejected` | Denied by moderator |
| `deleted` | Removed |
| `flagged` | Reported by users |

### Reactions

```json
{
  "reactions": {
    "likes": 15,
    "dislikes": 2,
    "hearts": 5,
    "laughs": 3
  },
  "userReactions": [
    {
      "userId": "user-456",
      "type": "like",
      "createdAt": "2024-01-15T12:00:00Z"
    }
  ]
}
```

### Mentions & Attachments

```json
{
  "mentions": [
    {
      "userId": "user-789",
      "username": "janedoe",
      "startIndex": 10,
      "endIndex": 18
    }
  ],
  "attachments": [
    {
      "type": "image",
      "url": "https://example.com/screenshot.png",
      "thumbnailUrl": "https://example.com/screenshot-thumb.png",
      "alt": "Screenshot of the issue"
    }
  ]
}
```

### Moderation Data

```json
{
  "moderation": {
    "flags": [
      {
        "reason": "spam",
        "reportedBy": "user-123",
        "reportedAt": "2024-01-15T12:00:00Z",
        "details": "Promotional content"
      }
    ],
    "flagCount": 1,
    "spamScore": 0.15,
    "toxicityScore": 0.05,
    "moderatorNotes": [
      {
        "note": "Reviewed and approved",
        "moderatorId": "mod-001",
        "createdAt": "2024-01-15T13:00:00Z"
      }
    ],
    "actions": [
      {
        "action": "approved",
        "moderatorId": "mod-001",
        "timestamp": "2024-01-15T13:00:00Z",
        "reason": "Content is legitimate"
      }
    ]
  }
}
```

### Special Flags

```json
{
  "isPinned": false,
  "isAuthorReply": true,
  "isHighlighted": false,
  "isEdited": true,
  "editHistory": [
    {
      "content": "Original comment text",
      "editedAt": "2024-01-15T12:30:00Z",
      "reason": "Fixed typo"
    }
  ]
}
```

---

## Validation

Both schemas use JSON Schema Draft 2020-12. To validate:

```typescript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import blogPostSchema from './blog-post.schema.json';
import commentSchema from './comment.schema.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Add schemas
ajv.addSchema(commentSchema, 'comment.schema.json');
const validatePost = ajv.compile(blogPostSchema);

// Validate a post
const isValid = validatePost(postData);
if (!isValid) {
  console.error(validatePost.errors);
}
```

## TypeScript Types

Generate TypeScript types from the schemas:

```bash
npx json-schema-to-typescript blog-post.schema.json > blog-post.d.ts
npx json-schema-to-typescript comment.schema.json > comment.d.ts
```

Or manually define matching interfaces based on the schema structure.
