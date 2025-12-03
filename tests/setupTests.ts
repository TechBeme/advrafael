import "@testing-library/jest-dom/vitest";

// Mock viewport observers used by Motion in tests
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
    (window as any).IntersectionObserver = class IntersectionObserver {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    };
}
