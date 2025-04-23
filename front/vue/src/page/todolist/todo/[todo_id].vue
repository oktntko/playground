<script setup lang="ts">
useTitle('vue | ToDo List');

import { useLoading } from '~/plugin/LoadingPlugin';
import { useToast } from '~/plugin/ToastPlugin';

import { ApiTodo } from '../api/todo';
import TodoForm, { type ModelValue } from './component/TodoForm.vue';

const $router = useRouter();
const $route = useRoute('/todolist/todo/[todo_id]');
const $loading = useLoading();
const $toast = useToast();

const todo_id = $route.params.todo_id;

const res = await ApiTodo.getTodo({
  todo_id,
});
const modelValue = ref(res);
const updated_at = res.updated_at;

async function handleSubmit(modelValue: ModelValue) {
  const loading = $loading.open();
  try {
    await ApiTodo.updateTodo({
      ...modelValue,
      todo_id,
      updated_at,
    });

    $toast.info(`Data has saved.`);
    $router.push({
      name: '/todolist/todo/',
    });
  } finally {
    loading.close();
  }
}

async function handleDelete() {
  if (!window.confirm(`Do you really want to delete this data?`)) {
    return;
  }

  const loading = $loading.open();
  try {
    await ApiTodo.deleteTodo({
      todo_id,
      updated_at,
    });

    $toast.info(`Data has deleted.`);
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

          <li class="inline-flex items-center">
            <span class="icon-[weui--arrow-filled]"></span>
          </li>
          <li class="inline-flex items-center">
            <RouterLink
              :to="{ name: '/todolist/todo/[todo_id]', params: { todo_id } }"
              exact-active-class="text-gray-900"
              class="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-600"
            >
              <span class="ms-1 capitalize">edit</span>
            </RouterLink>
          </li>
        </ol>
      </nav>
    </div>

    <TodoForm v-model="modelValue" class="px-4" @submit="handleSubmit">
      <template #buttons>
        <button
          type="button"
          :class="[
            'inline-flex items-center justify-center shadow-xs transition-all focus:ring-3 focus:outline-hidden',
            'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:hover:bg-gray-400 disabled:hover:text-gray-200',
            'min-w-[120px] rounded-md border px-4 py-2 text-sm font-medium',
            'border-gray-300 bg-white text-gray-800 hover:bg-gray-200',
            'capitalize',
          ]"
          @click="handleDelete"
        >
          delete
        </button>
      </template>
    </TodoForm>
  </div>
</template>
