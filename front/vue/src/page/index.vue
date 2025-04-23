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
      ToDo List
    </RouterLink>
    <RouterLink
      :to="{
        name: '/numpad/',
      }"
    >
      Numpad
    </RouterLink>
  </div>
</template>
