import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from '@/routes/+page.svelte';

describe('로그인 Page 단위 테스트', () => {
	it('페이지 렌더링 테스트', () => {
		const renderPage = render(Page);
		expect(renderPage).toBeDefined();
	});

	it('로그인 폼이 존재하는지 테스트', () => {
		render(Page);

		const idInput = screen.getByTestId('id-input');
		const pwInput = screen.getByTestId('pw-input');

		const loginSubmitButton = screen.getByTestId('login-submit').textContent;

		expect(idInput).toBeInTheDocument();
		expect(pwInput).toBeInTheDocument();

		expect(loginSubmitButton).toEqual('Login');
	});
});
