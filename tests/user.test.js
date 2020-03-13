const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const testUser = {
    name: 'Test',
    email: 'test@example.com',
    password: 'Test321!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(testUser).save()
})

test('Should signup a new user', async () => {
    await request(app).post('/api/users').send({
        name: 'Yashbeer',
        email: 'yashbeer123@example.com',
        password: 'Yashbeer321!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/api/users/login').send({
        email: testUser.email,
        password: testUser.password
    }).expect(200)
})