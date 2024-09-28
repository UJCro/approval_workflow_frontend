<script lang="ts">
	import type { TodoList } from '@/types/todo';
	import Clickable from '@/commons/Clickable.svelte';
	import Icon from '@iconify/svelte';
	import TodoItem from './TodoItem.svelte';
	import client from '@/lib/apolloClient';
	import { DELETE_TASK, PATCH_TASK } from '@/apis/graphql';
	import { onDeleteTodo, onUpdateTodo } from '@/utils/todo';
	import type { Writable } from 'svelte/store';

	export let todo: TodoList;
	export let todoList: Writable<TodoList[]>;
	export let parentId: string | null;
	export let setParentId: (id: string | null) => void;
	export let depth: number = 0;

	/**
	 * todo의 completed 상태를 업데이트하는 함수
	 * @param {Todo} todo - 업데이트할 todo
	 */
	async function handleUpdate(todo: TodoList) {
		try {
			const { data } = await client.mutate({
				mutation: PATCH_TASK,
				variables: {
					updateTaskInput: {
						id: todo.id,
						completed: !todo.completed
					}
				}
			});

			if (data) {
				todoList.update((currentTodoList) => onUpdateTodo(currentTodoList, data.updateTask));
			}
		} catch (error) {
			throw new Error('할 일 수정 실패');
		}
	}

	/**
	 * todo를 삭제하는 함수
	 * @param taskId {string} - 삭제할 todo의 id
	 */
	async function handleDelete(taskId: string) {
		try {
			const { data } = await client.mutate({
				mutation: DELETE_TASK,
				variables: {
					taskId: taskId
				}
			});

			if (data) {
				todoList.update((currentTodoList) => onDeleteTodo(currentTodoList, taskId));
			}
		} catch (error) {
			throw new Error('할 일 삭제 실패');
		}
	}
</script>

<div class="sub-container">
	<div class="layout todo-container" style="margin-left: {depth * 20}px;">
		<label class="layout">
			<input
				class="check-box"
				type="checkbox"
				checked={todo.completed}
				on:change={() => handleUpdate(todo)}
			/>
			<p>{todo.content}</p>
		</label>

		<Clickable onClick={() => handleDelete(todo.id)}>
			<Icon icon="fa6-solid:trash-can" height="16" style="color: var(--icon-color)" />
		</Clickable>

		{#if depth < 2}
			<Clickable onClick={() => setParentId(todo.id)}>
				<Icon
					icon="fluent-emoji-high-contrast:check-mark"
					height="16"
					style={`color: ${parentId === todo.id ? 'green' : '#d9d9d9'}`}
				/>
			</Clickable>
		{/if}
	</div>

	{#if todo.subTasks && todo.subTasks.length > 0 && depth < 3}
		{#each todo.subTasks as subTask (subTask.id)}
			<TodoItem todo={subTask} {todoList} {parentId} {setParentId} depth={depth + 1} />
		{/each}
	{/if}
</div>

<style>
	.layout {
		display: flex;
		align-items: center;
	}

	.todo-container {
		padding: 10px 0;
		gap: 40px;
	}

	.todo-container label {
		gap: 10px;
	}

	.check-box {
		width: 16px;
		height: 16px;
		border: 1px solid var(--input-border-color);
		border-radius: 2px;
		cursor: pointer;
	}

	.check-box:checked {
		background-color: var(--input-border-color);
	}

	.sub-container {
		display: flex;
		flex-direction: column;
	}
</style>
