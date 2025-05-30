<script setup>
import { ref, onMounted, inject, provide, reactive } from 'vue'
import { useSocketStore } from '@/stores/socket';
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { node } from '@unovis/ts/components/sankey/style';


let vm = reactive({
  name: "",
  node: "",
})

let errors = reactive({
  name: "",
  node: ""
})

let haveError = false
let socketStore = useSocketStore();
const isLoadedResources = ref(false)
const VMS_OPTIONS = ref([])
const NODES_OPTIONS = ref([])
const emit = defineEmits(['closeDialog'])
const openToast = inject('openToast')
let updateTable = ref(false)
let getVMSLM = inject('getVMSLM')

function getNodeOfVM(vmName) {
  const vmOption = VMS_OPTIONS.value.find(option => option.value === vmName);
  return vmOption?.node
}

function getResourcesOptions() {
  VMS_OPTIONS.value = []
  NODES_OPTIONS.value = []

  socketStore.getClusterResources().then((response) => {
    if (response.error) {
      throw new Error(response.error);
    }
    response.forEach((item) => {
      if (item.type === 'qemu') {
        VMS_OPTIONS.value.push({
          value: item.id,
          text: item.id,
          node: item.node
        })
      }
      if (item.type === 'node') {
        NODES_OPTIONS.value.push({
          value: item.node,
          text: item.node
        })
      }
    })
    isLoadedResources.value = true
  }).catch((error) => {
    openToast("Error fetching page options", error?.response?.data?.detail != null ? error.response.data.detail : error.message, 'destructive')
    emit('closeDialog')
  })
}


const insertVM = async () => {
  try {

    let response = await socketStore.postQemuMigration({
      vmid: Number(vm.name.split('/')[1].trim()),
      node: getNodeOfVM(vm.name),
      target: vm.node,
      online: 1
    })
    if (response.error != null) {
      throw new Error(response.error);
    }
    getVMSLM()
    emit('closeDialog')
    openToast('Success', 'VM live migration started successfully', 'success')
  } catch (error) {
    openToast('Error',  error, 'destructive')
  }
}


const submitForm = () => {
  haveError = false
  errors.name = ""
  errors.node = ""
  if (vm.name === "") {
    errors.name = "Please select a VM"
    haveError = true
  }
  if (vm.node === "") {
    errors.node = "Please select a Proxmox node"
    haveError = true
  }

  if (haveError) {
    return
  }

  insertVM()
}

onMounted(() => {
  isLoadedResources.value = false
  getResourcesOptions()
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg w-full" v-if="isLoadedResources">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="mb-4">
        <label class="block text-gray-700">VM</label>
        <select v-model="vm.name"
          class="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600">
          <option value="" disabled selected>Select a virtual machine</option>
          <option v-for="vm in VMS_OPTIONS" :value="vm.value">{{ vm.value }}</option>
        </select>
        <div v-if="errors.name">
          <p class="text-sm text-red-700 mt-4">{{ errors.name }} </p>
        </div>
      </div>
      <div v-if="vm.name" class="mb-4">
        <label class="block text-gray-700">Proxmox Node</label>
        <select v-model="vm.node"
          class="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600">
          <option value="" disabled selected>Select a Proxmox node</option>
          <option v-for="node in NODES_OPTIONS" v-show="getNodeOfVM(vm.name) != node.value" :value="node.value">{{ node.value }}</option>
        </select>
        <div v-if="errors.node">
          <p class="text-sm text-red-700 mt-4">{{ errors.node }} </p>
        </div>
      </div>
      <button type="submit" class="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-black">Confirm</button>
    </form>
  </div>
</template>