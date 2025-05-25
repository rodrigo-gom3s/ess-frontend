import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref, inject, computed } from "vue";
import { useAuthStore } from "./auth";
import { get } from "@vueuse/core";

export const useSocketStore = defineStore('socket', () => {

    let socket = io()
    const socketConnected = ref(false)
    const clusters = ref([])
    const authStore = useAuthStore()
    let clusterResources = ref([])

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
        socket.off('get_cluster')
        socket.emit('get_cluster')
        socket.on('get_cluster', (response) => {
            console.log(response)
            clusters.value = response
        })
    }

     function getHAGroups() {
        return new Promise((resolve) => {
            socket.off('/rest/ha/groups/get')
            socket.emit('/rest/ha/groups/get', {"ip": authStore.cluster.ip})
            socket.on('/rest/ha/groups/get', (response) => {
                resolve(JSON.parse(response))
            })
        })
    }

    function postHAGroup(data) {
        return new Promise((resolve) => {
            socket.off('/rest/ha/groups/post')
            socket.emit('/rest/ha/groups/post', {"ip": authStore.cluster.ip, "data": data})
            socket.on('/rest/ha/groups/post', (response) => {
                resolve(JSON.parse(response))
            })
        })
    }

    function deleteHAGroup(data) {
        return new Promise((resolve) => {
        socket.off('/rest/ha/groups/delete')
        socket.emit('/rest/ha/groups/delete', {"ip": authStore.cluster.ip, "data": data})
        socket.on('/rest/ha/groups/delete', (response) => {
            resolve(JSON.parse(response))
        })
        })
    }

    function getHAResources() {
        socket.off('/rest/ha/resources/get')
        socket.emit('/rest/ha/resources/get', {"ip": authStore.cluster.ip})
        socket.on('/rest/ha/resources/get', (response) => {
            return JSON.parse(response)
        })
    }

    function postHAResource(data) {
        socket.off('/rest/ha/resources/post')
        socket.emit('/rest/ha/resources/post', {"ip": authStore.cluster.ip, "data": data})
        socket.on('/rest/ha/resources/post', (response) => {
            console.log(response)
        })
    }

    function deleteHAResource(data) {
        socket.off('/rest/ha/resources/delete')
        socket.emit('/rest/ha/resources/delete', {"ip": authStore.cluster.ip, "data": data})
        socket.on('/rest/ha/resources/delete', (response) => {
            console.log(response)
        })
    }

     function getClusterResources() {
        return new Promise((resolve) => {
            socket.off('/rest/cluster/resources/get')
            socket.emit('/rest/cluster/resources/get', {"ip": authStore.cluster.ip})
            socket.on('/rest/cluster/resources/get', (response) => {
                resolve(JSON.parse(response))
            })
        })
    }

    function postQemuMigration(data) {
        socket.off('/rest/qemu/migration/post')
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
    postQemuMigration,
    clusterResources
}
})