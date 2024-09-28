import { assign, setup } from 'xstate';

export const authMachine = setup({
	types: {
		context: {} as {
			token: string;
		},
		events: {} as
			| { type: 'LOGIN'; token: string }
			| { type: 'LOGOUT' }
			| { type: 'LOGIN_FAILED' }
			| { type: 'RETRY' }
	}
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgDYHsoYIB5DAYgBkSBxASQDkBtABgF1FQAHfWAS3R98AO04gAHogBMAFgCs2GVIAcARgCcAZmXrVe5SxkAaEAE9EqzS2wsW62Zo1qWyzVIC+7k2ix5CxMnQqWkYAfQAxAEE6SgBRABFWDiQQHn5BETFJBABaKVVrOxltfJYANgB2KWrjMwsy1WxLCuU5CsdHAzLPbwwcAiJIOmFgmhIAVQAVJLE0gSFRFOypTQrsdTl1GRkyzSV1ZRNzBGUbV1aKlgqKhq0VHpAffsI+YXDkPlxIcgAlWMmfgBNGYpOYZRagbKqU5SFh6OSWaEsWFSMpHCzKMo2JFuTS6TFlFiaTxeEDCfAQOBiJ6zXjzTJLRB5OSnIolAqVaqo9G5DnrWEHMpSOTImTqQwPJ5+QakDC09ILLJM1RY1ZyKwIg7qQmuHk5VQyJplBoyAy2KR3G6SvrS4jDeX0iESRAyQzYC3VC6VYrQuR6jSKAWY4Wi8UyCrW3wDV7vT6QB3gpW5NZyMpaY0HZSw1qqP11BAqKTY6rqg3qm7qEnuIA */
	id: 'auth',
	initial: 'loggedOut',
	context: {
		token: ''
	},
	states: {
		loggedOut: {
			description: '사용자가 로그인되지 않은 상태',
			on: {
				LOGIN: {
					target: 'loggedIn',
					actions: assign(({ context, event }) => {
						if (event.type === 'LOGIN') {
							return { token: event.token };
						}
						return context;
					})
				},
				LOGIN_FAILED: 'loginFailed'
			}
		},
		loggedIn: {
			description: '사용자가 로그인된 상태',
			on: {
				LOGOUT: {
					target: 'loggedOut',
					actions: assign(() => {
						return { token: '' };
					})
				}
			}
		},
		loginFailed: {
			description: '사용자가 로그인에 실패한 상태',
			on: {
				RETRY: 'loggedOut'
			}
		}
	}
});
