import { type Component, createSignal, Show, For } from 'solid-js';
import JsonEditor from './JsonEditor';
import ResultDisplay from './ResultDisplay';
import { SAMPLE_DATA } from './samples';

type TransformOperation = 'extract' | 'filter' | 'transform' | 'sort';

interface FieldOption {
  name: string;
  selected: boolean;
}

const DataTransformer: Component = () => {
  const [data, setData] = createSignal('');
  const [operation, setOperation] = createSignal<TransformOperation>('extract');
  const [result, setResult] = createSignal('');

  // Extract fields state
  const [fields, setFields] = createSignal<FieldOption[]>([]);

  // Filter state
  const [filterField, setFilterField] = createSignal('');
  const [filterOperator, setFilterOperator] = createSignal<'eq' | 'neq' | 'gt' | 'lt' | 'contains'>('eq');
  const [filterValue, setFilterValue] = createSignal('');

  // Transform state
  const [transformExpression, setTransformExpression] = createSignal('');

  // Sort state
  const [sortField, setSortField] = createSignal('');
  const [sortOrder, setSortOrder] = createSignal<'asc' | 'desc'>('asc');

  // Parse data and detect fields
  const parseAndDetectFields = () => {
    try {
      const parsed = JSON.parse(data());
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (arr.length > 0 && typeof arr[0] === 'object') {
        const detectedFields = Object.keys(arr[0] as Record<string, unknown>);
        setFields(detectedFields.map((name) => ({ name, selected: false })));
        if (detectedFields.length > 0) {
          setFilterField(detectedFields[0]);
          setSortField(detectedFields[0]);
        }
      }
    } catch {
      setFields([]);
    }
  };

  const toggleField = (name: string) => {
    setFields((prev) =>
      prev.map((f) => (f.name === name ? { ...f, selected: !f.selected } : f))
    );
  };

  const executeTransform = () => {
    try {
      const parsed = JSON.parse(data());
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      let transformed: unknown[];

      switch (operation()) {
        case 'extract':
          transformed = extractFields(arr);
          break;
        case 'filter':
          transformed = filterData(arr);
          break;
        case 'transform':
          transformed = transformData(arr);
          break;
        case 'sort':
          transformed = sortData(arr);
          break;
        default:
          transformed = arr;
      }

      setResult(JSON.stringify(transformed, null, 2));
    } catch (e) {
      setResult(`Error: ${(e as Error).message}`);
    }
  };

  const extractFields = (arr: unknown[]): unknown[] => {
    const selectedFields = fields()
      .filter((f) => f.selected)
      .map((f) => f.name);

    if (selectedFields.length === 0) return arr;

    return arr.map((item) => {
      const obj = item as Record<string, unknown>;
      const extracted: Record<string, unknown> = {};
      for (const field of selectedFields) {
        if (field in obj) {
          extracted[field] = obj[field];
        }
      }
      return extracted;
    });
  };

  const filterData = (arr: unknown[]): unknown[] => {
    const field = filterField();
    const op = filterOperator();
    const val = filterValue();

    return arr.filter((item) => {
      const obj = item as Record<string, unknown>;
      const itemValue = obj[field];

      switch (op) {
        case 'eq':
          return String(itemValue) === val;
        case 'neq':
          return String(itemValue) !== val;
        case 'gt':
          return Number(itemValue) > Number(val);
        case 'lt':
          return Number(itemValue) < Number(val);
        case 'contains':
          return String(itemValue).toLowerCase().includes(val.toLowerCase());
        default:
          return true;
      }
    });
  };

  const transformData = (arr: unknown[]): unknown[] => {
    const expr = transformExpression().trim();
    if (!expr) return arr;

    // Simple property mapping: "newName: oldName, newName2: oldName2"
    const mappings = expr.split(',').map((m) => m.trim().split(':').map((s) => s.trim()));

    return arr.map((item) => {
      const obj = item as Record<string, unknown>;
      const transformed: Record<string, unknown> = {};

      for (const [newKey, oldKey] of mappings) {
        if (oldKey && oldKey in obj) {
          transformed[newKey] = obj[oldKey];
        } else if (!oldKey && newKey in obj) {
          transformed[newKey] = obj[newKey];
        }
      }

      return transformed;
    });
  };

  const sortData = (arr: unknown[]): unknown[] => {
    const field = sortField();
    const order = sortOrder();

    return [...arr].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[field];
      const bVal = (b as Record<string, unknown>)[field];

      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else {
        comparison = Number(aVal) - Number(bVal);
      }

      return order === 'asc' ? comparison : -comparison;
    });
  };

  const loadSample = () => {
    setData(JSON.stringify(SAMPLE_DATA.sampleArray, null, 2));
    setTimeout(parseAndDetectFields, 0);
  };

  const clear = () => {
    setData('');
    setResult('');
    setFields([]);
  };

  return (
    <div class="data-transformer space-y-6">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-medium">Data Transformer</h3>
        <p class="text-sm text-gray-600">
          Transform JSON arrays by extracting fields, filtering records, mapping properties, or sorting.
          Useful for data cleanup and reshaping.
        </p>
      </div>

      <div class="flex gap-2 flex-wrap">
        <button class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700" onClick={loadSample}>
          Load Sample Data
        </button>
        <button class="btn btn-sm bg-white border-gray-400 hover:bg-gray-100 text-gray-700" onClick={clear}>
          Clear
        </button>
      </div>

      <JsonEditor
        value={data()}
        onChange={(v: string) => {
          setData(v);
          parseAndDetectFields();
        }}
        label="Input Data (JSON Array)"
        placeholder='[{"id": 1, "name": "Item 1"}, ...]'
        minRows={15}
      />

      {/* Operation Selection */}
      <div class="p-4 bg-gray-200 rounded-lg space-y-4">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm font-medium text-gray-700">Operation:</span>
          <div class="join">
            <For each={['extract', 'filter', 'transform', 'sort'] as TransformOperation[]}>
              {(op) => (
                <button
                  class={`btn btn-sm join-item ${operation() === op ? 'btn-primary' : 'bg-white border-gray-400 text-gray-700'}`}
                  onClick={() => setOperation(op)}
                >
                  {op.charAt(0).toUpperCase() + op.slice(1)}
                </button>
              )}
            </For>
          </div>
        </div>

        {/* Extract Fields Options */}
        <Show when={operation() === 'extract' && fields().length > 0}>
          <div class="space-y-2">
            <span class="text-sm text-gray-600">Select fields to extract:</span>
            <div class="flex flex-wrap gap-2">
              <For each={fields()}>
                {(field) => (
                  <label class="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm checkbox-primary"
                      checked={field.selected}
                      onChange={() => toggleField(field.name)}
                    />
                    <span class="text-sm font-mono">{field.name}</span>
                  </label>
                )}
              </For>
            </div>
          </div>
        </Show>

        {/* Filter Options */}
        <Show when={operation() === 'filter' && fields().length > 0}>
          <div class="flex flex-wrap gap-3 items-center">
            <select
              class="select select-sm select-bordered"
              value={filterField()}
              onChange={(e) => setFilterField(e.currentTarget.value)}
            >
              <For each={fields()}>
                {(field) => <option value={field.name}>{field.name}</option>}
              </For>
            </select>

            <select
              class="select select-sm select-bordered"
              value={filterOperator()}
              onChange={(e) => setFilterOperator(e.currentTarget.value as typeof filterOperator extends () => infer T ? T : never)}
            >
              <option value="eq">equals</option>
              <option value="neq">not equals</option>
              <option value="gt">greater than</option>
              <option value="lt">less than</option>
              <option value="contains">contains</option>
            </select>

            <input
              type="text"
              class="input input-sm input-bordered w-40"
              placeholder="Value..."
              value={filterValue()}
              onInput={(e) => setFilterValue(e.currentTarget.value)}
            />
          </div>
        </Show>

        {/* Transform Options */}
        <Show when={operation() === 'transform'}>
          <div class="space-y-2">
            <span class="text-sm text-gray-600">
              Property mapping (format: newName: oldName, ...):
            </span>
            <input
              type="text"
              class="input input-bordered w-full font-mono text-sm"
              placeholder="userId: id, userName: name, isActive: active"
              value={transformExpression()}
              onInput={(e) => setTransformExpression(e.currentTarget.value)}
            />
          </div>
        </Show>

        {/* Sort Options */}
        <Show when={operation() === 'sort' && fields().length > 0}>
          <div class="flex flex-wrap gap-3 items-center">
            <span class="text-sm text-gray-600">Sort by:</span>
            <select
              class="select select-sm select-bordered"
              value={sortField()}
              onChange={(e) => setSortField(e.currentTarget.value)}
            >
              <For each={fields()}>
                {(field) => <option value={field.name}>{field.name}</option>}
              </For>
            </select>

            <div class="join">
              <button
                class={`btn btn-sm join-item ${sortOrder() === 'asc' ? 'btn-primary' : 'bg-white border-gray-400 text-gray-700'}`}
                onClick={() => setSortOrder('asc')}
              >
                Ascending
              </button>
              <button
                class={`btn btn-sm join-item ${sortOrder() === 'desc' ? 'btn-primary' : 'bg-white border-gray-400 text-gray-700'}`}
                onClick={() => setSortOrder('desc')}
              >
                Descending
              </button>
            </div>
          </div>
        </Show>
      </div>

      <div class="flex justify-center">
        <button
          class="btn btn-primary btn-wide"
          onClick={executeTransform}
          disabled={!data().trim()}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Transform
        </button>
      </div>

      <Show when={result()}>
        <ResultDisplay
          title="Transformed Data"
          status={result().startsWith('Error') ? 'error' : 'success'}
          content={result()}
          isJson={!result().startsWith('Error')}
          showCopy
          maxHeight="400px"
        />
      </Show>
    </div>
  );
};

export default DataTransformer;
