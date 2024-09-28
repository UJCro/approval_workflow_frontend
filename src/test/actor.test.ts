import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Actor, AnyActorLogic } from 'xstate';
import { getActor, setActor } from '@/utils/actor';

const createMockActor = (): Actor<AnyActorLogic> => {
	return {
		getPersistedSnapshot: () => ({ mockKey: 'mockValue' })
	} as unknown as Actor<AnyActorLogic>;
};

describe('Actor Utils 테스트', () => {
	const actorName = 'testActor';
	let mockActor: Actor<AnyActorLogic>;

	vi.spyOn(window.sessionStorage, 'getItem').mockImplementation(() => null);
	vi.spyOn(window.sessionStorage, 'setItem').mockImplementation(() => {});
	vi.spyOn(window.sessionStorage, 'clear').mockImplementation(() => {});

	beforeEach(() => {
		vi.clearAllMocks();
		mockActor = createMockActor();
	});

	describe('getActor 함수 테스트', () => {
		it('존재하지 않는 이름으로 호출 시 null 반환 확인', () => {
			expect(getActor('nonExistent')).toBeNull();
		});

		it('저장된 actor가 있는 경우 파싱하여 반환하는지 확인', () => {
			const persistedState = mockActor.getPersistedSnapshot();
			window.sessionStorage.setItem(actorName, JSON.stringify(persistedState));
			expect(getActor(actorName)).toEqual(persistedState);
		});

		it('저장된 데이터가 유효하지 않을 경우, JSON 파싱 에러를 처리하는지 확인', () => {
			sessionStorage.setItem('invalid-actor', 'invalid-json');
			expect(() => getActor('invalid-actor')).toThrowError(
				/Error parsing stored state for invalid-actor: SyntaxError: Unexpected token/i
			);
		});
	});

	describe('setActor 함수 테스트', () => {
		it('actor가 잘 저장되는지 확인', () => {
			setActor(actorName, mockActor);
			const storedState = JSON.parse(window.sessionStorage.getItem(actorName) as string);
			expect(storedState).toEqual(mockActor.getPersistedSnapshot());
		});

		it('actor를 저장할 수 없는 경우 에러를 처리하는지 확인', () => {
			const faultyActor = {
				getPersistedSnapshot: () => {
					throw new Error('Cannot persist state');
				}
			} as unknown as Actor<AnyActorLogic>;

			expect(() => setActor('faulty-actor', faultyActor)).toThrowError(
				'Error persisting state for faulty-actor: Error: Cannot persist state'
			);
		});
	});
});
