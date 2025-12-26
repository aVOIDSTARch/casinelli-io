// Sample schemas and data for the Jayson demo

export const SAMPLE_SCHEMAS = {
  user: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'User',
    description: 'A user profile object',
    type: 'object',
    required: ['name', 'email', 'age'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        description: 'The user\'s full name',
      },
      email: {
        type: 'string',
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        description: 'Email address',
      },
      age: {
        type: 'integer',
        minimum: 0,
        maximum: 150,
        description: 'Age in years',
      },
      role: {
        type: 'string',
        enum: ['admin', 'user', 'guest'],
        description: 'User role',
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        minItems: 0,
        maxItems: 10,
        description: 'User tags',
      },
      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          country: { type: 'string' },
        },
        required: ['city'],
      },
    },
  },

  product: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Product',
    description: 'A product in the catalog',
    type: 'object',
    required: ['id', 'name', 'price'],
    properties: {
      id: {
        type: 'string',
        pattern: '^[A-Z]{3}-[0-9]{4}$',
        description: 'Product ID (format: XXX-0000)',
      },
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
      },
      price: {
        type: 'number',
        minimum: 0,
        description: 'Price in USD',
      },
      category: {
        type: 'string',
        enum: ['electronics', 'clothing', 'food', 'books', 'other'],
      },
      inStock: {
        type: 'boolean',
      },
      variants: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            sku: { type: 'string' },
            color: { type: 'string' },
            size: { type: 'string' },
          },
          required: ['sku'],
        },
      },
    },
  },

  blogPost: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Blog Post',
    description: 'A blog post entry',
    type: 'object',
    required: ['title', 'content', 'author'],
    properties: {
      title: {
        type: 'string',
        minLength: 5,
        maxLength: 200,
      },
      slug: {
        type: 'string',
        pattern: '^[a-z0-9-]+$',
      },
      content: {
        type: 'string',
        minLength: 50,
      },
      author: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
        },
        required: ['name'],
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
      },
      published: {
        type: 'boolean',
      },
      publishedAt: {
        type: 'string',
      },
    },
  },
};

export const SAMPLE_DATA = {
  validUser: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    role: 'admin',
    tags: ['developer', 'nodejs'],
    address: {
      street: '123 Main St',
      city: 'New York',
      country: 'USA',
    },
  },

  invalidUser: {
    name: '',
    email: 'not-an-email',
    age: -5,
    role: 'superadmin',
    tags: 'should-be-array',
    address: {
      street: '123 Main St',
    },
  },

  validProduct: {
    id: 'PRD-1234',
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'electronics',
    inStock: true,
    variants: [
      { sku: 'WH-BLK', color: 'Black', size: 'Standard' },
      { sku: 'WH-WHT', color: 'White', size: 'Standard' },
    ],
  },

  invalidProduct: {
    id: '1234',
    name: '',
    price: -10,
    category: 'invalid-category',
  },

  sampleArray: [
    { id: 1, name: 'Item 1', active: true },
    { id: 2, name: 'Item 2', active: false },
    { id: 3, name: 'Item 3', active: true },
    { id: 4, name: 'Item 4', active: true },
    { id: 5, name: 'Item 5', active: false },
  ],
};

export const SCHEMA_LIST = Object.keys(SAMPLE_SCHEMAS) as Array<keyof typeof SAMPLE_SCHEMAS>;
