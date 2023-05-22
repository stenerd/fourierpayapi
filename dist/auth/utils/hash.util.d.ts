export declare const hashString: (text: string, salt?: number) => Promise<string>;
export declare const compareStringViaHash: (current: string, previous: string) => Promise<boolean>;
