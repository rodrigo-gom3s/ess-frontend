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
const deleteClusterGroup = inject('deleteClusterGroup')
function useDeleteClusterGroup() {
  deleteClusterGroup(props.row_value.group)
}
function confirmDelete() {
    alertDialog.value.open(
    useDeleteClusterGroup,
    'Do you really want to delete this group ?', 'Cancel', 'Yes',
    'If you delete this group you may lost HA features in your cluster. This action cannot be undone.')
}
</script>

<template>
            <div  @click="confirmDelete">
              <component :is="CircleX" class="mr-2 h-5" />
            </div>
</template>