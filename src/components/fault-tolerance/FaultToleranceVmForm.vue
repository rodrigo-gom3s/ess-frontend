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
import { get } from '@vueuse/core';


let vm = reactive({
  name: "",
})

let errors = reactive({
  name: "",
})

let haveError = false
let socketStore = useSocketStore();
const isLoadedVMS = ref(false)
const isLoadedFTVMS = ref(false)
const VMS_OPTIONS = ref([])
const emit = defineEmits(['closeDialog'])
const openToast = inject('openToast')
let getVMS = inject('getVMS')
let ft_VMS = []



function getVMSOptions() {
  try {
    VMS_OPTIONS.value = []
    socketStore.getHAResources().then((response) => {
      if (response.error) {
        throw new Error(response.error);
      } 
      response.forEach((item) => {
        if (item.type === 'vm') {
          VMS_OPTIONS.value.push({
            value: item.sid.replace('vm:', 'VM '),
            text: item.sid.replace('vm:', 'VM '),
          })
        }
      })
      isLoadedVMS.value = true
    })
  } catch (error) {
    openToast("Error fetching HA VM's", error?.response?.data?.detail != null ? error.response.data.detail : error.message, 'destructive')
    emit('closeDialog')
  }
}

function getFtVMS() {
  ft_VMS = []
  socketStore.getFaultTolerance().then((response) => {
    if (response.error) {
      throw new Error(response.error);
    }
    response.forEach((item) => {
      ft_VMS.push(item)
    })
    isLoadedFTVMS.value = true

  }).catch((error) => {
    openToast("Error fetching Fault Tolerance VM's", error?.response?.data?.detail != null ? error.response.data.detail : error.message, 'destructive')
  })
}

const insertVM = async () => {
  haveError = false
  errors.name = ""
  if (vm.name === "") {
    errors.name = "Please select a VM"
    haveError = true
  }

  if (haveError) {
    return
  }

  try {

    if (ft_VMS.includes("qemu/"+vm.name.split(' ')[1])) {
      throw new Error("VM is already part of the Fault Tolerance service");
    }
    ft_VMS.push("qemu/"+vm.name.split(' ')[1])
    let response = await socketStore.postFaultTolerance(ft_VMS);
    if (response.error != null) {
      throw new Error(response.error);
    }
    emit('closeDialog')
    openToast('Success', 'VM added to the Fault Tolerance service successfully', 'success')
    getVMS()
  } catch (error) {
    openToast('Error', 'Error adding VM to the Fault Tolerance service', 'destructive')
  }
}


const submitForm = () => {
  insertVM()
}

onMounted(() => {
  isLoadedVMS.value = false
  isLoadedFTVMS.value = false
  getVMSOptions()
  getFtVMS()
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg w-full" v-if="isLoadedVMS && isLoadedFTVMS">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="mb-4">
        <label class="block text-gray-700">VM</label>
        <select v-model="vm.name"
          class="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600">
          <option value="" disabled selected>Select a virtual machine</option>
          <option v-show="!ft_VMS.includes(vm.value.split(' ')[1])" v-for="vm in VMS_OPTIONS" :value="vm.value">{{ vm.value }}</option>
        </select>
        <div v-if="errors.name">
          <p class="text-sm text-red-700 mt-4">{{ errors.name }} </p>
        </div>
      </div>
      <button type="submit" class="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-black">Confirm</button>
    </form>
  </div>
</template>