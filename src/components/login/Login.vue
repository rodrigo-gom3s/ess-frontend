<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
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
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  username: '',
  password: ''
})


const login = () => {
  authStore.login(credentials.value)
}

</script>

<template>
  <div class="flex items-center justify-center space-x-4 p-8">
    <Card class="w-[450px] p-4 px-8">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your Hypervisor Information</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="username">Username</Label>
              <Input id="username" placeholder="Username" v-model="credentials.username" />
              <p v-if="authStore.error_user" class="text-red-500 text-xs">{{ authStore.error_user }}</p>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
              <Input id="password" placeholder="Password" type="password" v-model="credentials.password" />
              <p v-if="authStore.error_password" class="text-red-500 text-xs">{{ authStore.error_password }}</p>

            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter class="px-6 pb-6 flex justify-between">
        <div class="flex justify-start">
          <Button>
            <RouterLink :to="{name:'register'}">Register</RouterLink>
          </Button>
        </div>
        <div class="flex justify-end">
          <Button @click="login">
            Login
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>