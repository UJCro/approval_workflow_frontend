import type { TodoList } from '@/types/todo';

/**
 * 부모 요소의 subTasks에 새로운 할 일을 추가하는 함수
 * @param todoList {TodoList[]} - 할 일 목록
 * @param parentId {string} - 부모 요소의 task id
 * @param newTask {TodoList} - 추가할 할 일
 * @returns {TodoList[]} - 서브 할 일이 추가된 할 일 목록
 */
export function onAddSubTodo(
	todoList: TodoList[],
	parentId: string | null,
	newTask: TodoList
): TodoList[] {
	return todoList.map((task) => {
		if (task.id === parentId) {
			const newSubTasks = task.subTasks ? [...task.subTasks, newTask] : [newTask];
			return { ...task, subTasks: newSubTasks };
		}
		if (task.subTasks && task.subTasks.length > 0) {
			return { ...task, subTasks: onAddSubTodo(task.subTasks, parentId, newTask) };
		}
		return task;
	});
}

/**
 * 할 일을 업데이트하는 함수
 * @param todoList {TodoList[]} - 할 일 목록
 * @param updatedTodo {TodoList} - 업데이트할 할 일
 * @returns {TodoList[]} - 상태가 업데이트된 할 일 목록
 */
export function onUpdateTodo(todoList: TodoList[], updatedTodo: TodoList): TodoList[] {
	return todoList.map((todo) => {
		if (todo.id === updatedTodo.id) {
			return { ...todo, completed: updatedTodo.completed };
		}
		if (todo.subTasks && todo.subTasks.length > 0) {
			return { ...todo, subTasks: onUpdateTodo(todo.subTasks, updatedTodo) };
		}
		return todo;
	});
}

/**
 * 할 일을 삭제하는 함수
 * @param todoList {TodoList[]} - 할 일 목록
 * @param taskId {string} - 삭제할 할 일의 task id
 * @returns {TodoList[]} - 삭제된 할 일이 제외된 할 일 목록
 */
export function onDeleteTodo(todoList: TodoList[], taskId: string): TodoList[] {
	return todoList.filter((todo) => {
		if (todo.id === taskId) {
			return false;
		}
		if (todo.subTasks && todo.subTasks.length > 0) {
			todo.subTasks = onDeleteTodo(todo.subTasks, taskId);
		}
		return true;
	});
}
