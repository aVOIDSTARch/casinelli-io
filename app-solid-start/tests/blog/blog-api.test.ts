import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

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

describe("Blog API Client", () => {
  describe("fetchPublishedPosts", () => {
    it("should fetch published posts with default parameters", async () => {
      const mockPosts = [
        {
          id: "1",
          title: "Test Post",
          slug: "test-post",
          content: "Test content",
          excerpt: "Test excerpt",
          published_at: "2024-01-01T00:00:00Z",
          reading_time_minutes: 5,
          status: "published",
          visibility: "public",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: mockPosts,
          pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      const result = await fetchPublishedPosts();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/sites/test-site-id/posts"),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "X-API-Key": "test-api-key",
          }),
        })
      );
      expect(result.data).toEqual(mockPosts);
      expect(result.pagination.total).toBe(1);
    });

    it("should include status=published in query params", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      await fetchPublishedPosts();

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain("status=published");
    });

    it("should handle custom pagination options", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 2, limit: 10, total: 20, totalPages: 2 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      await fetchPublishedPosts({ page: 2, limit: 10 });

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain("page=2");
      expect(calledUrl).toContain("limit=10");
    });

    it("should handle API errors gracefully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Internal Server Error" }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");

      await expect(fetchPublishedPosts()).rejects.toThrow("Internal Server Error");
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");

      await expect(fetchPublishedPosts()).rejects.toThrow("Network error");
    });
  });

  describe("fetchPostBySlug", () => {
    it("should find and return a post by slug", async () => {
      const mockPost = {
        id: "123",
        title: "Test Post",
        slug: "test-post",
        content: "Full content here",
        excerpt: "Test excerpt",
        published_at: "2024-01-01T00:00:00Z",
        reading_time_minutes: 5,
        status: "published",
        visibility: "public",
      };

      // First call fetches all posts to find the slug
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [mockPost],
          pagination: { page: 1, limit: 100, total: 1, totalPages: 1 },
        }),
      });

      // Second call fetches the full post details
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockPost }),
      });

      const { fetchPostBySlug } = await import("../../src/lib/blog-api");
      const result = await fetchPostBySlug("test-post");

      expect(result).toEqual(mockPost);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("should return null when post is not found", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 100, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPostBySlug } = await import("../../src/lib/blog-api");
      const result = await fetchPostBySlug("non-existent-post");

      expect(result).toBeNull();
    });

    it("should return null on API error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server error" }),
      });

      const { fetchPostBySlug } = await import("../../src/lib/blog-api");
      const result = await fetchPostBySlug("test-post");

      expect(result).toBeNull();
    });
  });

  describe("fetchPostById", () => {
    it("should fetch a post by ID", async () => {
      const mockPost = {
        id: "123",
        title: "Test Post",
        slug: "test-post",
        content: "Full content",
        excerpt: "Test excerpt",
        published_at: "2024-01-01T00:00:00Z",
        reading_time_minutes: 5,
        status: "published",
        visibility: "public",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockPost }),
      });

      const { fetchPostById } = await import("../../src/lib/blog-api");
      const result = await fetchPostById("123");

      expect(result).toEqual(mockPost);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/posts/123",
        expect.any(Object)
      );
    });

    it("should return null when post is not found", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: "Post not found" }),
      });

      const { fetchPostById } = await import("../../src/lib/blog-api");
      const result = await fetchPostById("non-existent-id");

      expect(result).toBeNull();
    });
  });

  describe("API Key handling", () => {
    it("should include API key header when configured", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      await fetchPublishedPosts();

      const callOptions = mockFetch.mock.calls[0][1];
      expect(callOptions.headers["X-API-Key"]).toBe("test-api-key");
    });
  });
});
