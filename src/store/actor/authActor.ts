import { createActor } from 'xstate';
import { authMachine } from '@/store/machines/authMachine';
import { getActor, setActor } from '@/utils/actor';
import type { AuthActor } from '@/types/actor';

/**
 * 인증 actor를 생성하는 함수
 * @returns {AuthActor} - xstate actor 객체
 */
export const createAuthActor = (): AuthActor => {
	const authSnapshot = getActor('authActor');

	const authActor = createActor(authMachine, {
		snapshot: authSnapshot
	});

	authActor.subscribe((state) => {
		if (state) {
			setActor('authActor', authActor);
		}
	});

	authActor.start();

	return authActor;
};
