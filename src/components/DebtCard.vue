<script setup lang="ts">
import {
    Banknote,
    MoreHorizontal,
    MinusCircle,
    PlusCircle,
    FileText,
    SquarePen,
    Trash2,
} from "lucide-vue-next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDebtCard } from '@/composables/useDebtCard'
import type { Debtor } from "@/types";

const props = defineProps<Debtor>();
const { handleAction } = useDebtCard(props.id);

</script>

<template>
    <div class="w-full rounded-xl border border-gray-200 shadow-lg relative flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="bg-emerald-50 px-4 py-3 flex justify-between items-center">
            <div class="flex items-center gap-2 text-emerald-700">
                <Banknote class="w-5 h-5" />
                <span class="font-bold text-sm sm:text-base truncate">{{ props.name }}</span>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <button class="p-1 rounded-full hover:bg-emerald-100 transition-colors">
                        <MoreHorizontal class="w-5 h-5 text-emerald-700" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" class="w-52">
                    <DropdownMenuItem @click="handleAction('less')" class="text-green-700 cursor-pointer">
                        <MinusCircle class="w-4 h-4 mr-2" />
                        Less (Debtor Paid)
                    </DropdownMenuItem>

                    <DropdownMenuItem @click="handleAction('add')" class="text-red-700 cursor-pointer">
                        <PlusCircle class="w-4 h-4 mr-2" />
                        Add (Owes Again)
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem @click="handleAction('view')" class="cursor-pointer">
                        <FileText class="w-4 h-4 mr-2" />
                        View Transactions
                    </DropdownMenuItem>

                    <DropdownMenuItem @click="handleAction('edit')" class="cursor-pointer">
                        <SquarePen class="w-4 h-4 mr-2" />
                        Edit Debtor
                    </DropdownMenuItem>

                    <DropdownMenuItem @click="handleAction('delete')" class="text-red-600 cursor-pointer">
                        <Trash2 class="w-4 h-4 mr-2" />
                        Delete Debtor
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <!-- Body -->
        <div class="bg-white p-4 flex justify-between items-end gap-4">
            <div class="flex flex-col">
                <span class="text-xs text-gray-500 mb-1">Total Outstanding</span>
                <span class="text-2xl sm:text-3xl font-bold text-gray-900">
                    {{ props.current_balance }}
                </span>
            </div>

            <div class="text-right shrink-0">
                <p class="text-[10px] text-gray-400 mb-0.5">Last Activity</p>
                <p class="text-xs font-semibold text-emerald-600">
                    {{ props.last_updated }}
                </p>
            </div>
        </div>
    </div>
</template>