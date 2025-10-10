export type ValidationError = {
    /**
     * message and field for error
     */
    message: string;
    field: string;
}

export type ErrorResponse = {
    /**
     * response error messages
     */
    errorsMessages: ValidationError[];
}