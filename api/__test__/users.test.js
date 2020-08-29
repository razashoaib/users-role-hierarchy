const supertest = require('supertest');
const app = require('../app');

describe("Testing the Users-hierarchy API", () => {

	it("tests the user route and have 'users' property", async () => {

		const response = await supertest(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
		expect(response.body.status).toBe('success');

	});


	it("tests the users/subordinates route with user_id = 3 and have 'subordinates' property", async () => {

		const response = await supertest(app).get('/subordinates?user_id=3');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body).toHaveProperty('subordinates');

    });

    it("tests the users/subordinates route with user_id = 1 and have 'subordinates' property", async () => {

		const response = await supertest(app).get('/subordinates?user_id=1');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
        expect(response.body).toHaveProperty('subordinates');

    });
    
    it("tests the users/subordinates route with wrong user_id query string parameter and have 'subordinates' property", async () => {

		const response = await supertest(app).get('/subordinates?user_id=abcdefg');

		expect(response.status).toBe(422);
		expect(response.body.status).toBe('error');
		expect(response.body).toHaveProperty('message');

    });
    
    it("tests unimplemented route to see if it returns 404", async () => {

		const response = await supertest(app).get('/somepath');

		expect(response.status).toBe(404);

	});

});