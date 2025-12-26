import { type Component, createSignal, For, Show, createMemo } from 'solid-js';
import JsonEditor from './JsonEditor';
import ResultDisplay from './ResultDisplay';
import { SAMPLE_SCHEMAS, SCHEMA_LIST } from './samples';

type OutputFormat = 'typescript' | 'javascript';

const TypeGenerator: Component = () => {
  const [schema, setSchema] = createSignal('');
  const [format, setFormat] = createSignal<OutputFormat>('typescript');
  const [selectedSample, setSelectedSample] = createSignal<keyof typeof SAMPLE_SCHEMAS | ''>('');
  const [exportStyle, setExportStyle] = createSignal<'named' | 'default'>('named');

  const generatedCode = createMemo(() => {
    const schemaStr = schema().trim();
    if (!schemaStr) return '';

    try {
      const parsed = JSON.parse(schemaStr);
      return format() === 'typescript'
        ? generateTypeScript(parsed, exportStyle())
        : generateJavaScript(parsed, exportStyle());
    } catch (e) {
      return `// Error: ${(e as Error).message}`;
    }
  });

  const generateTypeScript = (
    schema: Record<string, unknown>,
    exportStyle: 'named' | 'default'
  ): string => {
    const title = (schema.title as string) || 'GeneratedType';
    const interfaceName = toPascalCase(title);
    const description = schema.description as string | undefined;

    let code = '';

    // Add JSDoc if description exists
    if (description) {
      code += `/**\n * ${description}\n */\n`;
    }

    // Generate interface
    const exportKeyword = exportStyle === 'default' ? 'export default' : 'export';
    code += `${exportKeyword} interface ${interfaceName} {\n`;
    code += generateProperties(schema, '  ', true);
    code += '}\n';

    // Generate nested types if needed
    const nestedTypes = extractNestedTypes(schema, interfaceName);
    if (nestedTypes) {
      code = nestedTypes + '\n' + code;
    }

    return code;
  };

  const generateJavaScript = (
    schema: Record<string, unknown>,
    exportStyle: 'named' | 'default'
  ): string => {
    const title = (schema.title as string) || 'GeneratedType';
    const className = toPascalCase(title);
    const description = schema.description as string | undefined;

    let code = '';

    // Add JSDoc
    if (description) {
      code += `/**\n * ${description}\n */\n`;
    }

    // Generate class
    const exportKeyword = exportStyle === 'default' ? 'export default' : 'export';
    code += `${exportKeyword} class ${className} {\n`;

    const properties = schema.properties as Record<string, Record<string, unknown>> | undefined;
    if (properties) {
      // Constructor
      code += '  constructor(data = {}) {\n';
      for (const [name, prop] of Object.entries(properties)) {
        const defaultValue = getDefaultValue(prop);
        code += `    this.${name} = data.${name} ?? ${defaultValue};\n`;
      }
      code += '  }\n\n';

      // Static create method
      code += '  static create(data) {\n';
      code += `    return new ${className}(data);\n`;
      code += '  }\n\n';

      // Validate method
      code += '  validate() {\n';
      code += '    const errors = [];\n';
      const required = (schema.required as string[]) || [];
      for (const field of required) {
        code += `    if (this.${field} === undefined || this.${field} === null) {\n`;
        code += `      errors.push({ field: '${field}', message: 'Required field is missing' });\n`;
        code += '    }\n';
      }
      code += '    return { valid: errors.length === 0, errors };\n';
      code += '  }\n\n';

      // toJSON method
      code += '  toJSON() {\n';
      code += '    return {\n';
      for (const name of Object.keys(properties)) {
        code += `      ${name}: this.${name},\n`;
      }
      code += '    };\n';
      code += '  }\n';
    }

    code += '}\n';
    return code;
  };

  const generateProperties = (
    schema: Record<string, unknown>,
    indent: string,
    isTypeScript: boolean
  ): string => {
    const properties = schema.properties as Record<string, Record<string, unknown>> | undefined;
    const required = (schema.required as string[]) || [];

    if (!properties) return '';

    let code = '';
    for (const [name, prop] of Object.entries(properties)) {
      const isRequired = required.includes(name);
      const typeName = getTypeName(prop, isTypeScript);
      const optional = isRequired ? '' : '?';
      const description = prop.description as string | undefined;

      if (description) {
        code += `${indent}/** ${description} */\n`;
      }
      code += `${indent}${name}${optional}: ${typeName};\n`;
    }

    return code;
  };

  const getTypeName = (prop: Record<string, unknown>, isTypeScript: boolean): string => {
    const type = prop.type as string | undefined;

    if (!type) {
      if (prop.oneOf || prop.anyOf) return 'unknown';
      return 'unknown';
    }

    switch (type) {
      case 'string':
        if (prop.enum) {
          return (prop.enum as string[]).map((e) => `'${e}'`).join(' | ');
        }
        return 'string';

      case 'number':
      case 'integer':
        return 'number';

      case 'boolean':
        return 'boolean';

      case 'null':
        return 'null';

      case 'array': {
        const items = prop.items as Record<string, unknown> | undefined;
        if (items) {
          return `${getTypeName(items, isTypeScript)}[]`;
        }
        return 'unknown[]';
      }

      case 'object': {
        const nestedProps = prop.properties as Record<string, Record<string, unknown>> | undefined;
        if (nestedProps) {
          const innerProps = Object.entries(nestedProps)
            .map(([k, v]) => `${k}: ${getTypeName(v, isTypeScript)}`)
            .join('; ');
          return `{ ${innerProps} }`;
        }
        return 'Record<string, unknown>';
      }

      default:
        return 'unknown';
    }
  };

  const getDefaultValue = (prop: Record<string, unknown>): string => {
    const type = prop.type as string | undefined;
    const defaultVal = prop.default;

    if (defaultVal !== undefined) {
      return JSON.stringify(defaultVal);
    }

    switch (type) {
      case 'string':
        return "''";
      case 'number':
      case 'integer':
        return '0';
      case 'boolean':
        return 'false';
      case 'array':
        return '[]';
      case 'object':
        return '{}';
      default:
        return 'null';
    }
  };

  const extractNestedTypes = (
    _schema: Record<string, unknown>,
    _parentName: string
  ): string => {
    // Could be extended to generate separate interfaces for nested objects
    return '';
  };

  const toPascalCase = (str: string): string => {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
      .replace(/^./, (c) => c.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '');
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
    <div class="type-generator space-y-6">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-medium">Type Generator</h3>
        <p class="text-sm text-gray-600">
          Generate TypeScript interfaces or JavaScript classes from a JSON Schema.
          Useful for adding type safety to your code.
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
      <div class="flex gap-6 p-4 bg-gray-200 rounded-lg flex-wrap">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-700">Output:</span>
          <div class="join">
            <button
              class={`btn btn-sm join-item ${format() === 'typescript' ? 'btn-primary' : 'bg-white border-gray-400 text-gray-700'}`}
              onClick={() => setFormat('typescript')}
            >
              TypeScript
            </button>
            <button
              class={`btn btn-sm join-item ${format() === 'javascript' ? 'btn-primary' : 'bg-white border-gray-400 text-gray-700'}`}
              onClick={() => setFormat('javascript')}
            >
              JavaScript
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-700">Export:</span>
          <div class="join">
            <button
              class={`btn btn-sm join-item ${exportStyle() === 'named' ? 'btn-primary' : 'bg-white border-gray-400 text-gray-700'}`}
              onClick={() => setExportStyle('named')}
            >
              Named
            </button>
            <button
              class={`btn btn-sm join-item ${exportStyle() === 'default' ? 'btn-primary' : 'bg-white border-gray-400 text-gray-700'}`}
              onClick={() => setExportStyle('default')}
            >
              Default
            </button>
          </div>
        </div>
      </div>

      <JsonEditor
        value={schema()}
        onChange={setSchema}
        label="JSON Schema"
        placeholder="Paste a JSON Schema to generate types..."
        minRows={15}
      />

      <Show when={generatedCode()}>
        <ResultDisplay
          title={format() === 'typescript' ? 'TypeScript Interface' : 'JavaScript Class'}
          status={generatedCode().startsWith('// Error') ? 'error' : 'success'}
          content={generatedCode()}
          showCopy
          maxHeight="400px"
        />
      </Show>
    </div>
  );
};

export default TypeGenerator;
