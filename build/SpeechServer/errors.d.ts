export interface SpeechServerProblemDetails {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance?: string;
}
export declare class SpeechServerError extends Error {
    readonly status: number;
    readonly type?: string;
    readonly title?: string;
    readonly instance?: string;
    constructor(message: string, options: {
        status: number;
        type?: string;
        title?: string;
        instance?: string;
    });
}
export declare function toSpeechServerError(response: Response): Promise<SpeechServerError>;
