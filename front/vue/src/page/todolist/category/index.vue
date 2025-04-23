<script setup lang="ts">
useTitle('vue | ToDo List');

import { useCategory } from '../composable/useCategory';

const { category_list, handleAddCategory, handleEditCategory, handleRemoveCategory } =
  useCategory();
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
              :to="{ name: '/todolist/category/' }"
              exact-active-class="text-gray-900"
              class="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-600"
            >
              <span class="ms-1 capitalize">category</span>
            </RouterLink>
          </li>
        </ol>
      </nav>
    </div>

    <div class="container mx-auto">
      <header
        class="z-10 flex flex-row items-center gap-2 rounded-t border border-gray-300 bg-gray-50 p-2 px-4 py-2 text-sm"
      >
        <button
          type="button"
          :class="[
            'inline-flex items-center justify-center shadow-xs transition-all focus:ring-3 focus:outline-hidden',
            'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:hover:bg-gray-400 disabled:hover:text-gray-200',
            'min-w-[120px] rounded-md border px-4 py-2 text-sm font-medium',
            'border-blue-700 bg-white text-blue-700 hover:bg-blue-800 hover:text-white',
            'capitalize',
          ]"
          @click="handleAddCategory"
        >
          <span class="icon-[icon-park-solid--add-one] h-4 w-4"></span>
          <span class="ms-1 capitalize">add category</span>
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
              <div class="flex items-center justify-center">category</div>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center">created</div>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center">updated</div>
            </th>
            <th
              scope="col"
              :class="[
                'sticky top-[-1px] z-10 resize-x overflow-x-hidden bg-gray-300 p-2 capitalize',
              ]"
            >
              <div class="flex items-center justify-center"></div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white text-gray-900">
          <tr
            v-for="(category, i) of category_list"
            :key="category.category_id"
            class="divide-x divide-gray-200"
          >
            <td class="max-w-48">
              <button
                class="flex w-full cursor-pointer justify-end px-2 py-1 text-blue-600 hover:underline"
                type="button"
                @click="async () => await handleEditCategory(category)"
              >
                #{{ i + 1 }}
              </button>
            </td>
            <td class="max-w-48">
              <div
                class="line-clamp-1 flex min-w-28 items-center gap-0.5 px-2 py-1"
                :title="category.category_name"
              >
                {{ category.category_name }}
              </div>
            </td>
            <td class="max-w-48">
              <div class="line-clamp-1 min-w-32 px-2 py-1">
                {{ category.created_at }}
              </div>
            </td>
            <td class="max-w-48">
              <div class="line-clamp-1 min-w-32 px-2 py-1">
                {{ category.updated_at }}
              </div>
            </td>
            <td class="max-w-48">
              <div class="line-clamp-1 min-w-2 px-2 py-1">
                <button
                  type="button"
                  :class="[
                    'inline-flex items-center justify-center shadow-sm transition-all focus:ring focus:outline-none',
                    'rounded-3xl p-1',
                    'border-gray-300 bg-white text-gray-800 hover:bg-gray-200',
                  ]"
                  title="add category"
                  @click="async () => await handleRemoveCategory(category)"
                >
                  <span class="icon-[heroicons--x-mark-16-solid] h-3 w-3"></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
