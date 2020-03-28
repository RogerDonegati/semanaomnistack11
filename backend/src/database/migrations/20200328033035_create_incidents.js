exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();


        table.string('id_ong').notNullable();
        table.foreign('id_ong').references('id_ong').inTable('ongs');
      })
};  

exports.down = function(knex) {
    // se algo da errado
    return knox.schema.dropTable('incidents');  
};