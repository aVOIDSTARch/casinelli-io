/// <reference types="@solidjs/start/env" />

// Vite raw imports
declare module '*.css?raw' {
  const content: string;
  export default content;
}
