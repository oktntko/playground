import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  isNotNull,
  isNull,
  lte,
  or,
  type SQLWrapper,
} from 'drizzle-orm';
import { drizzle } from '~/db';
import { z } from '~/lib/zod';

import { pgCategory, pgTodo } from '../schema/todolist';

const searchDoneEnum = z.enum(['done', 'active']);
const searchInput = z.object({
  where: z.object({
    done: searchDoneEnum.array(),
    limit: z.string(),
    category_name: z.string(),
    title: z.string(),
  }),
  sort: z.object({
    field: z.enum([
      'category_id',
      'order',
      'todo_id',
      'title',
      'limit',
      'done_at',
      'created_at',
      'updated_at',
    ] as const satisfies (keyof typeof pgTodo.$inferSelect)[]),
    order: z.enum(['desc', 'asc']),
  }),
  limit: z.number(),
  page: z.number(),
});

async function searchTodo(params: z.infer<typeof searchInput>) {
  console.info('searchTodo', params);
  return drizzle.transaction(async (tx) => {
    const where = genWhere();

    const [{ count: total }] = await tx
      .select({ count: count() })
      .from(pgTodo)
      .leftJoin(pgCategory, eq(pgTodo.category_id, pgCategory.category_id))
      .where(where);
    const todo_list = await tx
      .select()
      .from(pgTodo)
      .leftJoin(pgCategory, eq(pgTodo.category_id, pgCategory.category_id))
      .where(where)
      .orderBy(
        params.sort.order === 'asc'
          ? asc(pgTodo[params.sort.field])
          : desc(pgTodo[params.sort.field]),
      )
      .limit(params.limit)
      .offset((params.page - 1) * params.limit)
      .then((todo_list) => todo_list.map((x) => ({ ...x.todo, category: x.category })));

    return {
      total,
      todo_list,
    };
  });

  function genWhere() {
    const where: (SQLWrapper | undefined)[] = [];

    if (
      params.where.done.length !== 0 &&
      params.where.done.length !== searchDoneEnum.options.length
    ) {
      const whereDone: (SQLWrapper | undefined)[] = [];
      if (params.where.done.includes('done')) {
        whereDone.push(isNotNull(pgTodo.done_at));
      }
      if (params.where.done.includes('active')) {
        whereDone.push(isNull(pgTodo.done_at));
      }
      where.push(or(...whereDone));
    }

    if (params.where.limit) {
      where.push(lte(pgTodo.limit, params.where.category_name));
    }
    if (params.where.category_name) {
      where.push(ilike(pgCategory.category_name, `%${params.where.category_name}%`));
    }
    if (params.where.title) {
      where.push(ilike(pgTodo.title, `%${params.where.title}%`));
    }

    return and(...where);
  }
}

export const TodoSchema = z.object({
  todo_id: z.string().uuid(),

  category_id: z.string().uuid().nullable(),

  title: z.string().min(1).max(100).default(''),
  limit: z.string().date().nullable(),
  order: z.number().int().nullable(),
  done_at: z.string().datetime().nullable(),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

const getInput = TodoSchema.pick({
  todo_id: true,
});

const createInput = TodoSchema.omit({
  todo_id: true,
  created_at: true,
  updated_at: true,
});

const deleteInput = TodoSchema.pick({
  todo_id: true,
  updated_at: true,
});

const updateInput = createInput.merge(deleteInput);

async function getTodo(params: z.infer<typeof getInput>) {
  console.info('getTodo', params);
  return drizzle.transaction(async (tx) => {
    const todo = await tx.query.pgTodo.findFirst({
      with: {
        category: true,
      },
      where: eq(pgTodo.todo_id, params.todo_id),
    });

    if (!todo) {
      throw new Error(); // TODO: error handling
    }

    return todo;
  });
}

async function createTodo(params: z.infer<typeof createInput>) {
  console.info('createTodo', params);
  return drizzle.transaction(async (tx) => {
    const [todo] = await tx
      .insert(pgTodo)
      .values({
        category_id: params.category_id,

        title: params.title,
        limit: params.limit,
        order: params.order,
        done_at: params.done_at,
      })
      .returning();

    return todo;
  });
}

async function updateTodo(params: z.infer<typeof updateInput>) {
  console.info('updateTodo', params);
  return drizzle.transaction(async (tx) => {
    const [todo] = await tx
      .update(pgTodo)
      .set({
        category_id: params.category_id,

        title: params.title,
        limit: params.limit,
        order: params.order,
        done_at: params.done_at,
      })
      .where(eq(pgTodo.todo_id, params.todo_id))
      .returning();

    return todo;
  });
}

async function deleteTodo(params: z.infer<typeof deleteInput>) {
  console.info('deleteTodo', params);
  return drizzle.transaction(async (tx) => {
    const [todo] = await tx.delete(pgTodo).where(eq(pgTodo.todo_id, params.todo_id)).returning();

    return todo;
  });
}

const updateManyInput = updateInput.partial().merge(deleteInput).array().min(1);

async function updateManyTodo(params: z.infer<typeof updateManyInput>) {
  console.info('updateManyTodo', params);
  return drizzle.transaction(async (tx) => {
    for (const one of params) {
      await tx
        .update(pgTodo)
        .set({
          category_id: one.category_id,
          done_at: one.done_at,
          limit: one.limit,
          order: one.order,
          title: one.title,
        })
        .where(eq(pgTodo.todo_id, one.todo_id));
    }

    return { ok: true };
  });
}

const deleteManyInput = deleteInput.array().min(1);

async function deleteManyTodo(params: z.infer<typeof deleteManyInput>) {
  console.info('deleteManyTodo', params);
  return drizzle.transaction(async (tx) => {
    for (const one of params) {
      await tx.delete(pgTodo).where(eq(pgTodo.todo_id, one.todo_id));
    }

    return { ok: true };
  });
}

export const ApiTodo = {
  searchTodo,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  updateManyTodo,
  deleteManyTodo,
};

export const ApiTodoSchema = {
  searchInput,
  getInput,
  createInput,
  updateInput,
  deleteInput,
  updateManyInput,
  deleteManyInput,
};
