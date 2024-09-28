import type { authMachine } from '@/store/machines/authMachine';
import type { themeMachine } from '@/store/machines/themeMachine';
import type { Actor, AnyActorLogic } from 'xstate';

export type AuthActor = Actor<typeof authMachine>;
export type ThemeActor = Actor<typeof themeMachine>;

export type ActorType = AuthActor | ThemeActor | Actor<AnyActorLogic>;
