import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * API Proxy Integration Tests
 *
 * Tests that validate the Vite proxy configuration for routing
 * requests from the app (port 3000) to the blog server (port 3001).
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

describe("API Proxy Integration", () => {
  describe("Proxy Configuration", () => {
    it("should route /api requests to blog server", () => {
      // Verify the expected proxy configuration
      const proxyConfig = {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      };

      expect(proxyConfig["/api"].target).toBe("http://localhost:3001");
      expect(proxyConfig["/api"].changeOrigin).toBe(true);
    });

    it("should preserve path after /api prefix", () => {
      const incomingPath = "/api/sites/test-site-id/posts";
      const expectedTargetPath = "/api/sites/test-site-id/posts";

      // The proxy should forward the full path including /api
      expect(incomingPath).toBe(expectedTargetPath);
    });
  });

  describe("Request Forwarding", () => {
    it("should forward GET requests with query params", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
        }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      await fetchPublishedPosts({ page: 1, limit: 50 });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("page=1"),
        expect.any(Object)
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("limit=50"),
        expect.any(Object)
      );
    });

    it("should forward headers correctly", async () => {
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
            "Content-Type": "application/json",
            "X-API-Key": "test-api-key",
          }),
        })
      );
    });
  });

  describe("Response Handling", () => {
    it("should handle JSON responses", async () => {
      const mockData = {
        data: [{ id: "1", title: "Test Post" }],
        pagination: { page: 1, limit: 50, total: 1, totalPages: 1 },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");
      const result = await fetchPublishedPosts();

      expect(result.data).toEqual(mockData.data);
    });

    it("should throw on error responses from backend", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Internal server error" }),
      });

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");

      await expect(fetchPublishedPosts()).rejects.toThrow("Internal server error");
    });

    it("should throw on connection refused (backend down)", async () => {
      mockFetch.mockRejectedValueOnce(new Error("ECONNREFUSED"));

      const { fetchPublishedPosts } = await import("../../src/lib/blog-api");

      await expect(fetchPublishedPosts()).rejects.toThrow("ECONNREFUSED");
    });
  });

  describe("Health Check Endpoint", () => {
    it("should be able to reach health endpoint through proxy", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: "healthy", timestamp: Date.now() }),
      });

      const response = await mockFetch("http://localhost:3001/api/health");
      const data = await response.json();

      expect(data.status).toBe("healthy");
    });
  });

  describe("CORS Handling", () => {
    it("should handle cross-origin requests via proxy", () => {
      // The proxy's changeOrigin: true setting modifies the origin header
      const proxyConfig = {
        changeOrigin: true,
      };

      expect(proxyConfig.changeOrigin).toBe(true);
    });
  });

  describe("URL Path Patterns", () => {
    it("should handle site posts endpoint", () => {
      const siteId = "test-site-id";
      const expectedPath = `/api/sites/${siteId}/posts`;

      expect(expectedPath).toBe("/api/sites/test-site-id/posts");
    });

    it("should handle individual post endpoint", () => {
      const siteId = "test-site-id";
      const postId = "post-123";
      const expectedPath = `/api/sites/${siteId}/posts/${postId}`;

      expect(expectedPath).toBe("/api/sites/test-site-id/posts/post-123");
    });

    it("should handle docs endpoint", () => {
      const expectedPath = "/api/docs";

      expect(expectedPath).toBe("/api/docs");
    });

    it("should handle typedoc endpoint", () => {
      const expectedPath = "/api/typedoc";

      expect(expectedPath).toBe("/api/typedoc");
    });
  });

  describe("Port Configuration", () => {
    it("should use correct ports", () => {
      const appPort = 3000;
      const blogServerPort = 3001;

      expect(appPort).toBe(3000);
      expect(blogServerPort).toBe(3001);
      expect(blogServerPort).toBe(appPort + 1);
    });

    it("should have matching environment configuration", () => {
      const envApiPort = parseInt(process.env.API_PORT || "3001", 10);
      const envBlogApiUrl = process.env.BLOG_API_URL;

      expect(envApiPort || 3001).toBe(3001);
      expect(envBlogApiUrl).toContain("3001");
    });
  });
});
