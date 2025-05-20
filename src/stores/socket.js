import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref, inject } from "vue";
import { useAuthStore } from "./auth";
import { get } from "@vueuse/core";

export const useSocketStore = defineStore('socket', () => {

    let socket = io()
    const socketConnected = ref(false)
    const clusters = ref([])
    const authStore = useAuthStore()

    function connectSocket() {
        socket = io("http://localhost:5000", {
            transports: ['websocket'],
            auth: {
                token: sessionStorage.getItem('token')
            }
        })
    }

    function disconnectSocket() {
        socket.disconnect()
    }


    function getClusters() {
        socket.emit('get_cluster')
        socket.on('get_cluster', (response) => {
            console.log(response)
            clusters.value = response
        })
    }

    function getHAGroups() {
        socket.emit('/rest/ha/groups/get', {"ip": authStore.cluster.ip})
        socket.on('/rest/ha/groups/get', (response) => {
            console.log(response)
        })
    }

    function postHAGroup(data) {
        socket.emit('/rest/ha/groups/post', {"ip": authStore.cluster.ip, "data": data})
        socket.on('/rest/ha/groups/post', (response) => {
            console.log(response)
        })
    }

    function deleteHAGroup(data) {
        socket.emit('/rest/ha/groups/delete', {"ip": authStore.cluster.ip, "data": data})
        socket.on('/rest/ha/groups/delete', (response) => {
            console.log(response)
        })
    }

    function getHAResources() {
        socket.emit('/rest/ha/resources/get', {"ip": authStore.cluster.ip})
        socket.on('/rest/ha/resources/get', (response) => {
            console.log(response)
        })
    }

    function postHAResource(data) {
        socket.emit('/rest/ha/resources/post', {"ip": authStore.cluster.ip, "data": data})
        socket.on('/rest/ha/resources/post', (response) => {
            console.log(response)
        })
    }

    function deleteHAResource(data) {
        socket.emit('/rest/ha/resources/delete', {"ip": authStore.cluster.ip, "data": data})
        socket.on('/rest/ha/resources/delete', (response) => {
            console.log(response)
        })
    }

    function getClusterResources() {
        socket.emit('/rest/cluster/resources/get', {"ip": authStore.cluster.ip})
        socket.on('/rest/cluster/resources/get', (response) => {
            console.log(response)
        })
    }

    function postQemuMigration(data) {
        socket.emit('/rest/qemu/migration/post', {"ip": authStore.cluster.ip, "data": data})
        socket.on('/rest/qemu/migration/post', (response) => {
            console.log(response)
        })
    }


return {
    socketConnected,
    clusters,
    getClusters,
    connectSocket,
    disconnectSocket,
    getHAGroups,
    postHAGroup,
    deleteHAGroup,
    getHAResources,
    postHAResource,
    deleteHAResource,
    getClusterResources,
    postQemuMigration
}
})