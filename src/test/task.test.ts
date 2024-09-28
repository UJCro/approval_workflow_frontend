import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import Page from '@/routes/tasks/+page.svelte';
import client from '@/lib/apolloClient';

vi.mock('@/lib/apolloClient', () => {
	return {
		default: {
			query: vi.fn(),
			mutate: vi.fn()
		}
	};
});

describe('할 일 페이지 단위 테스트', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('페이지 렌더링 테스트', () => {
		(client.query as Mock).mockResolvedValue({
			data: {
				getTasks: []
			}
		});

		const renderPage = render(Page);
		expect(renderPage).toBeDefined();
	});

	it('할 일 추가 폼이 존재하는지 테스트', () => {
		(client.query as Mock).mockResolvedValue({
			data: {
				getTasks: []
			}
		});

		render(Page);

		const todoAppTitle = screen.getByText('Todo App');
		const todoInput = screen.getByTestId('todo-input');
		const todoSubmit = screen.getByTestId('todo-submit');

		expect(todoAppTitle).toBeInTheDocument();
		expect(todoInput).toBeInTheDocument();
		expect(todoSubmit).toBeInTheDocument();
	});
});
