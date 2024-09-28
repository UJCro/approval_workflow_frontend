<script lang="ts">
	import Header from '@/commons/Header.svelte';
	import { createAuthActor } from '@/store/actor/authActor';
	import { createThemeActor } from '@/store/actor/themeActor';
	import '@/styles.css';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Page from './+page.svelte';
	import type { Auth } from '@/types/user';

	const authActor = createAuthActor();
	const themeActor = createThemeActor();

	let theme = writable(themeActor.getSnapshot().value);

	themeActor.subscribe((state) => {
		theme.set(state.value);
	});

	const handleToggleTheme = () => {
		if (themeActor.getSnapshot().value === 'light') {
			themeActor.send({ type: 'SET_DARK' });
		} else {
			themeActor.send({ type: 'SET_LIGHT' });
		}
	};

	/**
	 * 인증 정보 actor를 통해 로그인 상태로 변경하는 함수
	 * @param event {CustomEvent<Auth>} - 사용자 정보를 담은 이벤트
	 */
	function handleSetUser(event: CustomEvent<Auth>) {
		authActor.send({ type: 'LOGIN', token: event.detail.token });
	}

	/**
	 * 인증 정보 actor를 통해 로그인 실패 상태로 변경하는 함수
	 */
	function handleLoginFailed() {
		authActor.send({ type: 'LOGIN_FAILED' });
	}

	function handleLoggout() {
		authActor.send({ type: 'RETRY' });
	}

	onMount(() => {
		theme.subscribe((value) => {
			document.body.className = value;
		});
	});
</script>

<div id="app">
	<Header {authActor} />

	<div class="layout">
		<input
			type="checkbox"
			checked={$theme === 'dark'}
			id="themeSwitch"
			class="theme-switch-input"
			on:click={handleToggleTheme}
		/>
		<label for="themeSwitch" class="theme-switch-label">
			<span class="theme-switch-inner"></span>
		</label>

		<main>
			{#if $page.url.pathname === '/'}
				<Page
					on:setUser={handleSetUser}
					on:failed={handleLoginFailed}
					on:setLogout={handleLoggout}
				/>
			{:else}
				<slot />
			{/if}
		</main>
	</div>
</div>

<style>
	.layout {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 40px;
	}

	.theme-switch-input {
		display: none;
	}

	.theme-switch-label {
		position: relative;
		display: inline-block;
		width: 70px;
		height: 30px;
		background-color: #d9d9d9;
		border-radius: 50px;
		box-shadow: -4px 4px 15px inset rgba(0, 0, 0, 0.4);
		cursor: pointer;

		&::before,
		&::after {
			position: absolute;
			top: 50%;
			font-size: 32px;
			transform: translate3d(0, -50%, 0);
		}

		&::before {
			content: '\263C';
			right: 100%;
			margin-right: 10px;
			color: orange;
		}

		&::after {
			content: '\263E';
			left: 100%;
			margin-left: 10px;
			color: lightSlateGray;
		}
	}

	.theme-switch-inner {
		position: absolute;
		top: 3px;
		left: 4px;
		width: 24px;
		height: 24px;
		background-color: #ffffff;
		border-radius: 50%;
		box-shadow: -3px 3px 8px rgba(0, 0, 0, 0.4);
		transition: transform 0.3s ease;
	}

	.theme-switch-input:checked + .theme-switch-label .theme-switch-inner {
		transform: translateX(38px);
	}
</style>
