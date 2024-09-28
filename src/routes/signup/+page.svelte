<script lang="ts">
	import { goto } from '$app/navigation';
	import { SIGN_UP } from '@/apis/graphql';
	import Button from '@/commons/Button.svelte';
	import Input from '@/commons/Input.svelte';
	import client from '@/lib/apolloClient';
	import type { SignUpUser } from '@/types/user';

	let signup: SignUpUser = { userId: '', password: '', name: '' };

	/**
	 * 회원가입 요청 함수
	 */
	async function handleSubmit() {
		try {
			const { data } = await client.mutate({
				mutation: SIGN_UP,
				variables: {
					userId: signup.userId,
					password: signup.password,
					name: signup.name
				}
			});

			if (!data) {
				alert('회원가입 실패');
				throw new Error('회원가입 실패');
			} else {
				alert('회원가입 성공');
				goto('/');
			}
		} catch {
			throw new Error('회원가입 실패');
		}
	}
</script>

<form class="signup-form" method="post" on:submit|preventDefault={handleSubmit}>
	<Input
		label="ID"
		data-testid="id-input"
		name="id"
		type="text"
		bind:value={signup.userId}
		placeholder="아이디를 입력해 주세요."
		maxlength="20"
	/>
	<Input
		label="PW"
		data-testid="pw-input"
		name="pw"
		type="text"
		bind:value={signup.password}
		placeholder="비밀번호를 입력해 주세요."
		maxlength="20"
	/>
	<Input
		label="Name"
		data-testid="name-input"
		name="name"
		type="text"
		bind:value={signup.name}
		placeholder="이름을 입력해 주세요."
		maxlength="10"
	/>

	<Button data-testid="signup-submit" content="Sign Up" color="primary" />
</form>

<style>
	.signup-form {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 10px;
	}
</style>
