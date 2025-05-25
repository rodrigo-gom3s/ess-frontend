<script setup>
import { ref, inject } from 'vue'
import {CircleX} from 'lucide-vue-next'
import axios from 'axios'
const openToast = inject('openToast')
var alertDialog = inject('alertDialog')
const getNamespaces = inject('getNamespaces')

const props = defineProps({
  row_value: {
    type: Object,
    required: true
  }
})

function deleteConfirmed() {
  axios.delete('v1/namespaces/' + props.row_value.name)
    .then(response => {
      openToast('Namespace deleted', 'The namespace has been successfully deleted.', 'success')
      getNamespaces()
    })
    .catch(error => {
      openToast('Error deleting namespace', error.response.data.match(/<p>.*?<\/p>/g)[0].replace(/<p>/g, "").replace(/<\/p>/g, ""), 'destructive')
    });
}
function deleteNamespace() {
  alertDialog.value.open(
    deleteConfirmed,
    'Do you really want to delete this namespace ?', 'Cancel', 'Yes',
    'Before deleting this namespace, be sure that you are not using it in any other configuration. This action cannot be undone.')
}
</script>

<template>
            <div v-if="row_value.status === 'Active'"  @click="deleteNamespace">
              <component :is="CircleX" class="mr-2 h-5" />
              <p>Delete Namespace</p>
            </div>
</template>