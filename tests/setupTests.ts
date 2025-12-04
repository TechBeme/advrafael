import "@testing-library/jest-dom/vitest";

// Mock viewport observers used by Motion in tests
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
    class MockIntersectionObserver implements IntersectionObserver {
        readonly root: Element | Document | null = null;
        readonly rootMargin: string = "";
        readonly thresholds: ReadonlyArray<number> = [];
        
        constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords(): IntersectionObserverEntry[] {
            return [];
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).IntersectionObserver = MockIntersectionObserver;
}
