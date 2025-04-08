<script setup lang="ts">
import dayjs from 'dayjs';
import type { z } from '~/lib/zod';

import { type ApiTodoSchema } from '../../api/todo';
import { useCategory } from '../../composable/useCategory';

const { category_list, handleAddCategory } = useCategory();

export type ModelValue = z.infer<typeof ApiTodoSchema.createInput>;

const modelValue = defineModel<ModelValue>({ required: true });

defineEmits<{
  submit: [ModelValue];
}>();

const status = computed({
  get() {
    return modelValue.value.done_at != null;
  },
  set(newValue) {
    modelValue.value.done_at = newValue ? dayjs().toISOString() : null;
  },
});
</script>

<template>
  <form class="space-y-4" autocomplete="off" @submit.prevent="() => $emit('submit', modelValue)">
    <section class="space-y-1">
      <div class="focus-container">
        <label for="title" class="required text-sm capitalize"> title </label>
        <input
          id="title"
          v-model.lazy="modelValue.title"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 sm:text-sm"
          required
          maxlength="100"
        />
      </div>

      <div class="focus-container">
        <label for="category_id" class="optional text-sm capitalize"> category </label>
        <div class="flex items-center gap-2">
          <select
            id="category_id"
            v-model.lazy="modelValue.category_id"
            class="inline-block rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 sm:text-sm"
          >
            <option :value="null">--Please choose an option--</option>
            <option
              v-for="category of category_list"
              :key="category.category_id"
              :value="category.category_id"
            >
              {{ category.category_name }}
            </option>
          </select>
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
                  modelValue.category_id = category.category_id;
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
      </div>

      <div class="focus-container">
        <label for="limit" class="optional text-sm capitalize"> limit </label>
        <input
          id="limit"
          v-model.lazy="modelValue.limit"
          type="date"
          class="block rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 sm:text-sm"
        />
      </div>

      <div class="focus-container">
        <span class="text-sm capitalize"> status </span>
        <div class="flex items-center gap-2">
          <label for="active" class="inline-flex items-center font-medium text-gray-900 capitalize">
            <input
              id="active"
              v-model="status"
              type="radio"
              :value="false"
              class="mr-1 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
            />
            active
          </label>
          <label for="done" class="inline-flex items-center font-medium text-gray-900 capitalize">
            <input
              id="done"
              v-model="status"
              type="radio"
              :value="true"
              class="mr-1 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
            />
            done
          </label>
        </div>
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
      >
        save
      </button>
      <slot name="buttons"></slot>
    </section>
  </form>
</template>
