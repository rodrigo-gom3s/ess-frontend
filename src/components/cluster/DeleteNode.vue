<script setup>
import { ref, inject } from 'vue'
import {CircleX, Edit} from 'lucide-vue-next'


const props = defineProps({
  row_value: {
    type: Object,
    required: true
  },
})
const deleteNode = inject('deleteNode')

</script>

<template>
            <div  @click="deleteNode(props.row_value.name)">
              <component :is="CircleX" class="mr-2 h-5" />
            </div>
</template>