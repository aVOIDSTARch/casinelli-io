import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * Blog Flow Integration Tests
 *
 * Tests the complete flow from API request to data display,
 * simulating real user interactions with the blog system.
 */

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  vi.resetModules();
  process.env = {
    ...originalEnv,
    BLOG_API_URL: "http://localhost:3001/api",
    BLOG_API_KEY: "test-api-key",
    BLOG_SITE_ID: "test-site-id",
  };
  mockFetch.mockReset();
});

afterEach(() => {
  process.env = originalEnv;
});

describe("Blog Integration Flow", () => {
  describe("Landing Page Flow", () => {
    it("should fetch and display multiple posts", async () => {
      const mockPosts = [
        {
          id: "1",
          title: "First Post",
          slug: "first-post",
          excerpt: "First excerpt",
          published_at: "2024-01-01T00:00:00Z",
          reading_time_minutes: 5,
        },
        {
          id: "2",
          title: "Second Post",
          slug: "second-post",
          excerpt: "Second excerpt",
          published_at: "2024-01-02T00:00:00Z",
          reading_time_minutes: 3,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: mockPosts,
          pagination: { page: 1, limit: 50, total: 2, totalPages: 1 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      const result = await fetchPublishedPosts({ limit: 50 });

      expect(result.data).toHaveLength(2);
      expect(result.data[0].title).toBe("First Post");
      expect(result.data[1].title).toBe("Second Post");
    });

    it("should handle empty blog state", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      const result = await fetchPublishedPosts();

      expect(result.data).toHaveLength(0);
    });

    it("should paginate through posts correctly", async () => {
      const page1Posts = Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        title: `Post ${i + 1}`,
        slug: `post-${i + 1}`,
        excerpt: `Excerpt ${i + 1}`,
        published_at: "2024-01-01T00:00:00Z",
        reading_time_minutes: 5,
      }));

      const page2Posts = Array.from({ length: 5 }, (_, i) => ({
        id: `${i + 11}`,
        title: `Post ${i + 11}`,
        slug: `post-${i + 11}`,
        excerpt: `Excerpt ${i + 11}`,
        published_at: "2024-01-01T00:00:00Z",
        reading_time_minutes: 5,
      }));

      // First page
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: page1Posts,
          pagination: { page: 1, limit: 10, total: 15, totalPages: 2 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      const result1 = await fetchPublishedPosts({ page: 1, limit: 10 });

      expect(result1.data).toHaveLength(10);
      expect(result1.pagination.totalPages).toBe(2);

      // Second page
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: page2Posts,
          pagination: { page: 2, limit: 10, total: 15, totalPages: 2 },
        }),
      });

      const result2 = await fetchPublishedPosts({ page: 2, limit: 10 });

      expect(result2.data).toHaveLength(5);
      expect(result2.pagination.page).toBe(2);
    });
  });

  describe("Post Detail Flow", () => {
    it("should navigate from list to individual post", async () => {
      const mockPostSummary = {
        id: "123",
        title: "Full Article",
        slug: "full-article",
        excerpt: "Short preview",
        published_at: "2024-01-15T00:00:00Z",
        reading_time_minutes: 10,
      };

      const mockPostFull = {
        ...mockPostSummary,
        content: "<h1>Full Article</h1><p>This is the complete content of the article.</p>",
        author_id: "author-1",
        status: "published",
        visibility: "public",
      };

      // First: fetch list including the post
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [mockPostSummary],
          pagination: { page: 1, limit: 50, total: 1, totalPages: 1 },
        }),
      });

      const { fetchPublishedPosts, fetchPostBySlug } = await import(
        "../../src/lib/blog-api"
      );
      const listResult = await fetchPublishedPosts();

      expect(listResult.data).toHaveLength(1);
      const postSlug = listResult.data[0].slug;
      expect(postSlug).toBe("full-article");

      // Then: fetch full post by slug (requires two calls: list then detail)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [mockPostFull],
          pagination: { page: 1, limit: 100, total: 1, totalPages: 1 },
        }),
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockPostFull }),
      });

      const fullPost = await fetchPostBySlug(postSlug);

      expect(fullPost).not.toBeNull();
      expect(fullPost?.content).toContain("<h1>Full Article</h1>");
      expect(fullPost?.content).toContain("complete content");
    });

    it("should handle post not found during navigation", async () => {
      // Simulate clicking a link to a deleted/unpublished post
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 100, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPostBySlug } = await import("../../src/lib/blog-api");
      const result = await fetchPostBySlug("deleted-post");

      expect(result).toBeNull();
    });
  });

  describe("Error Recovery Flow", () => {
    it("should recover from temporary API failure", async () => {
      // First request fails - fetchPublishedPosts throws on error
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        json: async () => ({ error: "Service temporarily unavailable" }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");

      await expect(fetchPublishedPosts()).rejects.toThrow("Service temporarily unavailable");

      // Retry succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [{ id: "1", title: "Post", slug: "post" }],
          pagination: { page: 1, limit: 50, total: 1, totalPages: 1 },
        }),
      });

      const successResult = await fetchPublishedPosts();

      expect(successResult.data).toHaveLength(1);
    });

    it("should throw on network timeout", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network timeout"));

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");

      await expect(fetchPublishedPosts()).rejects.toThrow("Network timeout");
    });
  });

  describe("Data Consistency", () => {
    it("should maintain consistent data format across requests", async () => {
      const expectedFields = [
        "id",
        "title",
        "slug",
        "excerpt",
        "published_at",
        "reading_time_minutes",
      ];

      const mockPost = {
        id: "1",
        title: "Test",
        slug: "test",
        excerpt: "Excerpt",
        content: "<p>Content</p>",
        published_at: "2024-01-01T00:00:00Z",
        reading_time_minutes: 5,
      };

      // List request
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [mockPost],
          pagination: { page: 1, limit: 50, total: 1, totalPages: 1 },
        }),
      });

      const { fetchPublishedPosts, fetchPostBySlug } = await import(
        "../../src/lib/blog-api"
      );
      const listResult = await fetchPublishedPosts();

      expectedFields.forEach((field) => {
        expect(listResult.data[0]).toHaveProperty(field);
      });

      // Detail request
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [mockPost],
          pagination: { page: 1, limit: 100, total: 1, totalPages: 1 },
        }),
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockPost }),
      });

      const detailResult = await fetchPostBySlug("test");

      expectedFields.forEach((field) => {
        expect(detailResult).toHaveProperty(field);
      });

      // Verify IDs match
      expect(listResult.data[0].id).toBe(detailResult?.id);
    });
  });

  describe("Authentication Flow", () => {
    it("should include API key in all requests", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      await fetchPublishedPosts();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "X-API-Key": "test-api-key",
          }),
        })
      );
    });

    it("should throw on invalid API key", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: "Invalid API key" }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");

      await expect(fetchPublishedPosts()).rejects.toThrow("Invalid API key");
    });
  });

  describe("URL Construction", () => {
    it("should use correct site ID in requests", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      await fetchPublishedPosts();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("test-site-id"),
        expect.any(Object)
      );
    });

    it("should construct proper query parameters", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      await fetchPublishedPosts({ page: 2, limit: 10, sort: "title", order: "asc" });

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain("page=2");
      expect(calledUrl).toContain("limit=10");
      expect(calledUrl).toContain("sort=title");
      expect(calledUrl).toContain("order=asc");
    });
  });
});
