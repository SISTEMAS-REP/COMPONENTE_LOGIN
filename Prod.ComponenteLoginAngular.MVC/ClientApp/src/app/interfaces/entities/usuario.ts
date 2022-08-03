export class Usuario {
    id: number;
    username: string;
    password: string;
    name: string;
    token?: string;

    constructor(pid: number, pusername: string, pname: string ) {
        this.id = pid;
        this.username = pusername;
        this.name = pname;
    }
}
