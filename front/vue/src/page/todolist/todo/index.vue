<script setup lang="ts">
useTitle('vue | ToDo List');

import MySortButton from '~/component/MySortButton.vue';
import { dayjs } from '~/lib/dayjs';
import type { z } from '~/lib/zod';

import { ApiTodo, ApiTodoSchema } from '../api/todo';
import { useCategory } from '../composable/useCategory';

type Todo = Awaited<ReturnType<typeof ApiTodo.searchTodo>>['todo_list'][number];

const { category_list, handleAddCategory } = useCategory();

const searchValue = ref<z.infer<typeof ApiTodoSchema.searchInput>>({
  where: {
    done: ['active'],
    title: '',
    category_name: '',
    limit: '',
  },
  sort: {
    field: 'limit',
    order: 'asc',
  },
  page: 1,
  limit: 50,
});

const res = await ApiTodo.searchTodo(searchValue.value);
const data = ref<{
  total: number;
  todo_list: (Todo & { checked?: boolean })[];
}>(res);

const loading = ref(false);
async function handleSubmit() {
  loading.value = true;
  try {
    const res = await ApiTodo.searchTodo(searchValue.value);
    data.value = res;
  } finally {
    loading.value = false;
  }
}

async function changeSortOrder(field: typeof searchValue.value.sort.field) {
  if (searchValue.value.sort.field !== field) {
    searchValue.value.sort = {
      field: field,
      order: 'asc',
    };
  } else {
    searchValue.value.sort.order = searchValue.value.sort.order === 'asc' ? 'desc' : 'asc';
  }

  return handleSubmit();
}

const checkedList = computed(() => {
  return data.value.todo_list.filter((x) => x.checked);
});
const headerCheckbox = computed(() => {
  return {
    checked: checkedList.value.length > 0,
    indeterminate:
      checkedList.value.length > 0 && checkedList.value.length < data.value.todo_list.length,
  };
});
</script>

