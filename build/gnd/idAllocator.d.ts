export declare class IdAllocator {
    private claimed;
    private counters;
    allocate(prefix: string, isTaken: (id: string) => boolean): string;
    claim(id: string): boolean;
}
