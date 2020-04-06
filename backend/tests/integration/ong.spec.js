const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () =>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () =>{
        await connection.destroy();
    });

    it('should be able do create a new ong', async () => {
        const response = await request(app).post('/ongs').send({
            name : "fight against corona",
            email: "fight@aginstcorona.com",
            whatsapp: "44770208804",
            city: "São Paulo",
            uf: "SP"
        });
        expect(response.body).toHaveProperty('id_ong');
        expect(response.body.id_ong).toHaveLength(8);
    })

})