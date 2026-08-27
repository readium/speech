export declare class EventEmitter<K, E> {
    private listeners;
    on(type: K, callback: (event: E) => void): () => void;
    emit(type: K, event: E): void;
    clear(): void;
}
