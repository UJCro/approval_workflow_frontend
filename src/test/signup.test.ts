import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Page from '@/routes/signup/+page.svelte';

describe('회원가입 Page 단위 테스트', () => {
	it('페이지 렌더링 테스트', () => {
		const renderPage = render(Page);
		expect(renderPage).toBeDefined();
	});

	it('회원가입 폼이 존재하는지 테스트', () => {
		render(Page);

		const idInput = screen.getByTestId('id-input');
		const pwInput = screen.getByTestId('pw-input');
		const nameInput = screen.getByTestId('name-input');

		const signupSubmitButton = screen.getByTestId('signup-submit').textContent;

		expect(idInput).toBeInTheDocument();
		expect(pwInput).toBeInTheDocument();
		expect(nameInput).toBeInTheDocument();

		expect(signupSubmitButton).toEqual('Sign Up');
	});
});
