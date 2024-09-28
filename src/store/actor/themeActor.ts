import { getActor, setActor } from '@/utils/actor';
import { createActor } from 'xstate';
import { themeMachine } from '@/store/machines/themeMachine';
import type { ThemeActor } from '@/types/actor';

/**
 * 테마 actor를 생성하는 함수
 * @returns {ThemeActor} - xstate actor 객체
 */
export const createThemeActor = (): ThemeActor => {
	const themeSnapshot = getActor('themeActor');

	const themeActor = createActor(themeMachine, {
		snapshot: themeSnapshot
	});

	themeActor.subscribe((state) => {
		if (state) {
			setActor('themeActor', themeActor);
		}
	});

	themeActor.start();

	return themeActor;
};
