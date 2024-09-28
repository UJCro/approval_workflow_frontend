export type SignUpUser = {
	userId: string;
	password: string;
	name: string;
};

export type User = Omit<SignUpUser, 'name'>;

export type Auth = {
	token: string;
};
