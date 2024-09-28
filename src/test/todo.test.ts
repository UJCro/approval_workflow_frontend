import type { TodoList } from '@/types/todo';
import { describe, it, expect, beforeEach } from 'vitest';
import { onAddSubTodo, onDeleteTodo, onUpdateTodo } from '@/utils/todo';

const TODO_LIST: TodoList[] = [
	{
		id: '1',
		userId: '1',
		content: 'Task 1',
		completed: false,
		subTasks: []
	},
	{
		id: '2',
		userId: '1',
		content: 'Task 2',
		completed: false,
		subTasks: [
			{
				id: '2-1',
				userId: '1',
				content: 'Sub Task 2-1',
				completed: false,
				subTasks: []
			}
		]
	}
];

describe('Todo Utils 테스트', () => {
	let todoList: TodoList[];

	beforeEach(() => {
		todoList = JSON.parse(JSON.stringify(TODO_LIST));
	});

	it('하위 할 일 추가 테스트', () => {
		const newTask = {
			id: '2-2',
			userId: '1',
			content: 'Sub Task 2-2',
			completed: false,
			subTasks: []
		};
		todoList = onAddSubTodo(todoList, '2', newTask);
		expect(todoList[1]?.subTasks).toContainEqual(newTask);
	});

	it('할 일 업데이트 테스트', () => {
		const updatedTask = {
			id: '2-1',
			userId: '1',
			content: 'Sub Task 2-1',
			completed: true,
			subTasks: []
		};
		todoList = onUpdateTodo(todoList, updatedTask);
		expect(todoList[1].subTasks[0].completed).toBe(true);
	});

	describe('할 일 삭제 테스트', () => {
		it('최상위 할 일 삭제 시 하위 삭제 테스트', () => {
			todoList = onDeleteTodo(todoList, '2');
			expect(todoList).toHaveLength(1);
		});

		it('하위 할 일 삭제 테스트', () => {
			todoList = onDeleteTodo(todoList, '2-1');
			expect(todoList[1].subTasks).toStrictEqual([]);
		});
	});
});
