export interface Todolist {
name:string,
userid?: number;
id?: number,
}

export interface ErrorFields {
    message: string,
    field: string, 
    value: string | number;
}