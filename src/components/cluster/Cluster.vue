<script setup>
import { onMounted, ref, inject } from 'vue';
import Table from '@/components/tables/Table.vue';
import { ColumnsCluster } from './columns_cluster';
import ClusterForm from './ClusterForm.vue';
import { provide } from 'vue'
import Preloader from '../Preloader.vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { CirclePlus } from 'lucide-vue-next';
import { useSocketStore } from '@/stores/socket';
import { get } from '@vueuse/core';
let groups = ref([]);
const isDialogOpen = ref(false)
const updateTable = ref(false);
const openToast = inject('openToast');
let socketStore = useSocketStore();

async function deleteClusterGroup(group) {
  try {
    let response = await socketStore.deleteHAGroup({group: group.trim()});
    if (response.error != null) {
      throw new Error(response.error);
    }
    getGroups();
    openToast("Success", "Group deleted successfully", 'success');
  } catch {
    openToast("Error", "Error deleting group", 'destructive');
  }
}

provide('deleteClusterGroup', deleteClusterGroup);

const closeDialog = () => {
  isDialogOpen.value = false
}

async function getGroups() {
  updateTable.value = true;

  try {
    groups.value = []
    let response = await socketStore.getHAGroups();
    if (response.error) {
      throw new Error(response.error);
    }
    groups.value = response;
    updateTable.value = false;
  } catch (error) {
    openToast("Error", "Error fetching HA Cluster", 'destructive');
    updateTable.value = false;
    return;
  }
}

provide('getGroups', getGroups);

onMounted(() => {
  getGroups();
});
</script>

<template>
  <div class="px-20 bg-gray-100 py-20 h-screen">
    <h1 class="text-4xl mb-12">Cluster - Groups</h1>
    <div class="pl-12 pt-12 pr-10 pb-10 rounded-lg shadow-2xl animate-fade w-full bg-white">
      <div class="flex space-x-3 border-none text-base">
        <div v-if="!updateTable" class="w-full h-10 flex justify-end animate-fade">
          <Dialog v-model:open="isDialogOpen">
            <DialogTrigger>
              <div class="flex cursor-pointer">
                <component :is="CirclePlus" class="mr-2 h-5" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Group</DialogTitle>
                <DialogDescription>
                  Add a new group to the cluster
                </DialogDescription>
              </DialogHeader>
              <div>
                <ClusterForm @closeDialog="closeDialog" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div v-if="updateTable" class="w-1/3 h-1/3 mx-auto items-center justify-center flex">
        <Preloader class="w-1/6 h-1/6" />
      </div>
      <Table class="animate-fade mt-5" v-if="!updateTable" :data="groups" :columns="ColumnsCluster" />
    </div>
  </div>
</template>