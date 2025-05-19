<script setup>
const props = defineProps({
    cluster: {
        type: Object,
        required: true,
    }
})
const emit = defineEmits(['select'])

const handleClick = () => {
  emit('select', props.cluster)
}

</script>

<template>
    <div class="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer" @click="handleClick">
        <p class="text-sm text-slate-900">Cluster: <b >{{ props.cluster.ip }}</b></p>
    </div>
</template>