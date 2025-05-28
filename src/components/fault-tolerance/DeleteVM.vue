<script setup>
import { ref, inject } from 'vue'
import {CircleX, Edit} from 'lucide-vue-next'
let alertDialog = inject('alertDialog')


const props = defineProps({
  row_value: {
    type: Object,
    required: true
  },
})
const deleteVM = inject('deleteVM')
function useDeleteClusterGroup() {
  deleteVM(props.row_value.sid)
}

function confirmDelete() {
    alertDialog.value.open(
    useDeleteClusterGroup,
    'Do you really want to remove this VM from the fault tolerance service ?', 'Cancel', 'Yes',
    'If you remove this VM from the fault tolerance service you may lost HA features in this VM. This action cannot be undone.')
}
</script>

<template>
            <div  @click="confirmDelete">
              <component :is="CircleX" class="mr-2 h-5" />
            </div>
</template>