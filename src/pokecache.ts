export type CacheEntry<T> = {
  val: T;
  createdAt: number;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  #reap() {
    const cutoff = Date.now() - this.#interval;

    this.#cache.forEach((value, key) => {
      if (value.createdAt < cutoff) {
        this.#cache.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      val,
      createdAt: Date.now(),
    });
  }

  get<T>(key: string) {
    return this.#cache.get(key);
  }

  stopReapLoop() {
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
