import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useRouter } from "vue-router"

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const user = ref(null)
    const token = ref(null)
    const cluster = ref({ip: null})
    const loginList = ref([])
    const haveError = ref(false)
    const error_user = ref(null)
    const error_password = ref(null)

    function isAuthenticated() {
        return user.value !== null
    }

    function setCluster(clusterReceived) {
        cluster.value = clusterReceived
        router.push({name: 'home'})
    }

   function login(credentials) {
        haveError.value = false
         error_user.value = ""
         error_password.value = ""
        if (credentials.username === '') {
            error_user.value = 'Username is required'
            haveError.value = true
        }
        if (credentials.password === '') {
            error_password.value = 'Password is required'
            haveError.value = true
        }
        if(haveError.value) {
            return
        }
        axios.post('/login', {
            name: credentials.username,
            password: credentials.password,
        }).then(() => {
            user.value = credentials
            router.push({name: 'cluster'})
            
        }).catch(() => {
            error_password.value = 'Invalid username or password'
        })
   }

   function logout(){
    user.value = null
    cluster.value = {ip: null}
    router.push({name: 'login'})
   }
    return {isAuthenticated, setCluster, login, logout ,user, token, cluster, loginList, error_user, error_password} 
})