export enum ERole {
	User = 'user',
	Admin = 'admin',
	Guest = 'guest',
}
export interface IUser {
	id: number;
	email: string;
	username?: string;
	phone?: string;
	role: ERole;
	accessToken: string;
	avatar?: string;
}
