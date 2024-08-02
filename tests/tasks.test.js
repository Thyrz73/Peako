const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');

// Mock de mongoose
jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose'); // Importez mongoose réel pour réutiliser Schema
    return {
        ...actualMongoose, // Gardez les parties non moquées de mongoose
        connect: jest.fn().mockResolvedValue({}), // Retourner une promesse résolue pour .then()
        connection: {
            close: jest.fn(),
        },
        model: jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue([]), // Mock pour le GET des tâches
            create: jest.fn().mockResolvedValue({ id: '1', name: 'Task 1' }), // Mock pour le POST d'une tâche
            findById: jest.fn().mockResolvedValue({ id: '1', name: 'Task 1' }), // Mock pour le GET par ID
            findByIdAndUpdate: jest.fn().mockResolvedValue({ name: 'Updated Task' }), // Mock pour le PUT d'une tâche
            findByIdAndDelete: jest.fn().mockResolvedValue({}), // Mock pour le DELETE d'une tâche
        }),
    };
});

beforeAll(async () => {
    await mongoose.connect();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Tasks API', () => {
    afterAll(() => {
        server.close(); // Fermez le serveur après les tests
    });

    it('should GET all tasks', async () => {
        const response = await request(app).get('/tasks');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    /*it('should POST a new task', async () => {
        const task = { id: '1', name: 'Task 1' };
        const response = await request(app).post('/tasks').send(task);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id', '1');
        expect(response.body).toHaveProperty('name', 'Task 1');
    });

    it('should GET a task by ID', async () => {
        const response = await request(app).get('/tasks/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', '1');
    });

    it('should PUT (update) a task', async () => {
        const task = { name: 'Updated Task' };
        const response = await request(app).put('/tasks/1').send(task);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Task');
    });

    it('should DELETE a task', async () => {
        const response = await request(app).delete('/tasks/1');
        expect(response.statusCode).toBe(204);
    });*/
});
