import type { ColumnDef } from "@tanstack/vue-table";
import Nodes from "@/components/cluster/Nodes.vue";
import { h } from "vue";
import DeleteVM from "@/components/vms/DeleteVM.vue";
import Disabled from "./Disabled.vue";

interface VM {
  name: string;
  state: string;
}

export const ColumnsVM: ColumnDef<VM>[] = [
  {
    accessorKey: "sid",
    header: "VM ID",
  },
  {
    header: "Status",
    id: "status",
    enableHiding: false,
    cell: ({ row }) => {
      var row_value = row.original;
      return h(
        "div",
        { class: "relative" },
        h(Disabled, {
          status: row_value.state,
        })
      );
    },
  },
  {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    var row_value = row.original
                  return h('div', { class: 'relative transition text-red-500 hover:text-red-700 cursor-pointer flex justify-end' }, h(DeleteVM, {
                    row_value
                  }))
                },
        }
];
