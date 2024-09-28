<script lang="ts">
	import Button from '@/commons/Button.svelte';
	import { goto } from '$app/navigation';
	import client from '@/lib/apolloClient';
	import { LOGIN } from '@/apis/graphql';
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import Input from '@/commons/Input.svelte';
	import type { User } from '@/types/user';

	let login: User = { userId: '', password: '' };
	const dispatch = createEventDispatcher();

	afterUpdate(() => {
		dispatch('setLogout');
	});

	/**
	 * 로그인 요청 함수
	 */
	async function handleSubmit() {
		try {
			const { data } = await client.mutate({
				mutation: LOGIN,
				variables: { userId: login.userId, password: login.password }
			});

			if (data) {
				dispatch('setUser', { token: data.login });
				goto('/tasks');
			}
		} catch (error) {
			alert('로그인 실패');
			dispatch('failed');
			throw new Error('로그인 실패');
		}
	}
</script>

<form class="login-form" method="post" on:submit|preventDefault={handleSubmit}>
	<Input
		label="ID"
		data-testid="id-input"
		name="id"
		type="text"
		bind:value={login.userId}
		placeholder="아이디를 입력해 주세요."
		maxlength="20"
	/>
	<Input
		label="PW"
		data-testid="pw-input"
		name="pw"
		type="text"
		bind:value={login.password}
		placeholder="비밀번호를 입력해 주세요."
		maxlength="20"
	/>

	<Button data-testid="login-submit" content="Login" color="primary" />
</form>

<style>
	.login-form {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 10px;
	}
</style>
