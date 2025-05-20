<script setup>
import { onMounted, ref } from 'vue';
import ClusterCard from './ClusterCard.vue'
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSocketStore } from '@/stores/socket';

const socketStore = useSocketStore()

socketStore.getClusters()

const authStore = useAuthStore()

function setCluster(cluster) {
  authStore.setCluster(cluster)
}


</script>

<template>
    <div class="w-full h-screen flex items-center justify-center">
    <Card class="w-[450px] p-4 px-8">
      <CardHeader>
        <CardTitle>Select the cluster you want to manage</CardTitle>
        <CardDescription>Click on the cluster information for access</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="max-h-64 overflow-y-auto">
          <div v-for="cluster in socketStore.clusters">
            <ClusterCard class="m-1 rounded-lg" :cluster="cluster" @select="setCluster"/>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
</template>