import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import DeleteNode from './DeleteNode.vue'

interface Node{
    name: string,
}

export const ColumnsNode: ColumnDef<Node>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                var row_value = row
              return h('div', { class: 'relative transition text-red-500 hover:text-red-700 cursor-pointer flex justify-end' }, h(DeleteNode, {
                row_value
              }))
            },
    }
]