export interface Todolist {
name:string,
userid?: number;
id?: number,
}

export interface ErrorFields {
    message: string,
    field: string, 
    value: string | number | undefined;
}

export interface User {
    email: string;
    password: string;
    id?: number;
    salt?: string;
    createdAt?: Date;
  }
  