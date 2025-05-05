<script setup>
import { Binary, Calendar, ChevronDown, EthernetPort, Home, Inbox, Search, Settings, ShieldUser, Wifi, Workflow, LogOut, ArrowLeftRightIcon, ServerCrash, Repeat2 } from "lucide-vue-next"
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


// Menu items.
const items = [
  {
    title: "High Availability",
    url: "",
    icon: Repeat2,
  },
  {
    title: "Live Migration",
    url: "",
    icon: ArrowLeftRightIcon,
  },
  {
    title: "Fault Tolerance",
    url: "",
    icon: ServerCrash,
  },
];

</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel class="mb-4">Hypervisor HA & LM Manager</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title" class="m-1">
                <SidebarMenuButton asChild>
                  <RouterLink :to="{ name: item.url }">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>