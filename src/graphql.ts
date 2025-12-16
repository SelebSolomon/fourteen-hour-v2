
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignUpInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
}

export abstract class IMutation {
    abstract signup(signupInput: SignUpInput): SignUpResponse | Promise<SignUpResponse>;
}

export class SignUpResponse {
    email: string;
}

export class LoginResponse {
    accessToken: string;
}

type Nullable<T> = T | null;
