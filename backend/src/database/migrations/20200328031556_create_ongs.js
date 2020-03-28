exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id_ong').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
      })
};  

exports.down = function(knex) {
    // se algo da errado
    return knox.schema.dropTable('ong');
  
};