<script setup>
import { ref, onMounted, provide, useTemplateRef } from 'vue'
import { h } from 'vue'
import axios from 'axios'
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import SidebarTrigger from './components/ui/sidebar/SidebarTrigger.vue'
import { SidebarProvider } from './components/ui/sidebar'
import GlobalAlertDialog from '@/components/GlobalAlertDialog.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/auth'

const alertDialog = useTemplateRef('alert-dialog');
provide('alertDialog', alertDialog);
const { toast } = useToast()
const storeAuth = useAuthStore()

const openToast = (title_received, description_received, variant_recieved) => {
      toast({
        title: title_received,
        description: description_received,
        variant: variant_recieved,
      });
    }
  
provide('openToast', openToast);

</script>

<template>
  <div class="h-screen overflow-hidden">
      <GlobalAlertDialog ref="alert-dialog"></GlobalAlertDialog>
      <div :class="{'mx-auto md:ml-64': storeAuth.cluster.ip}">
        <main class="overflow-y-auto h-screen">
            <RouterView />
          </main>
      </div>
      <div>
        <SidebarProvider v-if="storeAuth.cluster.ip">
          <AppSidebar />
        </SidebarProvider>
      </div>
      <Toaster/>
  </div>
</template>
