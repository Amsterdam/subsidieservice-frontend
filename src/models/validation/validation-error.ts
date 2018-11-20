export class ValidationError extends Error {

    constructor(public fieldName: string, message: string) {
        super(message);
        this.message = message;
        this.fieldName = fieldName;
    }
}