import { type Component, createSignal, For, Show } from 'solid-js';
import JsonEditor from './JsonEditor';
import ResultDisplay, { type ResultStatus } from './ResultDisplay';
import { SAMPLE_SCHEMAS, SAMPLE_DATA } from './samples';

interface ValidationError {
  path: string;
  message: string;
  value?: unknown;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

const SchemaValidator: Component = () => {
  const [schema, setSchema] = createSignal('');
  const [data, setData] = createSignal('');
  const [result, setResult] = createSignal<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = createSignal(false);

  const validate = () => {
    setIsValidating(true);
    try {
      const schemaObj = JSON.parse(schema());
      const dataObj = JSON.parse(data());

      // Basic JSON Schema validation (simplified client-side implementation)
      const errors: ValidationError[] = [];
      validateObject(dataObj, schemaObj, '', errors);

      setResult({ valid: errors.length === 0, errors });
    } catch (e) {
      setResult({
        valid: false,
        errors: [{ path: '$', message: (e as Error).message }],
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Simple client-side validator (subset of JSON Schema)
  const validateObject = (
    data: unknown,
    schema: Record<string, unknown>,
    path: string,
    errors: ValidationError[]
  ) => {
    const schemaType = schema.type as string | string[] | undefined;

    // Type validation
    if (schemaType) {
      const types = Array.isArray(schemaType) ? schemaType : [schemaType];
      const actualType = getJsonType(data);

      // Check if type matches (handle integer as a subset of number)
      const typeMatches = types.some((t) => {
        if (t === 'integer') {
          return actualType === 'number' && Number.isInteger(data);
        }
        if (t === 'number') {
          return actualType === 'number';
        }
        return t === actualType;
      });

      if (!typeMatches && !(types.includes('null') && data === null)) {
        errors.push({
          path: path || '$',
          message: `Expected type "${types.join(' | ')}" but got "${actualType}"`,
          value: data,
        });
        return;
      }
    }

    // Object validation
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      const obj = data as Record<string, unknown>;
      const properties = schema.properties as Record<string, Record<string, unknown>> | undefined;
      const required = schema.required as string[] | undefined;

      // Check required fields
      if (required) {
        for (const field of required) {
          if (!(field in obj)) {
            errors.push({
              path: path ? `${path}.${field}` : field,
              message: `Required field "${field}" is missing`,
            });
          }
        }
      }

      // Validate each property
      if (properties) {
        for (const [key, value] of Object.entries(obj)) {
          if (properties[key]) {
            validateObject(value, properties[key], path ? `${path}.${key}` : key, errors);
          }
        }
      }
    }

    // Array validation
    if (Array.isArray(data)) {
      const items = schema.items as Record<string, unknown> | undefined;
      const minItems = schema.minItems as number | undefined;
      const maxItems = schema.maxItems as number | undefined;

      if (minItems !== undefined && data.length < minItems) {
        errors.push({
          path: path || '$',
          message: `Array must have at least ${minItems} items`,
          value: data.length,
        });
      }

      if (maxItems !== undefined && data.length > maxItems) {
        errors.push({
          path: path || '$',
          message: `Array must have at most ${maxItems} items`,
          value: data.length,
        });
      }

      if (items) {
        data.forEach((item, index) => {
          validateObject(item, items, `${path}[${index}]`, errors);
        });
      }
    }

    // String validation
    if (typeof data === 'string') {
      const minLength = schema.minLength as number | undefined;
      const maxLength = schema.maxLength as number | undefined;
      const pattern = schema.pattern as string | undefined;
      const enumValues = schema.enum as string[] | undefined;

      if (minLength !== undefined && data.length < minLength) {
        errors.push({
          path: path || '$',
          message: `String must be at least ${minLength} characters`,
          value: data.length,
        });
      }

      if (maxLength !== undefined && data.length > maxLength) {
        errors.push({
          path: path || '$',
          message: `String must be at most ${maxLength} characters`,
          value: data.length,
        });
      }

      if (pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(data)) {
          errors.push({
            path: path || '$',
            message: `String must match pattern "${pattern}"`,
            value: data,
          });
        }
      }

      if (enumValues && !enumValues.includes(data)) {
        errors.push({
          path: path || '$',
          message: `Value must be one of: ${enumValues.join(', ')}`,
          value: data,
        });
      }
    }

    // Number validation
    if (typeof data === 'number') {
      const minimum = schema.minimum as number | undefined;
      const maximum = schema.maximum as number | undefined;

      if (minimum !== undefined && data < minimum) {
        errors.push({
          path: path || '$',
          message: `Number must be at least ${minimum}`,
          value: data,
        });
      }

      if (maximum !== undefined && data > maximum) {
        errors.push({
          path: path || '$',
          message: `Number must be at most ${maximum}`,
          value: data,
        });
      }
    }
  };

  const getJsonType = (value: unknown): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };

  const getResultStatus = (): ResultStatus => {
    if (!result()) return 'idle';
    return result()!.valid ? 'success' : 'error';
  };

  const loadSample = (type: 'valid' | 'invalid') => {
    setSchema(JSON.stringify(SAMPLE_SCHEMAS.user, null, 2));
    setData(JSON.stringify(type === 'valid' ? SAMPLE_DATA.validUser : SAMPLE_DATA.invalidUser, null, 2));
    setResult(null);
  };

  const clear = () => {
    setSchema('');
    setData('');
    setResult(null);
  };

  return (
    <div class="schema-validator space-y-6">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-medium">JSON Schema Validator</h3>
        <p class="text-sm text-gray-600">
          Validate JSON data against a JSON Schema. Supports draft-07 features including
          type validation, required fields, patterns, and nested objects.
        </p>
      </div>

      <div class="flex gap-2 flex-wrap">
        <button class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700" onClick={() => loadSample('valid')}>
          Load Valid Sample
        </button>
        <button class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700" onClick={() => loadSample('invalid')}>
          Load Invalid Sample
        </button>
        <button class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700" onClick={clear}>
          Clear All
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <JsonEditor
          value={schema()}
          onChange={setSchema}
          label="JSON Schema"
          placeholder='{"type": "object", "properties": {...}}'
          minRows={15}
        />
        <JsonEditor
          value={data()}
          onChange={setData}
          label="Data to Validate"
          placeholder='{"name": "John", "age": 30}'
          minRows={15}
        />
      </div>

      <div class="flex justify-center">
        <button
          class="btn btn-primary btn-wide"
          onClick={validate}
          disabled={!schema().trim() || !data().trim() || isValidating()}
        >
          {isValidating() ? (
            <span class="loading loading-spinner loading-sm" />
          ) : (
            <>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Validate
            </>
          )}
        </button>
      </div>

      <Show when={result()}>
        <ResultDisplay
          title={result()!.valid ? 'Validation Passed' : 'Validation Failed'}
          status={getResultStatus()}
          showCopy={false}
          content={
            <div class="space-y-2">
              <Show when={result()!.valid}>
                <p class="text-success font-medium">
                  The data is valid according to the schema.
                </p>
              </Show>
              <Show when={!result()!.valid}>
                <p class="text-error font-medium mb-3">
                  Found {result()!.errors.length} validation error{result()!.errors.length !== 1 ? 's' : ''}:
                </p>
                <ul class="space-y-2">
                  <For each={result()!.errors}>
                    {(error) => (
                      <li class="bg-error/5 rounded p-3 border border-error/20">
                        <div class="font-mono text-sm text-error">{error.path}</div>
                        <div class="text-sm mt-1">{error.message}</div>
                        <Show when={error.value !== undefined}>
                          <div class="text-xs text-gray-500 mt-1">
                            Value: {JSON.stringify(error.value)}
                          </div>
                        </Show>
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </div>
          }
        />
      </Show>
    </div>
  );
};

export default SchemaValidator;
