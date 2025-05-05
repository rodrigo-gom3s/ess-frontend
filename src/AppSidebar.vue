<script setup>
import { Binary, Calendar, ChevronDown, EthernetPort, Home, Inbox, Search, Settings, ShieldUser, Wifi, Workflow, LogOut, Repeat2, ArrowLeftRight, ServerCrash } from "lucide-vue-next"
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
import { RouterLink } from "vue-router";
import { useAuthStore } from "./stores/auth";


const authStore = useAuthStore()

// Menu items.
const items = [
  {
    title: "High Availability",
    url: "high-availability",
    icon: Repeat2,
  },
  {
    title: "Live Migration",
    url: "live-migration",
    icon: ArrowLeftRight,
  },
  {
    title: "Fault Tolerance",
    url: "fault-tolerance",
    icon: ServerCrash,
  },
];

</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel class="mb-4">Hypervisor High Availability and Live Migration Manager</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <Collapsible defaultOpen class="group/collapsible">
              <SidebarMenuItem v-for="item in items" :key="item.title" class="m-1">
                <SidebarMenuButton asChild>
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
  </Sidebar>
</template>