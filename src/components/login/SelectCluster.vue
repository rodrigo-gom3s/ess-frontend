<script setup>
import { onMounted, ref } from 'vue';
import ClusterCard from './ClusterCard.vue'
import { useAuthStore } from '@/stores/auth';
import { LogOut } from 'lucide-vue-next'
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
  <div class="flex flex-col mt-10 items-center gap-5 h-screen">
    <div>
      <Card class="w-[550px] p-4 px-8">
        <CardHeader>
          <CardTitle>Middleware Manager's Token</CardTitle>
          <CardDescription>Copy the following token into your middleware configuration file to associate it to your
            account</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="max-h-64 m-1 rounded-lg shadow overflow-y-auto">
            <div class="p-4 border  bg-gray-100" disabled>
              <p class="text-sm text-slate-900">Token: <b>{{ authStore.token }}</b></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div>
      <Card class="w-[450px] p-4 px-8">
        <CardHeader>
          <CardTitle>Select the cluster you want to manage</CardTitle>
          <CardDescription>Click on the cluster information for access</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col">
          <div class="max-h-64 overflow-y-auto">
            <div v-for="cluster in socketStore.clusters">
              <ClusterCard class="m-1 rounded-lg" :cluster="cluster" @select="setCluster" />
            </div>
          </div>
          <div class="flex justify-end">
            <Button variant="outline" class="w-16 mt-2 px-2 py-1" @click="authStore.logout" alt-title="Logout">
              Exit
              <LogOut class="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>