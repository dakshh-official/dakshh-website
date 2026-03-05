const TTL_MS = 24 * 60 * 60 * 1000;

interface SessionRecord {
  userId: string;
  submittedAt: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __gameSessions: Map<string, SessionRecord> | undefined;
}

function getStore() {
  if (!globalThis.__gameSessions) {
    globalThis.__gameSessions = new Map<string, SessionRecord>();
  }
  return globalThis.__gameSessions;
}

function pruneExpired(store: Map<string, SessionRecord>) {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now - value.submittedAt > TTL_MS) {
      store.delete(key);
    }
  }
}

export function isSessionProcessed(sessionId: string): boolean {
  const store = getStore();
  pruneExpired(store);
  return store.has(sessionId);
}

export function markSessionProcessed(sessionId: string, userId: string): void {
  const store = getStore();
  pruneExpired(store);
  store.set(sessionId, { userId, submittedAt: Date.now() });
}
