import { createSignal, onMount, For } from 'solid-js';
import { runAllTests, type TestResult } from '~/styles/engine-test-suite';
import debugEngine from '~/styles/engine-test-suite/debugEngine';

export default function TestEngine() {
  const [results, setResults] = createSignal<TestResult[]>([]);
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    try {
      // Run debug first
      console.log('Running debug engine...');
      debugEngine();

      const testResults = runAllTests();
      setResults(testResults);
      console.log('Test Results:', testResults);
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setLoading(false);
    }
  });

  const passedCount = () => results().filter((r) => r.passed).length;
  const failedCount = () => results().filter((r) => !r.passed).length;

  return (
    <div style={{ padding: '20px', 'font-family': 'monospace', 'background-color': '#fff' }}>
      <h1 style={{ 'border-bottom': '1px solid #E1E1E1', 'padding-bottom': '10px' }}>
        Styling Engine Test Suite
      </h1>

      {loading() ? (
        <p>Running tests...</p>
      ) : (
        <>
          <div style={{ 'margin-bottom': '20px' }}>
            <strong>Summary: </strong>
            <span style={{ color: 'green' }}>{passedCount()} passed</span>,{' '}
            <span style={{ color: failedCount() > 0 ? 'red' : 'green' }}>
              {failedCount()} failed
            </span>
          </div>

          <For each={results()}>
            {(result) => (
              <div
                style={{
                  'margin-bottom': '20px',
                  padding: '15px',
                  border: '1px solid #E1E1E1',
                  'border-radius': '4px',
                  'background-color': result.passed ? '#f0fff0' : '#fff0f0',
                }}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>
                  {result.passed ? '✓' : '✗'} {result.testName}
                </h3>
                <p style={{ margin: '0 0 10px 0' }}>{result.message}</p>
                {result.data && (
                  <details>
                    <summary style={{ cursor: 'pointer' }}>View Data</summary>
                    <pre
                      style={{
                        'background-color': '#f5f5f5',
                        padding: '10px',
                        overflow: 'auto',
                        'max-height': '400px',
                        'font-size': '12px',
                      }}
                    >
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </For>
        </>
      )}
    </div>
  );
}
