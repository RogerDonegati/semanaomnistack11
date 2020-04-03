const connection = require('../database/connection')

module.exports={

    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();
        console.log(count['count(*)']);
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id_ong', '=', 'incidents.id_ong')
            .limit(5)
            .offset((page-1) *5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create(request,response){
        const {title, description, value} = request.body;
        const id_ong = request.headers.authorization;
        
        // outra possibilidade
        // const result = await connection('incidents').insert({
        // result[0] (como só realizou 1 insert retorna um array de 1 posição apenas)
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            id_ong,
        });        
        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const id_ong = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id',id)
            .select('id_ong')
            .first();

        if (incident.id_ong !== id_ong){
            return response.status(401).json({"Error":'Not Permitted.'});
        }

        await connection('incidents').where('id',id).delete();
         
        return response.status(204).send();
    },
};