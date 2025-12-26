import { type Component, type JSX, Show, createSignal } from 'solid-js';

export type ResultStatus = 'idle' | 'success' | 'error' | 'warning';

export interface ResultDisplayProps {
  /** Title for the result section */
  title?: string;
  /** Result status */
  status: ResultStatus;
  /** Content to display */
  content: string | JSX.Element;
  /** Whether content is JSON that can be copied */
  isJson?: boolean;
  /** Whether to show copy button */
  showCopy?: boolean;
  /** Maximum height before scrolling */
  maxHeight?: string;
}

const ResultDisplay: Component<ResultDisplayProps> = (props) => {
  const [copied, setCopied] = createSignal(false);

  // White background with colored overlay effect
  const statusColors: Record<ResultStatus, string> = {
    idle: 'bg-white border-gray-300',
    success: 'bg-white border-success/50',
    error: 'bg-white border-error/50',
    warning: 'bg-white border-warning/50',
  };

  const statusOverlays: Record<ResultStatus, string> = {
    idle: '',
    success: 'bg-success/10',
    error: 'bg-error/10',
    warning: 'bg-warning/10',
  };

  const statusIcons: Record<ResultStatus, JSX.Element> = {
    idle: (
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg class="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  };

  const handleCopy = async () => {
    const text = typeof props.content === 'string' ? props.content : '';
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div class={`result-display rounded-lg border p-4 ${statusColors[props.status]} relative overflow-hidden`}>
      {/* Colored overlay */}
      <div class={`absolute inset-0 ${statusOverlays[props.status]} pointer-events-none`} />

      {/* Content */}
      <div class="relative">
        <Show when={props.title || props.showCopy}>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              {statusIcons[props.status]}
              <span class="font-medium text-sm">{props.title}</span>
            </div>
            <Show when={props.showCopy && typeof props.content === 'string'}>
              <button
                type="button"
                class="btn btn-xs bg-white border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={handleCopy}
              >
                {copied() ? (
                  <>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </Show>
          </div>
        </Show>
        <div
          class={`overflow-auto ${props.isJson ? 'font-mono text-sm' : ''}`}
          style={{ 'max-height': props.maxHeight ?? '300px' }}
        >
          <Show when={typeof props.content === 'string'} fallback={props.content}>
            <pre class="whitespace-pre-wrap wrap-break-word">{props.content as string}</pre>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
