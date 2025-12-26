import { type Component, type Setter, createSignal, createEffect, onMount } from 'solid-js';

export interface JsonEditorProps {
  /** Current JSON string value */
  value: string;
  /** Setter to update parent state */
  onChange: Setter<string> | ((value: string) => void);
  /** Placeholder text */
  placeholder?: string;
  /** Label for the editor */
  label?: string;
  /** Minimum number of rows for textarea */
  minRows?: number;
  /** Whether to show format button */
  showFormat?: boolean;
  /** Whether the editor is read-only */
  readOnly?: boolean;
}

const JsonEditor: Component<JsonEditorProps> = (props) => {
  const [error, setError] = createSignal<string | null>(null);
  const [isValid, setIsValid] = createSignal(true);
  let textareaRef: HTMLTextAreaElement | undefined;

  // Auto-resize textarea based on content
  const adjustHeight = () => {
    if (textareaRef) {
      // Reset height to auto to get correct scrollHeight
      textareaRef.style.height = 'auto';
      // Calculate minimum height based on minRows (default 10)
      const lineHeight = 20; // approximate line height in pixels
      const minHeight = (props.minRows ?? 10) * lineHeight;
      // Set height to max of scrollHeight or minHeight
      const newHeight = Math.max(textareaRef.scrollHeight, minHeight);
      textareaRef.style.height = `${newHeight}px`;
    }
  };

  onMount(() => {
    adjustHeight();
  });

  // Adjust height when value changes
  createEffect(() => {
    // Access value to track it
    props.value;
    // Use setTimeout to ensure DOM has updated
    setTimeout(adjustHeight, 0);
  });

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
        ref={textareaRef}
        class={`textarea textarea-bordered w-full font-mono text-sm bg-white text-gray-900 resize-none overflow-hidden ${
          !isValid() ? 'textarea-error' : 'border-gray-300'
        }`}
        style={{ 'min-height': `${(props.minRows ?? 10) * 20}px` }}
        placeholder={props.placeholder ?? 'Paste or type JSON here...'}
        value={props.value}
        onInput={(e) => {
          props.onChange(e.currentTarget.value);
          adjustHeight();
        }}
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
