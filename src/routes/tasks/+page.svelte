<script lang="ts">
	import { onMount } from 'svelte';
	import type { TodoList } from '@/types/todo';
	import Button from '@/commons/Button.svelte';
	import TodoItem from '@/components/TodoItem.svelte';
	import client from '@/lib/apolloClient';
	import { CREATE_TASK, GET_TASKS } from '@/apis/graphql';
	import { onAddSubTodo } from '@/utils/todo';
	import Input from '@/commons/Input.svelte';
	import { writable } from 'svelte/store';

	let todoList = writable<TodoList[]>([]);
	let newTodoContent: string = '';
	let parentId: string | null = null;

	onMount(() => {
		handleFetch();
	});

	/**
	 * 사용자의 할 일 목록을 불러오는 함수
	 */
	async function handleFetch() {
		try {
			const { data } = await client.query({
				query: GET_TASKS
			});

			if (data) {
				todoList.set(data.getTasks);
			}
		} catch (error) {
			throw new Error('할 일 불러오기 실패');
		}
	}

	/**
	 * 새로운 할 일을 등록하는 함수
	 */
	async function handleSubmit() {
		try {
			const { data } = await client.mutate({
				mutation: CREATE_TASK,
				variables: {
					newTask: {
						parentId: parentId,
						content: newTodoContent,
						completed: false
					}
				}
			});

			if (data) {
				const newTask = data.createTask;
				if (parentId) {
					todoList.update((currentTodoList) => onAddSubTodo(currentTodoList, parentId, newTask));
				} else {
					todoList.update((currentTodoList) => [...currentTodoList, newTask]);
				}

				newTodoContent = '';
				parentId = null;
			}
		} catch (error) {
			throw new Error('할 일 등록 실패');
		}
	}

	/**
	 * parentId 값을 변경하는 함수
	 * @param id {string | null} - 변경할 parentId 값
	 */
	function setParentId(id: string | null) {
		parentId = id;
	}
</script>

<h1>Todo App</h1>

<form class="new-form" method="post" on:submit|preventDefault={handleSubmit}>
	<Input
		label="Todo"
		data-testid="todo-input"
		name="new-todo"
		type="text"
		bind:value={newTodoContent}
		placeholder="새로운 할 일을 입력하세요."
		maxlength="20"
	/>
	<Button data-testid="todo-submit" content="등록" color="primary" />
</form>

<div class="todo-list-container">
	{#if $todoList.length === 0}
		<p data-testid="noTodoMessage">할 일이 없습니다.</p>
	{:else}
		{#each $todoList as todo (todo.id)}
			<TodoItem {todo} {todoList} {parentId} {setParentId} depth={0} />
		{/each}
	{/if}
</div>

<style>
	h1 {
		padding: 20px;

		font-size: 40px;
		font-weight: 700;
		text-align: center;
	}

	.new-form {
		display: flex;
		justify-content: center;
		gap: 10px;

		padding-bottom: 60px;
	}

	.todo-list-container {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
	}
</style>
