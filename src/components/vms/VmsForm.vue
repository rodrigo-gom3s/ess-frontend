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


let vm = reactive({
  name: "",
  group: "",
})

let errors = reactive({
  name: "",
  group: ""
})

let haveError = false
let socketStore = useSocketStore();
const isLoadedVMS = ref(false)
const isLoadedGroups = ref(false)
const VMS_OPTIONS = ref([])
const GROUPS_OPTIONS = ref([])
const emit = defineEmits(['closeDialog'])
const openToast = inject('openToast')
let updateTable = ref(false)
let getVMS = inject('getVMS')



function getVMSOptions() {
  try {
    VMS_OPTIONS.value = []
    socketStore.getClusterResources().then((response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      response.forEach((item) => {
        if (item.type === 'qemu') {
          VMS_OPTIONS.value.push({
            value: item.name,
            text: item.name
          })
        }
      })
      isLoadedVMS.value = true
    })
  } catch (error) {
    openToast("Error fetching VM's", error?.response?.data?.detail != null ? error.response.data.detail : error.message, 'destructive')
    emit('closeDialog')
  }
}

function getGroups() {
  try {
    GROUPS_OPTIONS.value = []
    socketStore.getHAGroups().then((response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      response.forEach((item) => {
        GROUPS_OPTIONS.value.push({
          value: item.group,
          text: item.group
        })
      })
      isLoadedGroups.value = true
    })
  } catch (error) {
    openToast("Error fetching HA Groups", error?.response?.data?.detail != null ? error.response.data.detail : error.message, 'destructive')
    emit('closeDialog')
  }
}

const insertVM = async () => {
  haveError = false
  errors.name = ""
  errors.group = ""
  if (vm.name === "") {
    errors.name = "Please select a VM"
    haveError = true
  }
  if (vm.group === "") {
    errors.group = "Please select a HA group"
    haveError = true
  }

  if (haveError) {
    return
  }

  try {
    let response = await socketStore.postHAResource({
      sid: "vm:" + vm.name.split(' ')[1],
      group: vm.group,
      state: "started",
    })
    if (response.error != null) {
      throw new Error(response.error);
    }
    getVMS()
    emit('closeDialog')
    openToast('Success', 'VM added to HA cluster successfully', 'success')
  } catch (error) {
    console.error(error)
    openToast('Error', 'Error adding VM to the HA cluster', 'destructive')
  }
}


const submitForm = () => {
  insertVM()
}

onMounted(() => {
  isLoadedVMS.value = false
  isLoadedGroups.value = false
  getVMSOptions()
  getGroups()
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg w-full" v-if="isLoadedVMS && isLoadedGroups">
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
      <div class="mb-4">
        <label class="block text-gray-700">HA Group</label>
        <select v-model="vm.group"
          class="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600">
          <option value="" disabled selected>Select a HA group</option>
          <option v-for="group in GROUPS_OPTIONS" :value="group.value">{{ group.value }}</option>
        </select>
        <div v-if="errors.group">
          <p class="text-sm text-red-700 mt-4">{{ errors.group }} </p>
        </div>
      </div>
      <button type="submit" class="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-black">Confirm</button>
    </form>
  </div>
</template>