import "@testing-library/jest-dom/vitest";

// Mock viewport observers used by Motion in tests
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
    const MockObserver: typeof IntersectionObserver = class IntersectionObserver {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    };

    (window as typeof window & { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
        MockObserver;
}
