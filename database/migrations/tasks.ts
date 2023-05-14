import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists('tasks', function (table) {
        table.uuid('task_id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.uuid('user_id').references('user_id').inTable('users')
        table.string('task')
        table.string('description')
        table.boolean('is_done').defaultTo(false)
        table.timestamp('task_created_at', {useTz: false}).defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex) : Promise<void>{}