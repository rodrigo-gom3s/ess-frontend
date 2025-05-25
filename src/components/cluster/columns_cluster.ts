import type { ColumnDef } from '@tanstack/vue-table'
import Nodes from '@/components/cluster/Nodes.vue'
import { h } from 'vue'
import DeleteCluster from './DeleteCluster.vue'

interface Cluster{
    group: string
    nodes: string
}

export const ColumnsCluster: ColumnDef<Cluster>[] = [
    {
        accessorKey: 'group',
        header: 'Group Name',
    },
    {
            header: 'Nodes',
            id: 'nodes',
            enableHiding: false,
            cell: ({ row }) => {
                var row_value = row.original
                return h('div', { class: 'relative' }, h(Nodes, {
                nodes: row_value.nodes,
                }))
            },
    },
    {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    var row_value = row.original
                  return h('div', { class: 'relative transition text-red-500 hover:text-red-700 cursor-pointer flex justify-end' }, h(DeleteCluster, {
                    row_value
                  }))
                },
        }
]