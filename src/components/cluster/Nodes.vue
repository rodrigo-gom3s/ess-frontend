<script setup>

let props = defineProps({
    nodes:{
        type: String,
        required: true
    },
});

let nodesArray = props.nodes.split(',');
</script>

<template>
    <p>{{ nodesArray.join(' | ') }}</p>
</template>