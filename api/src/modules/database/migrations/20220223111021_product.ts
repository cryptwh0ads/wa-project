import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Product', table => {
        table.increments('id').primary();
        table.string('description', 50).notNullable();
        table.string('price', 50).nullable();
        table.integer('amount').notNullable();
        table.dateTime('createdDate').notNullable();
        table.dateTime('updatedDate').notNullable();
      });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('Product');
}
