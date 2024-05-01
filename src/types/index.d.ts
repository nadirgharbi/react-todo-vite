//USER
interface UserLogin {
	email: string;
	password: string;
}

interface UserRegister {
	fullName: string;
	email: string;
	password: string;
}

interface UserInfo {
	id?: number;
	fullName?: string;
	email?: string;
	password?: string;
}

//TODOS
interface Todos {
	id?: any;
	title: string;
	completed: number;
}

interface TodoUpdate {
	id?: any;
	title?: string;
	completed?: number;
}

interface TodoDelete {
	id?: any;
}
