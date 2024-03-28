import { afterEach, beforeEach, vi } from 'vitest';

beforeEach(async () => {
    vi.useFakeTimers();
});
afterEach(async () => {
    vi.clearAllTimers();
    vi.clearAllMocks();
});
