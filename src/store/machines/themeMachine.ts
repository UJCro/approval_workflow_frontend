import { setup } from 'xstate';

export const themeMachine = setup({
	types: {
		events: {} as { type: 'SET_LIGHT' } | { type: 'SET_DARK' }
	}
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QBcAWYC2YB0AbAllKsgMQDKAogCoD6AIgIIBKA0gNoAMAuoqAA4B7WPmT4BAO14gAHogCMADgAs2OQDYATBoCcatUu0BWDYbUB2ADQgAnvI0BmbNu0KO5jls0K5AXx9W0TBwIAEMAJwBrcmoaABkASQBxAAkqTh4kEEFhUQkpWQRFOVVte0NDDjMjco01K1sEM0NsDTMOFyU1ZXNDezM-fxBxAQg4KUCsKWyRMUlMgoBaZqa5OTNFTu8mpQ16xAW5ZvsldcMlJQq5E4UNPwD0LDxCYimhGbz5xB2WpQUb716ig0nT2jQ0qmMClMCm0HDklT0dxAE2C4Qirxys3yiD6HGwNyU9lW5QUansam0oLM4MOGihXVh8LMiIGQA */
	id: 'theme',
	initial: 'light',
	states: {
		light: {
			description: '밝은 테마',
			on: {
				SET_DARK: 'dark'
			}
		},
		dark: {
			description: '어두운 테마',
			on: {
				SET_LIGHT: 'light'
			}
		}
	}
});
