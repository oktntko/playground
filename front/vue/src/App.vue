<script setup lang="ts">
import { migrate } from '~/db';

const data = ref({
  sync: false,
});

onMounted(async () => {
  data.value = await migrate();
});
</script>

<template>
  <div>
    <RouterView v-if="data.sync" v-slot="{ Component }">
      <template v-if="Component">
        <Transition
          mode="out-in"
          enter-from-class="transform opacity-0"
          enter-active-class="transition ease-out duration-200"
          enter-to-class="transform opacity-100"
        >
          <KeepAlive>
            <Suspense>
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback>
                <div class="flex min-h-lvh grow flex-col items-center justify-center gap-4">
                  <span
                    class="text-opacity-60 icon-[line-md--loading-loop] h-16 w-16 text-gray-600"
                  ></span>
                  <span class="animate-pulse">Loading...</span>
                </div>
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
    <div v-else class="flex min-h-lvh grow flex-col items-center justify-center gap-4">
      <span class="text-opacity-60 icon-[line-md--loading-loop] h-16 w-16 text-gray-600"></span>
      <span class="animate-pulse">Loading...</span>
    </div>
  </div>
</template>
