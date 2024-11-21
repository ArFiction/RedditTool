// Browser polyfill for the global object required by snoowrap
if (typeof global === 'undefined') {
  (window as any).global = window;
}