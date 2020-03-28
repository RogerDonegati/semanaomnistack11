const connection = require('../database/connection')

module.exports={   

    async create(request, response){
        const {id_ong} = request.body;

        const ong = await connection('ongs').where('id_ong', id_ong ).select('name').first();

        if (!ong){
            return response.status(400).json({"Erro":"No Ong Found"})
        }
        return response.json(ong);
    }
    
};