<template>
  <div class="space-y-4 p-4">
    <div class="">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center gap-2">
          <li class="inline-flex items-center">
            <RouterLink
              :to="{ name: '/' }"
              exact-active-class="text-gray-900"
              class="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-600"
            >
              <span class="icon-[logos--vue] h-4 w-4"> </span>
              <span class="ms-1 capitalize">vue</span>
            </RouterLink>
          </li>

          <li class="inline-flex items-center">
            <span class="icon-[weui--arrow-filled]"></span>
          </li>
          <li class="inline-flex items-center">
            <RouterLink
              :to="{ name: '/todolist/todo/' }"
              exact-active-class="text-gray-900"
              class="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-600"
            >
              <span class="icon-[icons8--todo-list] h-4 w-4"> </span>
              <span class="ms-1 capitalize">todolist</span>
            </RouterLink>
          </li>

          <li class="inline-flex items-center">
            <span class="icon-[weui--arrow-filled]"></span>
          </li>
          <li class="inline-flex items-center">
            <RouterLink
              :to="{ name: '/todolist/todo/' }"
              exact-active-class="text-gray-900"
              class="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-600"
            >
              <span class="ms-1 capitalize">todo</span>
            </RouterLink>
          </li>
        </ol>
      </nav>
    </div>

    <form class="space-y-4 px-4" autocomplete="off" @submit.prevent="handleSubmit">
      <section class="space-y-2">
        <div class="focus-container">
          <span class="text-sm capitalize"> status </span>
          <div class="flex items-center gap-2">
            <label
              v-for="status of ['active', 'done']"
              :key="status"
              :for="status"
              class="flex items-center font-medium text-gray-900 capitalize"
            >
              <input
                :id="status"
                v-model="searchValue.where.done"
                type="checkbox"
                :value="status"
                class="mr-1 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
              />
              {{ status }}
            </label>

            <!-- <ErrorMessage class="text-xs text-red-600" for="where.todo_status" /> -->
          </div>
        </div>

        <div class="focus-container">
          <label for="where.limit" class="optional text-sm capitalize"> limit </label>
          <input
            id="where.limit"
            v-model.lazy="searchValue.where.limit"
            class="block rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 sm:text-sm"
            maxlength="100"
            type="date"
          />

          <!-- <ErrorMessage class="text-xs text-red-600" for="where.todo_keyword" /> -->
        </div>

        <div class="focus-container">
          <label for="where.title" class="optional text-sm capitalize"> title </label>
          <input
            id="where.title"
            v-model.lazy="searchValue.where.title"
            class="block rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 sm:text-sm"
            maxlength="100"
            type="text"
          />

          <!-- <ErrorMessage class="text-xs text-red-600" for="where.todo_keyword" /> -->
        </div>

        <div class="focus-container">
          <label for="where.title" class="optional text-sm capitalize"> category </label>
          <div class="flex items-center gap-2">
            <input
              id="where.category_name"
              v-model.lazy="searchValue.where.category_name"
              class="inline-block rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 sm:text-sm"
              maxlength="100"
              type="text"
              autocomplete="on"
              list="category_list"
            />
            <datalist id="category_list">
              <option
                v-for="category of category_list"
                :key="category.category_id"
                :value="category.category_name"
              ></option>
            </datalist>
            <button
              type="button"
              :class="[
                'inline-flex items-center justify-center shadow-sm transition-all focus:ring focus:outline-none',
                'rounded-3xl border p-2',
                'border-gray-300 bg-white text-gray-800 hover:bg-gray-200',
              ]"
              title="add category"
              @click="
                async () => {
                  const category = await handleAddCategory();

                  if (category) {
                    searchValue.where.category_name = category.category_name;
                  }
                }
              "
            >
              <span class="icon-[material-symbols--add-rounded] h-5 w-5"></span>
            </button>
            <RouterLink
              v-slot="{ href }"
              :to="{
                name: '/todolist/category/',
              }"
              custom
            >
              <a
                :href="href"
                :class="[
                  'inline-flex items-center justify-center shadow-sm transition-all focus:ring focus:outline-none',
                  'rounded-3xl border p-2',
                  'border-blue-300 bg-white text-gray-800 hover:bg-blue-200',
                ]"
                title="manage category"
                target="_blank"
              >
                <span class="icon-[iconamoon--link-external-bold] h-5 w-5"></span>
              </a>
            </RouterLink>
          </div>
          <!-- <ErrorMessage class="text-xs text-red-600" for="where.todo_keyword" /> -->
        </div>
      </section>

      <section class="space-x-2">
        <button
          type="submit"
          :class="[
            'inline-flex items-center justify-center shadow-xs transition-all focus:ring-3 focus:outline-hidden',
            'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:hover:bg-gray-400 disabled:hover:text-gray-200',
            'min-w-[120px] rounded-md border px-4 py-2 text-sm font-medium',
            'border-green-700 bg-green-600 text-white hover:bg-green-800',
            'capitalize',
          ]"
          :disabled="loading"
        >
          <span class="icon-[bx--search] h-4 w-4"></span>
          <span class="ms-1 capitalize">search</span>
        </button>
      </section>
    </form>

    <div class="">
      <header
        class="z-10 flex flex-row items-center gap-2 rounded-t border border-gray-300 bg-gray-50 p-2 px-4 py-2 text-sm"
      >
        <RouterLink
          :class="[
            'inline-flex items-center justify-center shadow-xs transition-all focus:ring-3 focus:outline-hidden',
            'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:hover:bg-gray-400 disabled:hover:text-gray-200',
            'min-w-[120px] rounded-md border px-4 py-2 text-sm font-medium',
            'border-blue-700 bg-white text-blue-700 hover:bg-blue-800 hover:text-white',
            'capitalize',
          ]"
          :to="{ name: '/todolist/todo/add' }"
        >
          <span class="icon-[icon-park-solid--add-one] h-4 w-4"></span>
          <span class="ms-1 capitalize">add todo</span>
        </RouterLink>
        <button
          type="button"
          :class="[
            'inline-flex items-center justify-center shadow-xs transition-all focus:ring-3 focus:outline-hidden',
            'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:hover:bg-gray-400 disabled:hover:text-gray-200',
            'min-w-[120px] rounded-md border px-4 py-2 text-sm font-medium',
            'border-green-700 bg-white text-green-700 hover:bg-green-800 hover:text-white',
            'capitalize',
          ]"
          :disabled="loading || checkedList.length === 0"
          @click="
            async () => {
              if (!$window.confirm(`Do you really want to done checked data?`)) {
                return;
              }

              const loading = $loading.open();
              try {
                await ApiTodo.updateManyTodo(
                  checkedList.map(({ todo_id, updated_at }) => ({
                    todo_id,
                    updated_at,
                    done_at: dayjs().toISOString(),
                  })),
                );

                $toast.info(`Checked data have done.`);
                await handleSubmit();
              } finally {
                loading.close();
              }
            }
          "
        >
          <span class="icon-[material-symbols--check-circle-outline-rounded] h-4 w-4"></span>
          <span class="ms-1 capitalize">done</span>
        </button>
        <button
          type="button"
          :class="[
            'inline-flex items-center justify-center shadow-xs transition-all focus:ring-3 focus:outline-hidden',
            'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:hover:bg-gray-400 disabled:hover:text-gray-200',
            'min-w-[120px] rounded-md border px-4 py-2 text-sm font-medium',
            'border-gray-300 bg-white text-gray-800 hover:bg-gray-200',
            'capitalize',
          ]"
          :disabled="loading || checkedList.length === 0"
          @click="
            async () => {
              if (!$window.confirm(`Do you really want to delete checked data?`)) {
                return;
              }

              const loading = $loading.open();
              try {
                await ApiTodo.deleteManyTodo(checkedList);

                $toast.success('Checked data have deleted.');
                await handleSubmit();
              } finally {
                loading.close();
              }
            }
          "
        >
          <span class="icon-[tabler--trash-filled] h-4 w-4"></span>
          <span class="ms-1 capitalize">delete</span>
        </button>
      </header>

      <table
        class="h-full w-full overflow-x-auto rounded-sm border border-gray-300 bg-gray-50 text-sm"
      >
        <thead class="text-gray-900">
          <tr class="divide-x divide-gray-200">
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              No
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <label class="flex h-full justify-center hover:cursor-pointer">
                <input
                  type="checkbox"
                  class="hover:cursor-pointer"
                  :checked="headerCheckbox.checked"
                  :indeterminate="headerCheckbox.indeterminate"
                  @click="
                    () => {
                      const checked = headerCheckbox.checked;
                      data.todo_list.forEach((x) => (x.checked = !checked));
                    }
                  "
                />
              </label>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center">
                category
                <MySortButton
                  :sort="searchValue.sort"
                  field="space"
                  @click="changeSortOrder('category_id')"
                ></MySortButton>
              </div>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center">
                title
                <MySortButton
                  :sort="searchValue.sort"
                  field="title"
                  @click="changeSortOrder('title')"
                ></MySortButton>
              </div>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center">
                limit
                <MySortButton
                  :sort="searchValue.sort"
                  field="limit"
                  @click="changeSortOrder('limit')"
                ></MySortButton>
              </div>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center">
                done
                <MySortButton
                  :sort="searchValue.sort"
                  field="done_at"
                  @click="changeSortOrder('done_at')"
                ></MySortButton>
              </div>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center">
                created
                <MySortButton
                  :sort="searchValue.sort"
                  field="created_at"
                  @click="changeSortOrder('created_at')"
                ></MySortButton>
              </div>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center">
                updated
                <MySortButton
                  :sort="searchValue.sort"
                  field="updated_at"
                  @click="changeSortOrder('updated_at')"
                ></MySortButton>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white text-gray-900">
          <tr
            v-for="(todo, i) of data.todo_list"
            :key="todo.todo_id"
            class="divide-x divide-gray-200"
          >
            <td class="max-w-48">
              <RouterLink
                :to="{
                  name: '/todolist/todo/[todo_id]',
                  params: { todo_id: todo.todo_id },
                }"
                class="flex w-full justify-end px-2 py-1 text-blue-600 hover:underline"
              >
                #{{ i + 1 }}
              </RouterLink>
            </td>
            <td class="max-w-48">
              <label class="flex h-full justify-center hover:cursor-pointer">
                <input v-model="todo.checked" type="checkbox" class="hover:cursor-pointer" />
              </label>
            </td>
            <td class="max-w-48">
              <div
                class="line-clamp-1 flex min-w-28 items-center gap-0.5 px-2 py-1"
                :title="todo.category?.category_name"
              >
                <span> {{ todo.category?.category_name ?? 'nothing' }} </span>
              </div>
            </td>
            <td class="max-w-48">
              <div class="line-clamp-2 min-w-28 px-2 py-1" :title="todo.title">
                {{ todo.title }}
              </div>
            </td>
            <td class="max-w-48">
              <div class="line-clamp-1 min-w-28 px-2 py-1">
                {{ todo.limit }}
              </div>
            </td>
            <td class="max-w-48">
              <div class="line-clamp-1 min-w-32 px-2 py-1">
                {{ todo.done_at }}
              </div>
            </td>
            <td class="max-w-48">
              <div class="line-clamp-1 min-w-32 px-2 py-1">
                {{ todo.created_at }}
              </div>
            </td>
            <td class="max-w-48">
              <div class="line-clamp-1 min-w-32 px-2 py-1">
                {{ todo.updated_at }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <footer
        class="sticky bottom-0 z-10 flex flex-row items-center gap-4 rounded-b border border-gray-300 bg-gray-50 px-4 py-2 text-sm"
      >
        <!-- https://www.delldesignsystem.com/components/pagination/ -->
        <div class="flex flex-row items-center gap-2">
          <span class="capitalize">items per page</span>
          <select
            v-model.number="searchValue.limit"
            class="inline-block rounded-sm border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900"
            :disabled="loading"
            @change="
              () => {
                searchValue.page = 1;
                return handleSubmit();
              }
            "
          >
            <option
              v-for="limit of [10, 50, 100, 200, 500]"
              :key="limit"
              :disabled="limit === searchValue.limit"
            >
              {{ limit }}
            </option>
          </select>
        </div>

        <div class="flex flex-row items-center gap-2">
          <span class="min-w-4 text-right">
            {{ Math.min(data.total, searchValue.limit * (searchValue.page - 1) + 1) }}
          </span>
          -
          <span class="min-w-4 text-right">
            {{ Math.min(data.total, searchValue.limit * searchValue.page) }}
          </span>
          <span> of {{ data.total }} items </span>
        </div>

        <div class="flex flex-row items-center gap-2">
          <div class="relative inline-block">
            <input
              v-model.number="searchValue.page"
              type="range"
              min="1"
              :max="Math.ceil(data.total / searchValue.limit)"
              class="h-2 cursor-pointer rounded-lg bg-gray-200"
              :disabled="loading"
              @change="handleSubmit"
            />
            <span class="absolute end-0 -top-3 text-xs text-gray-500"> max </span>
            <span class="absolute end-0 -bottom-3 text-xs text-gray-500">
              {{ Math.ceil(data.total / searchValue.limit) }}
            </span>
          </div>
          <input
            v-model.number="searchValue.page"
            type="number"
            min="1"
            :max="Math.ceil(data.total / searchValue.limit)"
            step="1"
            class="inline-block rounded-sm border border-gray-300 bg-white px-2 py-1 text-gray-900"
            :disabled="loading"
            @change="handleSubmit"
          />
        </div>
      </footer>
    </div>
  </div>
</template>
