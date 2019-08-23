


export interface IPrompt<T> {
    isInputFieldsNull: () => boolean;
    extractInputFields: () => T;
    add: (data: T) => any;
};