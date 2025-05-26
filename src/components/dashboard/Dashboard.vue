<script setup>
import { onMounted, ref, inject } from 'vue';
import { DonutChart } from '@/components/ui/chart-donut'
import Preloader from '../Preloader.vue';
let openToast = inject('openToast');
import { useSocketStore } from '@/stores/socket';
let data = ref([]);
let socketStore = useSocketStore();

async function fetchNodesStatus() {
  data.value = [];

  try {
      let response = await socketStore.getClusterResources();
      if (response.error) {
        throw new Error(response.error);
      }
      response.forEach((item) => {
      if (item.type === 'node') {
        data.value.push([{
          node: item.node,
          name: item.node + " (Used)",
          disk_usage: Math.round(Number(item.disk) / Number(item.maxdisk) * 100),
          memory_usage: Math.round(Number(item.mem) / Number(item.maxmem) * 100),
          processor_usage: Math.round(item.cpu * 100),
        }, {
          node: item.node,
          name: item.node + " (Remaining)",
          disk_usage: 100 - Math.round(Number(item.disk) / Number(item.maxdisk) * 100),
          memory_usage: 100 - Math.round(Number(item.mem) / Number(item.maxmem) * 100),
          processor_usage: 100 - Math.round(item.cpu * 100),
        }]);
      }
    });
    return
  } catch (error) {
        openToast('Error', 'Error fetching nodes', 'error');
        return;
  }
}

const valueFormatter = (tick) =>
  typeof tick === 'number'
    ? `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(tick * 1)}%`
    : '';

onMounted(() => {
  fetchNodesStatus();
});
</script>

<template>
  <div class="pl-12 pt-12 pr-10 w-full h-screen bg-gray-100 overflow-y-auto">
    <h1 class="text-4xl mb-12">Dashboard</h1>
    <div v-if="data.length === 0" class="w-full h-3/4 mx-auto items-center justify-center flex">
      <Preloader class="w-1/6 h-1/6" />
    </div>
    <div v-if="data.length !== 0" class="bg-white rounded-lg shadow-2xl animate-fade w-full p-6">
      <h2 class="text-5xl font-light mx-10 my-5 text-black mb-6">Nodes</h2>
      <div class="2xl:flex m-10 p-10 border-2 border-slate-500 rounded-xl"
        v-for="data_item in data">
        <div>
          <h2 class="text-3xl 2xl:align-start 2xl:flex font-light underline text-black mb-6">Node {{ data_item[0].node }}
          </h2>
        </div>
        <div class="2xl:flex 2xl:justify-center 2xl:gap-5">
          <div class="flex flex-col items-center">
            <p>{{ data_item.node }}</p>
            <DonutChart index="name" category="memory_usage" :data="data_item" type="pie"
              :colors="['#2bb64d', '#e9e9e9']" :showLegend="true" :value-formatter="valueFormatter" />
            <p class="mb-2 text-black font-medium">Memory Usage (%)</p>
          </div>
          <div class="flex flex-col items-center">
            <DonutChart index="node" category="processor_usage" :data="data_item" type="pie"
              :colors="['#3d99cb', '#e9e9e9']" :showLegend="true" :value-formatter="valueFormatter" />
            <p class="mb-2 text-black font-medium">CPU Usage (%)</p>
          </div>
          <div class="flex flex-col  items-center">
            <DonutChart index="node" category="disk_usage" :data="data_item" type="pie" :colors="['#eaa52b', '#e9e9e9']"
              :showLegend="true" :value-formatter="valueFormatter" />
            <p class="mb-2 text-black font-medium">Disk Usage (%)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-10"></div>
  </div>
</template>
