<script setup lang="ts">
useTitle('vue | Not Found');
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto flex min-h-screen items-center px-6 py-12">
      <div class="mx-auto flex max-w-sm flex-col items-center text-center">
        <p class="rounded-full bg-blue-50 p-3 text-sm font-medium text-blue-500 dark:bg-gray-800">
          <span class="icon-[fa6-regular--face-dizzy] h-8 w-8"> </span>
        </p>
        <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-9xl dark:text-white">404</h1>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Not Found</p>

        <div class="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
          <RouterLink
            :to="{ name: '/' }"
            class="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <span class="icon-[line-md--home-twotone] h-5 w-5 rtl:rotate-180"></span>
            <span class="capitalize">back to home</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
