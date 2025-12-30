/**
 * Blog Server Initialization Script
 *
 * This script initializes the blog server database and creates:
 * 1. An admin API key for full access
 * 2. A site for the blog
 *
 * Run with: npx tsx scripts/init-blog.ts
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { createApiKey, generateApiKey, hashApiKey } from "@casinelli/blog-server/src/lib/api-keys";

// Load environment variables
config({ path: ".env.local" });
config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }) as any;

async function main() {
  console.log("Initializing blog server...\n");

  try {
    // Check if there's already an admin API key
    const existingAdminKey = await prisma.api_keys.findFirst({
      where: { key_type: "admin" },
    });

    let adminApiKey: string;

    if (existingAdminKey) {
      console.log("Admin API key already exists.");
      console.log(`Key prefix: ${existingAdminKey.key_prefix}`);
      console.log("\nNote: The full key was only shown at creation. If you lost it, create a new one.\n");
      adminApiKey = ""; // Can't recover the original key
    } else {
      // Create admin API key
      console.log("Creating admin API key...");

      const generated = generateApiKey("admin");

      await prisma.api_keys.create({
        data: {
          name: "Admin API Key",
          description: "Full access admin key for blog management",
          key_prefix: generated.prefix,
          key_hash: generated.hash,
          key_type: "admin",
          scopes: ["admin"],
          rate_limit_per_minute: 1000,
          rate_limit_per_day: 100000,
        },
      });

      adminApiKey = generated.key;
      console.log("\n========================================");
      console.log("ADMIN API KEY (save this, shown only once!):");
      console.log(adminApiKey);
      console.log("========================================\n");
    }

    // Check if there's already a user (for site ownership)
    let user = await prisma.public_users.findFirst();

    if (!user) {
      console.log("Creating default user...");
      user = await prisma.public_users.create({
        data: {
          display_name: "Admin",
          email: "admin@casinelli.io",
          is_admin: true,
          is_verified: true,
        },
      });
      console.log(`User created: ${user.display_name}`);
    } else {
      console.log(`User already exists: ${user.display_name}`);
    }

    // Check if there's already a site
    const existingSite = await prisma.sites.findFirst();

    let siteId: string;

    if (existingSite) {
      console.log(`Site already exists: ${existingSite.name} (${existingSite.slug})`);
      siteId = existingSite.id;
    } else {
      // Create a default site
      console.log("Creating default site...");

      const site = await prisma.sites.create({
        data: {
          name: "Casinelli Blog",
          slug: "casinelli-blog",
          description: "Personal blog and thoughts",
          is_active: true,
          is_public: true,
          settings: {},
          owner_id: user.id,
        },
      });

      siteId = site.id;
      console.log(`\nSite created: ${site.name}`);
      console.log(`Site ID: ${site.id}`);
    }

    console.log("\n========================================");
    console.log("CONFIGURATION FOR .env:");
    console.log("========================================");
    console.log(`BLOG_SITE_ID=${siteId}`);
    if (adminApiKey) {
      console.log(`BLOG_API_KEY=${adminApiKey}`);
    } else {
      console.log("BLOG_API_KEY=<use existing key or create new one>");
    }
    console.log("========================================\n");

    console.log("Blog server initialization complete!");

  } catch (error) {
    console.error("Error during initialization:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
