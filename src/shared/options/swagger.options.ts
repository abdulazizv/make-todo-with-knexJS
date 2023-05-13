import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle("Todo app With Knex")
    .setVersion("1.0")
    .addTag("API")
    .build()
