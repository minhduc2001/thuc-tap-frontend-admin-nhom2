export enum ERole {
	User = 'user',
	Admin = 'admin',
	Guest = 'guest',
}
export interface IUser {
	id: number;
	email: string;
	username: string;
	role: ERole;
	accessToken: string;
}
