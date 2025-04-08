import { relations, sql } from 'drizzle-orm';
import { date, integer, pgSchema, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const pgTodolist = pgSchema('todolist');

export const pgCategory = pgTodolist.table('category', {
  category_id: uuid().primaryKey().defaultRandom(),

  category_name: varchar({ length: 100 }).notNull().default(''),
  order: integer(),

  created_at: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updated_at: timestamp({ mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});

export const categoryRelations = relations(pgCategory, ({ many }) => ({
  todo_list: many(pgTodo),
}));

export const pgTodo = pgTodolist.table('todo', {
  todo_id: uuid().primaryKey().defaultRandom(),

  category_id: uuid().references(() => pgCategory.category_id, { onDelete: 'set null' }),

  title: varchar({ length: 100 }).notNull().default(''),
  limit: date({ mode: 'string' }),
  order: integer(),
  done_at: timestamp({ mode: 'string' }),

  created_at: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updated_at: timestamp({ mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});

export const todoRelations = relations(pgTodo, ({ one }) => ({
  category: one(pgCategory, {
    fields: [pgTodo.category_id],
    references: [pgCategory.category_id],
  }),
}));
