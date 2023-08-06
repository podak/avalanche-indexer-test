
export class RetryableError extends Error {
    public code: string = 'retriable';
    public name: string = 'retriable';
};
export class NonRetryableError extends Error {
    public code: string = 'non_retriable';
    public name: string = 'non_retriable';
};


