import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import app from '@backend/app';
import { resetTaskStore } from '@backend/store/taskStore';

describe('DELETE /api/tasks/:id', () => {
	beforeEach(() => {
		resetTaskStore();
	});

	it('Happy path: valid id returns 204 with no body', async () => {
		const response = await request(app).delete('/api/tasks/1');

		expect(response.status).toBe(204);
		expect(response.text).toBe('');
	});

	it('404: task id does not exist', async () => {
		const response = await request(app).delete('/api/tasks/999999');

		expect(response.status).toBe(404);
	});

	it('400: id is not a valid format (for example, a string instead of a number)', async () => {
		const response = await request(app).delete('/api/tasks/not-a-number');

		expect(response.status).toBe(400);
	});
});

describe('PATCH /api/tasks/:id', () => {
	beforeEach(() => {
		resetTaskStore();
	});

	it('Happy path: valid id and valid body returns 200 with the updated task', async () => {
		const response = await request(app).patch('/api/tasks/1').send({ completed: true });

		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({
			id: 1,
			completed: true,
		});
	});

	it('404: task id does not exist', async () => {
		const response = await request(app).patch('/api/tasks/999999').send({ completed: true });

		expect(response.status).toBe(404);
	});

	it('400: request body is empty - no fields sent at all', async () => {
		const response = await request(app).patch('/api/tasks/1').send({});

		expect(response.status).toBe(400);
	});

	it('400: id is not a valid format, for example, a string instead of a number', async () => {
		const response = await request(app).patch('/api/tasks/not-a-number').send({ completed: true });

		expect(response.status).toBe(400);
	});
});




