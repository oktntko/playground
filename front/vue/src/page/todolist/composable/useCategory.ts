import { useLoading } from '~/plugin/LoadingPlugin';
import { useToast } from '~/plugin/ToastPlugin';

import { ApiCategory } from '../api/category';
import { pgCategory } from '../schema/todolist';

export function useCategory() {
  const $loading = useLoading();
  const $toast = useToast();

  const category_list = ref<(typeof pgCategory.$inferSelect)[]>([]);

  async function listCategory() {
    return ApiCategory.listCategory();
  }

  onMounted(async () => {
    category_list.value = await listCategory();
  });

  async function handleAddCategory() {
    const category_name = window.prompt('Add new Category.', '');

    if (!category_name) {
      return null;
    }

    const loading = $loading.open();
    try {
      const category = await ApiCategory.createCategory({
        category_name,
        order: category_list.value.length,
      });

      $toast.info(`Data has saved.`);

      category_list.value.push(category);
      return category;
    } finally {
      loading.close();
    }
  }

  async function handleEditCategory(current: typeof pgCategory.$inferSelect) {
    const category_name = window.prompt('Edit current Category.', current.category_name);

    if (!category_name) {
      return null;
    }

    const loading = $loading.open();
    try {
      const category = await ApiCategory.updateCategory({
        ...current,
        category_name,
      });

      $toast.info(`Data has saved.`);

      const foundIndex = category_list.value.findIndex(
        (x) => x.category_id === current.category_id,
      );
      if (~foundIndex) {
        category_list.value.splice(foundIndex, 1, category);
      }

      return category;
    } finally {
      loading.close();
    }
  }

  async function handleRemoveCategory(current: typeof pgCategory.$inferSelect) {
    if (!window.confirm(`Do you really want to delete this data? [${current.category_name}]`)) {
      return;
    }

    const loading = $loading.open();
    try {
      const category = await ApiCategory.deleteCategory({
        ...current,
      });

      $toast.info(`Data has saved.`);

      const foundIndex = category_list.value.findIndex(
        (x) => x.category_id === current.category_id,
      );
      if (~foundIndex) {
        category_list.value.splice(foundIndex, 1);
      }

      return category;
    } finally {
      loading.close();
    }
  }

  return {
    category_list,
    listCategory,
    handleAddCategory,
    handleEditCategory,
    handleRemoveCategory,
  };
}
