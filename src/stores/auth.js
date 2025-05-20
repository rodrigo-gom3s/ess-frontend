import axios from "axios"
import { defineStore } from "pinia"
import { ref, provide } from "vue"
import { useRouter } from "vue-router"
import { useSocketStore } from "./socket"


export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const user = ref(null)
    const token = ref(null)
    const cluster = ref({ ip: null })
    const loginList = ref([])
    const haveError = ref(false)
    const error_user = ref(null)
    const error_password = ref(null)

    const socketStore = useSocketStore()

    function isAuthenticated() {
        return user.value !== null
    }

    function setCluster(clusterReceived) {
        cluster.value = clusterReceived
        router.push({ name: 'home' })
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
        if (haveError.value) {
            return
        }
        axios.post('/login', {
            name: credentials.username,
            password: credentials.password,
        }).then((response) => {
            console.log(response)
            token.value = response.data
            user.value = credentials.username
            sessionStorage.setItem('token', token.value)
            sessionStorage.setItem('user', JSON.stringify(user.value))
            socketStore.connectSocket()
            router.push({ name: 'cluster' })

        }).catch(() => {
            error_password.value = 'Invalid username or password'
        })
    }

    function logout() {
        user.value = null
        cluster.value = { ip: null }
        token.value = null
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        socketStore.disconnectSocket()
        router.push({ name: 'login' })
    }

    function register(credentials) {
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
        if (haveError.value) {
            return
        }
        axios.post('/signup', {
            name: credentials.username,
            password: credentials.password,
        }).then(() => {
            router.push({ name: 'login' })

        }).catch(() => {
            error_password.value = 'Invalid username'
        })
    }

    function restoreLogin() {
        token.value = sessionStorage.getItem('token')
        user.value = sessionStorage.getItem('user')
        if (token.value && user.value) {
            socketStore.connectSocket()
            router.push({ name: 'cluster' })
        }
    }

    return { isAuthenticated, setCluster, login, logout, register, restoreLogin, user, token, cluster, loginList, error_user, error_password }
})