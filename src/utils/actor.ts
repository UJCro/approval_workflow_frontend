import type { ActorType } from '@/types/actor';

/**
 * 세션 스토리지에 저장된 actor를 가져오는 함수
 * @param name {string} - 세션 스토리지에 저장된 이름
 * @returns xstate actor 객체 또는 null
 */
export const getActor = (name: string) => {
	if (typeof window !== 'undefined') {
		try {
			const storedState = window.sessionStorage.getItem(name);
			if (storedState) {
				return JSON.parse(storedState);
			}
		} catch (error) {
			throw new Error(`Error parsing stored state for ${name}: ${error}`);
		}
	}
	return null;
};

/**
 * 세션 스토리지에 actor를 저장하는 함수
 * @param name {string} - 세션 스토리지에 저장할 이름
 * @param actor {ActorType} - xstate actor 객체
 */
export const setActor = (name: string, actor: ActorType): void => {
	if (typeof window !== 'undefined') {
		try {
			const persistedState = actor.getPersistedSnapshot();
			window.sessionStorage.setItem(name, JSON.stringify(persistedState));
		} catch (error) {
			throw new Error(`Error persisting state for ${name}: ${error}`);
		}
	}
};
