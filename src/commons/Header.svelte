<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from './Button.svelte';
	import { goto } from '$app/navigation';
	import type { AuthActor } from '@/types/actor';
	import client from '@/lib/apolloClient';
	import { GET_NAME } from '@/apis/graphql';
	import { beforeUpdate } from 'svelte';

	export let authActor: AuthActor;
	let userState = authActor.getSnapshot();
	let name: string;

	authActor.subscribe((state) => {
		userState = state;
	});

	beforeUpdate(() => {
		if (userState.value === 'loggedIn') {
			handleGetName();
		}
	});

	async function handleGetName() {
		try {
			const { data } = await client.query({
				query: GET_NAME
			});

			name = data.getName.name;
		} catch (error) {
			throw new Error('이름 가져오기 실패');
		}
	}

	/**
	 * 인증 정보 actor를 통해 로그아웃 상태로 변경하는 함수
	 */
	function logout() {
		authActor.send({ type: 'LOGOUT' });
		goto('/', { replaceState: true });
	}
</script>

<header>
	<div class="text-box">
		{#if userState.value === 'loggedOut'}
			<p>회원가입</p>
			<Button content="Sign Up" onClick={() => goto('/signup')} color="secondary" />
		{/if}

		{#if userState.value === 'loggedIn'}
			<Icon icon="mingcute:user-4-fill" height="24" />
			<p>{name}</p>
			<Button content="Log out" onClick={logout} color="destructive" />
		{/if}
	</div>
</header>

<style>
	header {
		height: 50px;

		display: flex;
		align-items: center;
		justify-content: flex-end;

		padding-right: 180px;
		margin-bottom: 20px;
		box-shadow: 10px 0 20px rgba(120, 120, 120, 0.3);
	}

	.text-box {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
