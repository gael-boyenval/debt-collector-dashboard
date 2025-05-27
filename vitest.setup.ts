import '@testing-library/jest-dom/vitest'

if (typeof window !== 'undefined' && !window.ResizeObserver) {
    // Minimal mock for ResizeObserver
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.ResizeObserver = ResizeObserver;
    globalThis.ResizeObserver = ResizeObserver;
  }