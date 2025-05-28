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
import FaultToleranceVmForm from './FaultToleranceVmForm.vue';
import { CirclePlus } from 'lucide-vue-next';
import { useSocketStore } from '@/stores/socket';
import { get } from '@vueuse/core';

let vms = ref([]);
let ft_vms = ref([]);
const isDialogOpen = ref(false)
const updateTable = ref(false);
const openToast = inject('openToast');
let socketStore = useSocketStore();

const closeDialog = () => {
  isDialogOpen.value = false
}

async function getVMS() {
  updateTable.value = true;

  try {
    vms.value = []
    ft_vms.value = []
    let response = await socketStore.getFaultTolerance();
    if (response.error) {
      throw new Error(response.error);
    }
    let responseHA = await socketStore.getHAResources();
    if (responseHA.error) {
      throw new Error(responseHA.error);
    }
    responseHA.forEach((item) => {
      if (item.type === 'vm') {
        response.forEach((vm) => {
          if (vm.split('/')[1] === item.sid.split(':')[1]) {
            vms.value.push({
              sid: item.sid.split(':')[1],
              state: item.state,
            });
          }
        });
      }
    });
    updateTable.value = false;
  } catch (error) {
    openToast("Error", "Error fetching Fault Tolerance VM's", 'destructive');
    updateTable.value = false;
    return;
  }
}

provide('getVMS', getVMS);

async function deleteVM(vm) {
  let vmIndex = vms.value.findIndex((item) => item === vm);
  vms.value.splice(vmIndex, 1);
  try {
    let response = await socketStore.postFaultTolerance(vms.value.map((item) => "qemu/"+item.sid));
    if (response.error != null) {
      throw new Error(response.error);
    }
    getVMS();
    openToast("Success", "VM removed from the fault tolerance service successfully", 'success');
  } catch {
    openToast("Error", "Error removing vm from the fault tolerance service ", 'destructive');
  }
}

provide('deleteVM', deleteVM);

onMounted(() => {
  getVMS();
});
</script>

<template>
  <div class="px-20 bg-gray-100 py-20 h-screen">
    <h1 class="text-4xl mb-12">Fault Tolerance > VM's</h1>
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
                  Add a new virtual machine to the Fault Tolerance service
                </DialogDescription>
              </DialogHeader>
              <div>
                <FaultToleranceVmForm @closeDialog="closeDialog" />
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