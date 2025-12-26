import { type Component, createSignal, For } from 'solid-js';
import SchemaValidator from './SchemaValidator';
import SchemaInfoViewer from './SchemaInfo';
import TemplateGenerator from './TemplateGenerator';
import TypeGenerator from './TypeGenerator';
import DataTransformer from './DataTransformer';

type TabId = 'validate' | 'info' | 'template' | 'types' | 'transform';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  description: string;
}

const TABS: Tab[] = [
  {
    id: 'validate',
    label: 'Validate',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    description: 'Validate JSON data against a schema',
  },
  {
    id: 'info',
    label: 'Schema Info',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    description: 'Analyze schema structure and properties',
  },
  {
    id: 'template',
    label: 'Template',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    description: 'Generate template objects from schema',
  },
  {
    id: 'types',
    label: 'Generate Types',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    description: 'Generate TypeScript or JavaScript code',
  },
  {
    id: 'transform',
    label: 'Transform',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    description: 'Extract, filter, and transform JSON data',
  },
];

const JaysonApp: Component = () => {
  const [activeTab, setActiveTab] = createSignal<TabId>('validate');

  const renderTabContent = () => {
    switch (activeTab()) {
      case 'validate':
        return <SchemaValidator />;
      case 'info':
        return <SchemaInfoViewer />;
      case 'template':
        return <TemplateGenerator />;
      case 'types':
        return <TypeGenerator />;
      case 'transform':
        return <DataTransformer />;
      default:
        return null;
    }
  };

  return (
    <div class="jayson-app">
      {/* Hero Section */}
      <div class="hero-section bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
              JaySON
            </h1>
            <p class="text-gray-600 max-w-2xl">
              A comprehensive JSON Schema toolkit for validation, type generation, and data transformation.
              Built on the{' '}
              <code class="bg-base-200 px-1 rounded text-sm">@casinelli/jayson</code>{' '}
              library supporting JSON Schema drafts 04, 06, 07, 2019-09, and 2020-12.
            </p>
          </div>
          <div class="flex gap-2">
            <a
              href="https://json-schema.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-lg btn-outline gap-2 text-base"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              JSON Schema
            </a>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <For each={TABS}>
          {(tab) => (
            <button
              class={`p-4 rounded-lg border transition-all text-left ${
                activeTab() === tab.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tab.icon} />
                </svg>
                <span class="font-medium">{tab.label}</span>
              </div>
              <p class={`text-xs leading-relaxed ${activeTab() === tab.id ? 'text-primary-foreground/80' : 'text-gray-500'}`}>
                {tab.description}
              </p>
            </button>
          )}
        </For>
      </div>

      {/* Tab Content */}
      <div class="rounded-lg border border-gray-300 p-6" style={{ "background-color": "#b3b3b3" }}>
        {renderTabContent()}
      </div>

      {/* Library Features */}
      <div class="mt-8 p-6 rounded-lg" style={{ "background-color": "#d9d9d9" }}>
        <h3 class="text-lg font-semibold mb-4">Library Capabilities</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-medium mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Schema Validation
            </h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>- Type checking (string, number, object, array)</li>
              <li>- Required field validation</li>
              <li>- Pattern matching (regex)</li>
              <li>- Range constraints (min/max)</li>
              <li>- Enum value validation</li>
              <li>- Nested object validation</li>
            </ul>
          </div>

          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-medium mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Code Generation
            </h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>- TypeScript interfaces</li>
              <li>- JavaScript ES5 classes</li>
              <li>- JSDoc annotations</li>
              <li>- Named/default exports</li>
              <li>- Validation methods</li>
              <li>- Template generation</li>
            </ul>
          </div>

          <div class="bg-white p-4 rounded-lg">
            <h4 class="font-medium mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Data Operations
            </h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>- Field extraction</li>
              <li>- Data filtering</li>
              <li>- Property mapping</li>
              <li>- Array sorting</li>
              <li>- File merging/splitting</li>
              <li>- Report generation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>
          Powered by{' '}
          <code class="bg-gray-200 px-1 rounded">@casinelli/jayson</code>
          {' '}- JSON Schema validation and manipulation library
        </p>
      </div>
    </div>
  );
};

export default JaysonApp;
