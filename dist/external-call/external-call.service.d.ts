export declare class ExternalApiCalls {
    axiosConfig: {
        headers: {
            'Content-Type': string;
            Accept: string;
        };
    };
    postData(url: string, dataToPost: unknown, headers?: Record<string, any>): Promise<any>;
    fetchData(url: string, headers?: Record<string, any>): Promise<any>;
}
