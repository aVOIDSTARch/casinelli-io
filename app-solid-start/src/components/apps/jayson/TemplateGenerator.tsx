import { type Component, createSignal, Show } from 'solid-js';
import JsonEditor from './JsonEditor';
import ResultDisplay from './ResultDisplay';
import { SAMPLE_DATA } from './samples';

const TemplateGenerator: Component = () => {
  const [inputData, setInputData] = createSignal('');
  const [generatedSchema, setGeneratedSchema] = createSignal('');
  const [schemaTitle, setSchemaTitle] = createSignal('GeneratedSchema');
  const [markAllRequired, setMarkAllRequired] = createSignal(true);

  const inferSchema = () => {
    try {
      const parsed = JSON.parse(inputData());
      const schema = inferSchemaFromData(parsed, schemaTitle(), markAllRequired());
      setGeneratedSchema(JSON.stringify(schema, null, 2));
    } catch (e) {
      setGeneratedSchema(`Error: ${(e as Error).message}`);
    }
  };

  const inferSchemaFromData = (
    data: unknown,
    title: string,
    allRequired: boolean
  ): Record<string, unknown> => {
    const schema: Record<string, unknown> = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title,
    };

    const typeSchema = inferType(data, allRequired);
    Object.assign(schema, typeSchema);

    return schema;
  };

  const inferType = (data: unknown, allRequired: boolean): Record<string, unknown> => {
    if (data === null) {
      return { type: 'null' };
    }

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return { type: 'array', items: {} };
      }
      // Infer type from first item
      return {
        type: 'array',
        items: inferType(data[0], allRequired),
      };
    }

    switch (typeof data) {
      case 'string':
        return inferStringType(data);

      case 'number':
        return Number.isInteger(data) ? { type: 'integer' } : { type: 'number' };

      case 'boolean':
        return { type: 'boolean' };

      case 'object': {
        const obj = data as Record<string, unknown>;
        const properties: Record<string, unknown> = {};
        const required: string[] = [];

        for (const [key, value] of Object.entries(obj)) {
          properties[key] = inferType(value, allRequired);
          if (allRequired) {
            required.push(key);
          }
        }

        const result: Record<string, unknown> = {
          type: 'object',
          properties,
        };

        if (required.length > 0) {
          result.required = required;
        }

        return result;
      }

      default:
        return {};
    }
  };

  const inferStringType = (value: string): Record<string, unknown> => {
    // Detect common string formats
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const uriPattern = /^https?:\/\/.+/;
    const dateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (emailPattern.test(value)) {
      return { type: 'string', format: 'email' };
    }
    if (uriPattern.test(value)) {
      return { type: 'string', format: 'uri' };
    }
    if (dateTimePattern.test(value)) {
      return { type: 'string', format: 'date-time' };
    }
    if (datePattern.test(value)) {
      return { type: 'string', format: 'date' };
    }
    if (uuidPattern.test(value)) {
      return { type: 'string', format: 'uuid' };
    }

    return { type: 'string' };
  };

  const loadSample = (type: 'user' | 'product' | 'array') => {
    if (type === 'user') {
      setInputData(JSON.stringify(SAMPLE_DATA.validUser, null, 2));
      setSchemaTitle('User');
    } else if (type === 'product') {
      setInputData(JSON.stringify(SAMPLE_DATA.validProduct, null, 2));
      setSchemaTitle('Product');
    } else {
      setInputData(JSON.stringify(SAMPLE_DATA.sampleArray, null, 2));
      setSchemaTitle('ItemList');
    }
    setGeneratedSchema('');
  };

  const clear = () => {
    setInputData('');
    setGeneratedSchema('');
    setSchemaTitle('GeneratedSchema');
  };

  return (
    <div class="template-generator space-y-6">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-medium">Schema Inference</h3>
        <p class="text-sm text-gray-600">
          Generate a JSON Schema from sample data. Paste your test data and the tool
          will infer the schema structure, types, and formats automatically.
        </p>
      </div>

      <div class="flex gap-2 flex-wrap items-center">
        <span class="text-sm text-gray-500">Load sample data:</span>
        <button
          class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700"
          onClick={() => loadSample('user')}
        >
          User
        </button>
        <button
          class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700"
          onClick={() => loadSample('product')}
        >
          Product
        </button>
        <button
          class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700"
          onClick={() => loadSample('array')}
        >
          Array
        </button>
        <button class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700" onClick={clear}>
          Clear
        </button>
      </div>

      {/* Options */}
      <div class="flex gap-6 p-4 bg-gray-200 rounded-lg flex-wrap items-center">
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-700">Schema Title:</label>
          <input
            type="text"
            class="input input-sm input-bordered w-40"
            value={schemaTitle()}
            onInput={(e) => setSchemaTitle(e.currentTarget.value)}
          />
        </div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            class="checkbox checkbox-sm"
            checked={markAllRequired()}
            onChange={(e) => setMarkAllRequired(e.currentTarget.checked)}
          />
          <span class="text-sm">Mark all fields as required</span>
        </label>
      </div>

      <JsonEditor
        value={inputData()}
        onChange={setInputData}
        label="Sample Data (JSON)"
        placeholder='{"name": "John", "email": "john@example.com", "age": 30}'
        minRows={15}
      />

      <div class="flex justify-center">
        <button
          class="btn btn-primary btn-wide"
          onClick={inferSchema}
          disabled={!inputData().trim()}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Infer Schema
        </button>
      </div>

      <Show when={generatedSchema()}>
        <ResultDisplay
          title="Generated JSON Schema"
          status={generatedSchema().startsWith('Error') ? 'error' : 'success'}
          content={generatedSchema()}
          isJson={!generatedSchema().startsWith('Error')}
          showCopy
          maxHeight="400px"
        />
      </Show>
    </div>
  );
};

export default TemplateGenerator;
