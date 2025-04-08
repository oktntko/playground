import { eq } from 'drizzle-orm';
import { drizzle } from '~/db';
import { z } from '~/lib/zod';

import { pgCategory } from '../schema/todolist';

async function listCategory() {
  console.info('listCategory');
  return drizzle.transaction(async (tx) => {
    const category_list = await tx.query.pgCategory.findMany({
      orderBy: ({ order }, { asc }) => [asc(order)],
    });

    return category_list;
  });
}

export const CategorySchema = z.object({
  category_id: z.string().uuid(),

  category_name: z.string().min(1).max(100).default(''),
  order: z.number().int().nullable(),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

const getInput = CategorySchema.pick({
  category_id: true,
});

const createInput = CategorySchema.omit({
  category_id: true,
  created_at: true,
  updated_at: true,
});

const deleteInput = CategorySchema.pick({
  category_id: true,
  updated_at: true,
});

const updateInput = createInput.merge(deleteInput);

async function getCategory(params: z.infer<typeof getInput>) {
  console.info('getCategory', params);
  return drizzle.transaction(async (tx) => {
    const category = await tx.query.pgCategory.findFirst({
      where: eq(pgCategory.category_id, params.category_id),
    });

    if (!category) {
      throw new Error(); // TODO:
    }

    return category;
  });
}

async function createCategory(params: z.infer<typeof createInput>) {
  console.info('createCategory', params);
  return drizzle.transaction(async (tx) => {
    const [category] = await tx
      .insert(pgCategory)
      .values({
        category_name: params.category_name,
        order: params.order,
      })
      .returning();

    return category;
  });
}

async function updateCategory(params: z.infer<typeof updateInput>) {
  console.info('updateCategory', params);
  return drizzle.transaction(async (tx) => {
    const [category] = await tx
      .update(pgCategory)
      .set({
        category_name: params.category_name,
        order: params.order,
      })
      .where(eq(pgCategory.category_id, params.category_id))
      .returning();

    return category;
  });
}

async function deleteCategory(params: z.infer<typeof deleteInput>) {
  console.info('deleteCategory', params);
  return drizzle.transaction(async (tx) => {
    const [category] = await tx
      .delete(pgCategory)
      .where(eq(pgCategory.category_id, params.category_id))
      .returning();

    return category;
  });
}

export const ApiCategory = {
  listCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export const ApiCategorySchema = {
  getInput,
  createInput,
  updateInput,
  deleteInput,
};
