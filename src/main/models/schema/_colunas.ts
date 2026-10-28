import { sql } from 'drizzle-orm';
import { integer } from 'drizzle-orm/sqlite-core';

export const timestamps = {
  criadoEm:     integer('criado_em').notNull().default(sql`(unixepoch() * 1000)`),
  atualizadoEm: integer('atualizado_em').notNull().default(sql`(unixepoch() * 1000)`),
};
