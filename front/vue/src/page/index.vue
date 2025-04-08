<script setup lang="ts">
useTitle('vue');
</script>

<template>
  <div>
    <RouterLink
      :to="{
        name: '/todolist/todo/',
      }"
    >
      ToDo リスト
    </RouterLink>
  </div>
</template>
