import { type Component, createSignal, For, Show, createMemo } from 'solid-js';
import JsonEditor from './JsonEditor';
import { SAMPLE_SCHEMAS, SCHEMA_LIST } from './samples';

interface SchemaInfo {
  title: string;
  description: string;
  rootType: string;
  requiredFields: string[];
  properties: PropertyInfo[];
}

interface PropertyInfo {
  name: string;
  type: string;
  description?: string;
  required: boolean;
  constraints: string[];
}

const SchemaInfoViewer: Component = () => {
  const [schema, setSchema] = createSignal('');
  const [selectedSample, setSelectedSample] = createSignal<keyof typeof SAMPLE_SCHEMAS | ''>('');

  const schemaInfo = createMemo<SchemaInfo | null>(() => {
    const schemaStr = schema().trim();
    if (!schemaStr) return null;

    try {
      const parsed = JSON.parse(schemaStr);
      return extractSchemaInfo(parsed);
    } catch {
      return null;
    }
  });

  const extractSchemaInfo = (schema: Record<string, unknown>): SchemaInfo => {
    const properties = schema.properties as Record<string, Record<string, unknown>> | undefined;
    const required = (schema.required as string[]) || [];

    const propertyInfos: PropertyInfo[] = [];

    if (properties) {
      for (const [name, prop] of Object.entries(properties)) {
        const constraints: string[] = [];

        // Collect constraints
        if (prop.minLength !== undefined) constraints.push(`minLength: ${prop.minLength}`);
        if (prop.maxLength !== undefined) constraints.push(`maxLength: ${prop.maxLength}`);
        if (prop.minimum !== undefined) constraints.push(`min: ${prop.minimum}`);
        if (prop.maximum !== undefined) constraints.push(`max: ${prop.maximum}`);
        if (prop.pattern) constraints.push(`pattern: ${prop.pattern}`);
        if (prop.enum) constraints.push(`enum: [${(prop.enum as string[]).join(', ')}]`);
        if (prop.minItems !== undefined) constraints.push(`minItems: ${prop.minItems}`);
        if (prop.maxItems !== undefined) constraints.push(`maxItems: ${prop.maxItems}`);

        propertyInfos.push({
          name,
          type: getTypeString(prop),
          description: prop.description as string | undefined,
          required: required.includes(name),
          constraints,
        });
      }
    }

    return {
      title: (schema.title as string) || 'Untitled Schema',
      description: (schema.description as string) || '',
      rootType: (schema.type as string) || 'unknown',
      requiredFields: required,
      properties: propertyInfos,
    };
  };

  const getTypeString = (prop: Record<string, unknown>): string => {
    const type = prop.type as string | string[] | undefined;

    if (!type) {
      if (prop.$ref) return `$ref: ${prop.$ref}`;
      if (prop.oneOf) return 'oneOf [...]';
      if (prop.anyOf) return 'anyOf [...]';
      return 'any';
    }

    if (Array.isArray(type)) {
      return type.join(' | ');
    }

    if (type === 'array' && prop.items) {
      const items = prop.items as Record<string, unknown>;
      return `array<${getTypeString(items)}>`;
    }

    if (type === 'object' && prop.properties) {
      return 'object {...}';
    }

    return type;
  };

  const loadSampleSchema = (name: keyof typeof SAMPLE_SCHEMAS) => {
    setSelectedSample(name);
    setSchema(JSON.stringify(SAMPLE_SCHEMAS[name], null, 2));
  };

  const clear = () => {
    setSchema('');
    setSelectedSample('');
  };

  return (
    <div class="schema-info space-y-6">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-medium">Schema Information</h3>
        <p class="text-sm text-gray-600">
          Analyze a JSON Schema to view its structure, properties, and constraints.
          This helps understand schema requirements before validating data.
        </p>
      </div>

      <div class="flex gap-2 flex-wrap items-center">
        <span class="text-sm text-gray-500">Load sample:</span>
        <For each={SCHEMA_LIST}>
          {(name) => (
            <button
              class={`btn btn-sm ${selectedSample() === name ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => loadSampleSchema(name)}
            >
              {name}
            </button>
          )}
        </For>
        <button class="btn btn-sm btn-ghost" onClick={clear}>
          Clear
        </button>
      </div>

      <JsonEditor
        value={schema()}
        onChange={setSchema}
        label="JSON Schema"
        placeholder="Paste a JSON Schema to analyze..."
        rows={10}
      />

      <Show when={schemaInfo()}>
        <div class="bg-base-100 border rounded-lg divide-y">
          {/* Header */}
          <div class="p-4">
            <h4 class="text-xl font-semibold">{schemaInfo()!.title}</h4>
            <Show when={schemaInfo()!.description}>
              <p class="text-gray-600 mt-1">{schemaInfo()!.description}</p>
            </Show>
            <div class="flex gap-4 mt-3 text-sm">
              <span class="badge badge-outline">Type: {schemaInfo()!.rootType}</span>
              <span class="badge badge-outline">
                {schemaInfo()!.properties.length} properties
              </span>
              <span class="badge badge-outline">
                {schemaInfo()!.requiredFields.length} required
              </span>
            </div>
          </div>

          {/* Properties Table */}
          <Show when={schemaInfo()!.properties.length > 0}>
            <div class="overflow-x-auto">
              <table class="table table-sm">
                <thead>
                  <tr class="bg-base-200">
                    <th>Property</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                    <th>Constraints</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={schemaInfo()!.properties}>
                    {(prop) => (
                      <tr>
                        <td class="font-mono text-sm font-medium">{prop.name}</td>
                        <td>
                          <code class="text-xs bg-base-200 px-2 py-1 rounded">
                            {prop.type}
                          </code>
                        </td>
                        <td>
                          {prop.required ? (
                            <span class="badge badge-error badge-sm">Required</span>
                          ) : (
                            <span class="badge badge-ghost badge-sm">Optional</span>
                          )}
                        </td>
                        <td class="text-sm text-gray-600 max-w-xs truncate">
                          {prop.description || '-'}
                        </td>
                        <td class="text-xs">
                          <Show when={prop.constraints.length > 0} fallback="-">
                            <div class="flex flex-wrap gap-1">
                              <For each={prop.constraints}>
                                {(c) => (
                                  <span class="badge badge-info badge-xs">{c}</span>
                                )}
                              </For>
                            </div>
                          </Show>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default SchemaInfoViewer;
