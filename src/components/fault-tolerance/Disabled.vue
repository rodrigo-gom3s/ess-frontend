<script setup>
import {ref} from 'vue'

const props = defineProps(
    {
        status: {
        type: String,
        required: true
        }
    }
)

</script>

<template>
<div  class="flex items-center">
    <div class="w-4 h-4 rounded-full" :class="props.status === 'started' ? 'bg-green-500' : 'bg-gray-300'"></div>
    <p class="ms-2 align-middle">{{ String(props.status).charAt(0).toUpperCase() + String(props.status).slice(1)}}</p>
</div>

</template>