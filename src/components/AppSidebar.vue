<script setup>
import { Boxes, ChevronDown, LogOut, ArrowLeftRightIcon, ServerCrash, Repeat2, Monitor, AppWindow } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: AppWindow,
  },
  {
    title: "High Availability",
    icon: Repeat2,
  },
  {
    title: "Live Migration",
    url: "live-migration",
    icon: ArrowLeftRightIcon,
  },
  {
    title: "Fault Tolerance",
    url: "fault-tolerance",
    icon: ServerCrash,
  },
];

const ha_items = [
  {
    title: "Cluster",
    url: "ha-cluster",
    icon: Boxes,
  },
  {
    title: "VM's",
    url: "vms",
    icon: Monitor,
  },
]

let authStore = useAuthStore()
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel class="mb-4">Hypervisor HA & LM Manager</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <Collapsible defaultOpen class="group/collapsible">
              <SidebarMenuItem v-for="item in items" :key="item.title" class="m-1">
                <CollapsibleTrigger v-if="item.title == 'High Availability'" asChild>
                  <div class="flex">
                    <SidebarMenuButton asChild>
                      <RouterLink :to="{ name: item.url }">
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                        <ChevronDown class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                          asChild />
                      </RouterLink>
                    </SidebarMenuButton>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent v-if="item.title == 'High Availability'">
                  <SidebarMenuSub>
                    <SidebarMenuSubItem v-for="item_ha in ha_items">
                      <SidebarMenuSubButton>
                        <RouterLink :to="{ name: item_ha.url }">
                          <span>{{ item_ha.title }}</span>
                        </RouterLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
                <SidebarMenuButton v-if="item.title != 'High Availability'" asChild>
                  <RouterLink :to="{ name: item.url }">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <div class="mt-auto p-4 border-t">
      <div class="flex items-center justify-between space-x-4">
        <div>
          <p class="text-sm text-gray-500">Cluster IP: <span class="font-semibold">{{ authStore.cluster.ip }}</span></p>
          <p class="text-sm text-gray-500">Username: <span class="font-semibold">{{ authStore.user }}</span></p>
        </div>
        <Button variant="outline" class="text-s px-2 py-1" @click="authStore.logout" alt-title="Logout">
          <LogOut class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </Sidebar>
</template>