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
import Table from '@/components/tables/Table.vue';
import { ColumnsNode } from './columns_nodes';
const props = defineProps({
  cluster: {
    type: Object,
    required: false
  }
})

let cluster = reactive({
  group: "",
  nodes: []
})

let errors = reactive({
  group: "",
  nodes: ""
})
let socketStore = useSocketStore();
const isLoaded = ref(false)
const NODES_OPTIONS = ref([])
const emit = defineEmits(['closeDialog'])
const openToast = inject('openToast')
let updateTable = ref(false)
let getGroups = inject('getGroups')
let haveErrors = false

function getClusterNodes() {
  if (props.cluster == null || props.cluster.nodes == null) {
    return
  }
  cluster.group = props.cluster.group
  cluster.nodes.value = props.cluster.nodes.split(',')
}

provide('deleteNode', deleteNode)

function deleteNode(node) {
  updateTable.value = true
  const index = cluster.nodes.findIndex((item) => item.value === node)
  if (index !== -1) {
    cluster.nodes.splice(index, 1)
    updateTable.value = false
  }
}

function insertNode(node) {
  updateTable.value = true
  if (cluster.nodes.find((item) => item.value === node)) {
    updateTable.value = false
    return
  }
  cluster.nodes.push(node)
  updateTable.value = false
}

function getNodes() {
  try {
    NODES_OPTIONS.value = []
    socketStore.getClusterResources().then((response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      response.forEach((item) => {
        if (item.type === 'node') {
          NODES_OPTIONS.value.push({
            value: item.node,
            text: item.node
          })
        }
      })
      isLoaded.value = true
    })
  } catch (error) {
    openToast('Error fetching nodes', error?.response?.data?.detail != null ? error.response.data.detail : error.message, 'destructive')
    emit('closeDialog')
  }
}

const insertGroup = async () => {
  errors.group = ''
  errors.nodes = ''
  haveErrors = false
  if (cluster.group == '') {
    errors.group = 'Group name is required'
    haveErrors = true
  }
  if (cluster.nodes.length === 0) {
    errors.nodes = 'At least one node is required'
    haveErrors = true
  }
  if (haveErrors) {
    return
  }

  try {
    let response = await socketStore.postHAGroup({
      group: cluster.group,
      nodes: cluster.nodes.join(','),
      nofailback: 1
    })
    if (response.error != null) {
      throw new Error(response.error);
    }
    getGroups()
    openToast('Success', 'HA Group created successfully', 'success')
    emit('closeDialog')
  } catch (error) {
    openToast('Error', 'Error creating the HA Group', 'destructive')
    emit('closeDialog')
  }
}


function submitForm () {
  insertGroup()
}

onMounted(() => {
  isLoaded.value = false
  getClusterNodes()
  getNodes()
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg w-full" v-if="isLoaded">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="mb-4">
        <label class="block text-gray-700">Name</label>
        <input type="text" name="name"
          class="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
          v-model="cluster.group" placeholder="HA Group Name" />
        <div v-if="errors.group">
          <p class="text-sm text-red-700 mt-4">{{ errors.group }} </p>
        </div>
      </div>
      <div class="mb-8">
        <label class="block text-gray-700 mb-2">Nodes</label>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              Select a node to insert
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem @click="insertNode(node.value)" class="cursor-pointer" v-for="node in NODES_OPTIONS"
                :key="node.value" :value="node.value">
                <span>{{ node.value }}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div v-show="errors.nodes">
          <p class="text-sm text-red-700 mt-4">{{ errors.nodes }} </p>
        </div>
      </div>
      <div class="mb-8">
        <Table class="animate-fade mt-5" v-if="!updateTable" :data="cluster.nodes.map(item => ({ name: item }))" :columns="ColumnsNode" />
      </div>
      <button type="submit" class="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-black">Confirm</button>
    </form>
  </div>
</template>