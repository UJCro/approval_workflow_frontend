import { gql } from '@apollo/client/core';

export const SIGN_UP = gql`
	mutation SignIn($userId: String!, $password: String!, $name: String!) {
		signIn(userId: $userId, password: $password, name: $name) {
			id
			name
		}
	}
`;

export const LOGIN = gql`
	mutation Login($userId: String!, $password: String!) {
		login(userId: $userId, password: $password)
	}
`;

export const GET_NAME = gql`
	query GetName {
		getName {
			id
			name
		}
	}
`;

export const GET_TASKS = gql`
	query GetTasks {
		getTasks {
			id
			userId
			content
			completed
			subTasks {
				id
				userId
				content
				completed
				subTasks {
					id
					userId
					content
					completed
				}
			}
		}
	}
`;

export const CREATE_TASK = gql`
	mutation CreateTask($newTask: NewTaskInput!) {
		createTask(newTask: $newTask) {
			id
			userId
			content
			completed
		}
	}
`;

export const PATCH_TASK = gql`
	mutation UpdateTask($updateTaskInput: UpdateTaskInput!) {
		updateTask(updateTaskInput: $updateTaskInput) {
			id
			userId
			content
			completed
		}
	}
`;

export const DELETE_TASK = gql`
	mutation DeleteTask($taskId: String!) {
		deleteTask(taskId: $taskId)
	}
`;
