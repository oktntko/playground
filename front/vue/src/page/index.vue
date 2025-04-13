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
    <RouterLink
      :to="{
        name: '/numpad/',
      }"
    >
      電卓
    </RouterLink>
  </div>
</template>
