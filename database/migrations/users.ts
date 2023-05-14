import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists('users',function (table) {
        table.uuid('user_id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.string('name')
        table.string('phone')
        table.boolean('is_registered').defaultTo(false)
        table.string('token')
    })
}

export async function down(knex: Knex):Promise<void> {}