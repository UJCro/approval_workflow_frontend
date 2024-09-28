export type TodoList = {
	id: string;
	userId: string;
	content: string;
	completed: boolean;
	subTasks: TodoList[] | [];
};
