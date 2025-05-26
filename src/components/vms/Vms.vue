<script setup>
import { onMounted, ref, inject } from 'vue';
import Table from '@/components/tables/Table.vue';
import { ColumnsVM } from './columns_vm';
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
import VmsForm from './VmsForm.vue';
import { CirclePlus } from 'lucide-vue-next';
import { useSocketStore } from '@/stores/socket';
import { get } from '@vueuse/core';
let vms = ref([]);
const isDialogOpen = ref(false)
const updateTable = ref(false);
const openToast = inject('openToast');
let socketStore = useSocketStore();

async function deleteVM(vm) {
  try {
    let response = await socketStore.deleteHAResource({sid: vm.trim()});
    if (response.error != null) {
      throw new Error(response.error);
    }
    getVMS();
    openToast("Success", "VM removed from the HA cluster successfully", 'success');
  } catch {
    openToast("Error", "Error removing vm from the HA cluster", 'destructive');
  }
}

provide('deleteVM', deleteVM);

const closeDialog = () => {
  isDialogOpen.value = false
}

async function getVMS() {
  updateTable.value = true;

  try {
    vms.value = []
    let response = await socketStore.getHAResources();
    if (response.error) {
      throw new Error(response.error);
    }
    response.forEach((item) => {
      if (item.type === 'vm') {
        vms.value.push({
          sid: item.sid.split(':')[1],
          state: item.state,
          group: item.group ? item.group : ' --------- ',
        });
      }
    });
    updateTable.value = false;
  } catch (error) {
    openToast("Error", "Error fetching HA VM's", 'destructive');
    updateTable.value = false;
    return;
  }
}

provide('getVMS', getVMS);

onMounted(() => {
  getVMS();
});
</script>

<template>
  <div class="px-20 bg-gray-100 py-20 h-screen">
    <h1 class="text-4xl mb-12">VM's</h1>
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
                <DialogTitle>Add VM</DialogTitle>
                <DialogDescription>
                  Add a new virtual machine to the HA cluster
                </DialogDescription>
              </DialogHeader>
              <div>
                <VmsForm @closeDialog="closeDialog" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div v-if="updateTable" class="w-1/3 h-1/3 mx-auto items-center justify-center flex">
        <Preloader class="w-1/6 h-1/6" />
      </div>
      <Table class="animate-fade mt-5" v-if="!updateTable" :data="vms" :columns="ColumnsVM" />
    </div>
  </div>
</template>