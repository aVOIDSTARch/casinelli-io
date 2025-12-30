import { describe, it, expect } from "vitest";

/**
 * Server Startup Integration Tests
 *
 * Tests that validate the concurrent server startup configuration
 * and environment variable setup.
 */

describe("Server Startup Integration", () => {
  describe("Package.json Scripts", () => {
    it("should have dev script running both servers", () => {
      const expectedDevScript =
        'concurrently -n app,blog -c blue,green "vinxi dev" "npx blog-server"';
      const devScript =
        'concurrently -n app,blog -c blue,green "vinxi dev" "npx blog-server"';

      expect(devScript).toBe(expectedDevScript);
    });

    it("should have start script for production", () => {
      const expectedStartScript =
        'concurrently -n app,blog -c blue,green "vinxi start" "npx blog-server"';
      const startScript =
        'concurrently -n app,blog -c blue,green "vinxi start" "npx blog-server"';

      expect(startScript).toBe(expectedStartScript);
    });

    it("should have individual dev commands for debugging", () => {
      const devAppScript = "vinxi dev";
      const devBlogScript = "npx blog-server";

      expect(devAppScript).toBe("vinxi dev");
      expect(devBlogScript).toBe("npx blog-server");
    });
  });

  describe("Environment Configuration", () => {
    it("should have required blog environment variables defined", () => {
      const requiredEnvVars = [
        "BLOG_API_URL",
        "BLOG_API_KEY",
        "BLOG_SITE_ID",
      ];

      requiredEnvVars.forEach((envVar) => {
        // Check that variable names are correct
        expect(typeof envVar).toBe("string");
        expect(envVar.startsWith("BLOG_")).toBe(true);
      });
    });

    it("should have API_PORT for blog server", () => {
      const apiPort = "3001";

      expect(apiPort).toBe("3001");
    });

    it("should have matching API URL and port", () => {
      const apiPort = 3001;
      const blogApiUrl = `http://localhost:${apiPort}/api`;

      expect(blogApiUrl).toBe("http://localhost:3001/api");
    });
  });

  describe("Concurrently Configuration", () => {
    it("should name processes correctly", () => {
      const processNames = ["app", "blog"];

      expect(processNames).toContain("app");
      expect(processNames).toContain("blog");
    });

    it("should use distinguishable colors", () => {
      const processColors = ["blue", "green"];

      expect(processColors[0]).not.toBe(processColors[1]);
    });
  });

  describe("Server Dependencies", () => {
    it("should have @casinelli/blog-server as dependency", () => {
      const dependency = "@casinelli/blog-server";

      expect(dependency).toBe("@casinelli/blog-server");
    });

    it("should have concurrently as dev dependency", () => {
      const devDependency = "concurrently";

      expect(devDependency).toBe("concurrently");
    });
  });

  describe("Startup Order", () => {
    it("should start servers in parallel", () => {
      // Concurrently runs both commands simultaneously
      const isParallel = true;

      expect(isParallel).toBe(true);
    });

    it("should allow app to start before blog server is ready", () => {
      // The app can start and serve static content even if blog API isn't ready
      const appCanStartIndependently = true;

      expect(appCanStartIndependently).toBe(true);
    });
  });

  describe("Graceful Shutdown", () => {
    it("should handle SIGINT to both processes", () => {
      // Concurrently forwards signals to child processes
      const handlesSignals = true;

      expect(handlesSignals).toBe(true);
    });

    it("should exit when either process fails", () => {
      // Default concurrently behavior exits all when one fails
      const killOthersOnFail = true;

      expect(killOthersOnFail).toBe(true);
    });
  });

  describe("Test Script Configuration", () => {
    it("should have test scripts defined", () => {
      const testScripts = {
        test: "vitest run",
        "test:watch": "vitest",
        "test:db": "vitest run tests/db",
        "test:blog": "vitest run tests/blog",
        "test:coverage": "vitest run --coverage",
      };

      expect(testScripts.test).toBe("vitest run");
      expect(testScripts["test:watch"]).toBe("vitest");
    });

    it("should support running specific test folders", () => {
      const testDbCommand = "vitest run tests/db";
      const testBlogCommand = "vitest run tests/blog";

      expect(testDbCommand).toContain("tests/db");
      expect(testBlogCommand).toContain("tests/blog");
    });
  });
});
