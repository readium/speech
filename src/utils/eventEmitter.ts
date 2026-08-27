// Isolates one listener's exception from the others and from the caller of emit() — a
// throwing listener must never stop the rest of the listeners for that event from running.
export class EventEmitter<K, E> {
  private listeners: Map<K, ((event: E) => void)[]> = new Map();

  on(type: K, callback: (event: E) => void): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(callback);

    return () => {
      const list = this.listeners.get(type);
      if (list) {
        const index = list.indexOf(callback);
        if (index > -1) {
          list.splice(index, 1);
        }
      }
    };
  }

  emit(type: K, event: E): void {
    const list = this.listeners.get(type);
    if (list) {
      list.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error(`Error in "${String(type)}" listener:`, error);
        }
      });
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}
