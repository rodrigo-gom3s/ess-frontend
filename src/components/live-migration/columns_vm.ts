import type { ColumnDef } from '@tanstack/vue-table'
import Nodes from '@/components/cluster/Nodes.vue'
import { h } from 'vue'
import MigrateVM from '@/components/live-migration/MigrateVM.vue'
import Disabled from './Disabled.vue'

interface VM{
    name: string
    state: string
}

export const ColumnsVM: ColumnDef<VM>[] = [
    {
        accessorKey: 'sid',
        header: 'VM ID',
    },
    {
      accessorKey: 'node',
      header: 'Proxmox Node',
    },
    {
            header: 'Status',
            id: 'status',
            enableHiding: false,
            cell: ({ row }) => {
                var row_value = row.original
                return h('div', { class: 'relative' }, h(Disabled, {
                status: row_value.state,
                }))
            },
    },
]