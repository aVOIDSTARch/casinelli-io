import { type Component, type Setter, createSignal, createEffect } from 'solid-js';

export interface JsonEditorProps {
  /** Current JSON string value */
  value: string;
  /** Setter to update parent state */
  onChange: Setter<string> | ((value: string) => void);
  /** Placeholder text */
  placeholder?: string;
  /** Label for the editor */
  label?: string;
  /** Number of rows for textarea */
  rows?: number;
  /** Whether to show format button */
  showFormat?: boolean;
  /** Whether the editor is read-only */
  readOnly?: boolean;
}

const JsonEditor: Component<JsonEditorProps> = (props) => {
  const [error, setError] = createSignal<string | null>(null);
  const [isValid, setIsValid] = createSignal(true);

  // Validate JSON on value change
  createEffect(() => {
    const val = props.value.trim();
    if (!val) {
      setError(null);
      setIsValid(true);
      return;
    }
    try {
      JSON.parse(val);
      setError(null);
      setIsValid(true);
    } catch (e) {
      setError((e as Error).message);
      setIsValid(false);
    }
  });

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(props.value);
      props.onChange(JSON.stringify(parsed, null, 2));
      setError(null);
      setIsValid(true);
    } catch (e) {
      setError((e as Error).message);
      setIsValid(false);
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(props.value);
      props.onChange(JSON.stringify(parsed));
      setError(null);
      setIsValid(true);
    } catch (e) {
      setError((e as Error).message);
      setIsValid(false);
    }
  };

  return (
    <div class="json-editor flex flex-col gap-2">
      {props.label && (
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">{props.label}</label>
          {props.showFormat !== false && !props.readOnly && (
            <div class="flex gap-2">
              <button
                type="button"
                class="btn btn-xs btn-ghost"
                onClick={handleFormat}
                disabled={!props.value.trim()}
              >
                Format
              </button>
              <button
                type="button"
                class="btn btn-xs btn-ghost"
                onClick={handleMinify}
                disabled={!props.value.trim()}
              >
                Minify
              </button>
            </div>
          )}
        </div>
      )}
      <textarea
        class={`textarea textarea-bordered w-full font-mono text-sm ${
          !isValid() ? 'textarea-error' : ''
        }`}
        rows={props.rows ?? 10}
        placeholder={props.placeholder ?? 'Paste or type JSON here...'}
        value={props.value}
        onInput={(e) => props.onChange(e.currentTarget.value)}
        readOnly={props.readOnly}
        spellcheck={false}
      />
      {error() && (
        <div class="text-xs text-error flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error()}
        </div>
      )}
    </div>
  );
};

export default JsonEditor;
