<script setup>
import { ref } from 'vue';
import { HomeIcon, SettingsIcon } from 'lucide-vue-next';
import { useSocketStore } from '@/stores/socket';
    const socketStore = useSocketStore();
    const selected = ref('Home');

  
</script>

<style>
button {
  transition: background-color 0.3s ease;
}
</style>

<template>
  <div class="flex h-screen w-full bg-gray-100">
    <main class="flex-1 flex items-center justify-center">
      <div class="text-center w-2/3">
        <h1 class="text-4xl font-semibold text-gray-900">Welcome to the Hypervisor High Availability (HA) and Live Migration (LM) Manager</h1>
        <p class="text-lg text-gray-600 mt-4 max-w-lg mx-auto">
          Using the left sidebar, you can navigate through the webpage and access different features and settings of the Hypervisor HA and LM Manager.
        </p>
      </div>
    </main>
  </div>
</template>


