export interface TextChunk {
    text: string;
    offset: number;
}
export declare function chunkPlainText(text: string, maxLength: number): TextChunk[];
export declare function chunkSsmlText(text: string, maxLength: number): TextChunk[];
