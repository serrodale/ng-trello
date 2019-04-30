export class UserForm {
    constructor(
        public username: string,
        public password: string,
    ) {}
}

export class UserCredentials {
    public username: string;
    public jwt: string;

    constructor(dto: any) {
        this.username = dto.username;
        this.jwt = dto.jwt;
    }
}