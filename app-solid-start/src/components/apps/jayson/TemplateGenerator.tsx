import { type Component, createSignal, For, Show } from 'solid-js';
import JsonEditor from './JsonEditor';
import ResultDisplay from './ResultDisplay';
import { SAMPLE_SCHEMAS, SCHEMA_LIST } from './samples';

const TemplateGenerator: Component = () => {
  const [schema, setSchema] = createSignal('');
  const [template, setTemplate] = createSignal('');
  const [selectedSample, setSelectedSample] = createSignal<keyof typeof SAMPLE_SCHEMAS | ''>('');
  const [useDefaults, setUseDefaults] = createSignal(true);
  const [includeOptional, setIncludeOptional] = createSignal(false);

  const generateTemplate = () => {
    try {
      const parsed = JSON.parse(schema());
      const result = generateFromSchema(parsed, useDefaults(), includeOptional());
      setTemplate(JSON.stringify(result, null, 2));
    } catch (e) {
      setTemplate(`Error: ${(e as Error).message}`);
    }
  };

  const generateFromSchema = (
    schema: Record<string, unknown>,
    useDefaults: boolean,
    includeOptional: boolean
  ): unknown => {
    const type = schema.type as string | undefined;
    const defaultValue = schema.default;

    // Use default value if provided and option is enabled
    if (useDefaults && defaultValue !== undefined) {
      return defaultValue;
    }

    switch (type) {
      case 'object': {
        const obj: Record<string, unknown> = {};
        const properties = schema.properties as Record<string, Record<string, unknown>> | undefined;
        const required = (schema.required as string[]) || [];

        if (properties) {
          for (const [key, prop] of Object.entries(properties)) {
            const isRequired = required.includes(key);
            if (isRequired || includeOptional) {
              obj[key] = generateFromSchema(prop, useDefaults, includeOptional);
            }
          }
        }
        return obj;
      }

      case 'array': {
        const items = schema.items as Record<string, unknown> | undefined;
        if (items) {
          // Generate one sample item
          return [generateFromSchema(items, useDefaults, includeOptional)];
        }
        return [];
      }

      case 'string': {
        if (schema.enum) {
          return (schema.enum as string[])[0];
        }
        if (schema.format) {
          return getFormatExample(schema.format as string);
        }
        if (schema.pattern) {
          return `<matches: ${schema.pattern}>`;
        }
        return '';
      }

      case 'number':
      case 'integer': {
        const min = schema.minimum as number | undefined;
        const max = schema.maximum as number | undefined;
        if (min !== undefined) return min;
        if (max !== undefined) return Math.min(0, max);
        return 0;
      }

      case 'boolean':
        return false;

      case 'null':
        return null;

      default:
        return null;
    }
  };

  const getFormatExample = (format: string): string => {
    const examples: Record<string, string> = {
      'date-time': new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].split('.')[0],
      email: 'user@example.com',
      uri: 'https://example.com',
      uuid: '550e8400-e29b-41d4-a716-446655440000',
      hostname: 'example.com',
      ipv4: '127.0.0.1',
      ipv6: '::1',
    };
    return examples[format] || `<${format}>`;
  };

  const loadSampleSchema = (name: keyof typeof SAMPLE_SCHEMAS) => {
    setSelectedSample(name);
    setSchema(JSON.stringify(SAMPLE_SCHEMAS[name], null, 2));
    setTemplate('');
  };

  const clear = () => {
    setSchema('');
    setTemplate('');
    setSelectedSample('');
  };

  return (
    <div class="template-generator space-y-6">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-medium">Template Generator</h3>
        <p class="text-sm text-gray-600">
          Generate a template object from a JSON Schema. Useful for creating
          sample data or understanding the expected structure.
        </p>
      </div>

      <div class="flex gap-2 flex-wrap items-center">
        <span class="text-sm text-gray-500">Load sample:</span>
        <For each={SCHEMA_LIST}>
          {(name) => (
            <button
              class={`btn btn-sm ${selectedSample() === name ? 'btn-primary' : 'bg-white border-gray-400 hover:bg-gray-100 text-gray-700'}`}
              onClick={() => loadSampleSchema(name)}
            >
              {name}
            </button>
          )}
        </For>
        <button class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700" onClick={clear}>
          Clear
        </button>
      </div>

      {/* Options */}
      <div class="flex gap-6 p-4 bg-gray-200 rounded-lg">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            class="checkbox checkbox-sm"
            checked={useDefaults()}
            onChange={(e) => setUseDefaults(e.currentTarget.checked)}
          />
          <span class="text-sm">Use default values</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            class="checkbox checkbox-sm"
            checked={includeOptional()}
            onChange={(e) => setIncludeOptional(e.currentTarget.checked)}
          />
          <span class="text-sm">Include optional fields</span>
        </label>
      </div>

      <JsonEditor
        value={schema()}
        onChange={setSchema}
        label="JSON Schema"
        placeholder="Paste a JSON Schema to generate a template..."
        minRows={15}
      />

      <div class="flex justify-center">
        <button
          class="btn btn-primary btn-wide"
          onClick={generateTemplate}
          disabled={!schema().trim()}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Generate Template
        </button>
      </div>

      <Show when={template()}>
        <ResultDisplay
          title="Generated Template"
          status={template().startsWith('Error') ? 'error' : 'success'}
          content={template()}
          isJson={!template().startsWith('Error')}
          showCopy
          maxHeight="400px"
        />
      </Show>
    </div>
  );
};

export default TemplateGenerator;
