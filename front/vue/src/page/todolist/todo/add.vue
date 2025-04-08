<script setup lang="ts">
useTitle('vue | ToDo リスト');

import { useLoading } from '~/plugin/LoadingPlugin';
import { useToast } from '~/plugin/ToastPlugin';

import { ApiTodo } from '../api/todo';
import TodoForm, { type ModelValue } from './component/TodoForm.vue';

const $router = useRouter();
const $loading = useLoading();
const $toast = useToast();

const modelValue = ref<ModelValue>({
  title: '',
  category_id: null,
  limit: null,
  done_at: null,
  order: null,
});

async function handleSubmit(modelValue: ModelValue) {
  const loading = $loading.open();
  try {
    await ApiTodo.createTodo(modelValue);

    $toast.info(`Data has saved.`);
    $router.push({
      name: '/todolist/todo/',
    });
  } finally {
    loading.close();
  }
}
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
              <span class="icon-[logos--vue] h-3 w-3"> </span>
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
              <span class="icon-[icons8--todo-list] h-3 w-3"> </span>
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

          <li class="inline-flex items-center">
            <span class="icon-[weui--arrow-filled]"></span>
          </li>
          <li class="inline-flex items-center">
            <RouterLink
              :to="{ name: '/todolist/todo/add' }"
              exact-active-class="text-gray-900"
              class="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-600"
            >
              <span class="ms-1 capitalize">add</span>
            </RouterLink>
          </li>
        </ol>
      </nav>
    </div>

    <TodoForm v-model="modelValue" class="px-4" @submit="handleSubmit"></TodoForm>
  </div>
</template>
