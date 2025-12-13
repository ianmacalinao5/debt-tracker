<script setup lang="ts">
import { computed } from "vue";
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
} from "@/components/ui/dropdown-menu";

import type { Debtor, ActionType } from "@/types";

const props = defineProps<Debtor>();

const emit = defineEmits<{
    (e: "action", payload: { action: ActionType; debtor: Debtor }): void;
}>();

const doAction = (action: ActionType) => {
    emit("action", { action, debtor: props });
};

const formattedBalance = computed(() => {
    return Number(props.current_balance).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
});

const formattedUpdatedAt = computed(() => {
    if (!props.updated_at) return "";

    const date = new Date(props.updated_at);

    return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
});
</script>

<template>
    <div
        class="w-full rounded-xl border border-gray-200 shadow-lg relative flex flex-col overflow-hidden"
    >
        <!-- Header -->
        <div class="bg-emerald-50 px-4 py-3 flex justify-between items-center">
            <div class="flex items-center gap-2 text-emerald-700">
                <Banknote class="w-5 h-5" />
                <span class="font-bold text-sm sm:text-base truncate">{{
                    props.name
                }}</span>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <button
                        class="p-1 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                        <MoreHorizontal class="w-5 h-5 text-emerald-700" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" class="w-52">
                    <DropdownMenuItem
                        @click="doAction('less')"
                        class="text-green-700 cursor-pointer"
                    >
                        <MinusCircle class="w-4 h-4 mr-2" />
                        Less (Debtor Paid)
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        @click="doAction('add')"
                        class="text-red-700 cursor-pointer"
                    >
                        <PlusCircle class="w-4 h-4 mr-2" />
                        Add (Owes Again)
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        @click="doAction('view')"
                        class="cursor-pointer"
                    >
                        <FileText class="w-4 h-4 mr-2" />
                        View Transactions
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        @click="doAction('edit')"
                        class="cursor-pointer"
                    >
                        <SquarePen class="w-4 h-4 mr-2" />
                        Edit Debtor
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        @click="doAction('delete')"
                        class="text-red-600 cursor-pointer"
                    >
                        <Trash2 class="w-4 h-4 mr-2" />
                        Delete Debtor
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <!-- Body -->
        <div class="bg-white p-4 flex justify-between items-end gap-4">
            <div class="flex flex-col">
                <span class="text-xs text-gray-500 mb-1"
                    >Total Outstanding</span
                >
                <span class="text-2xl font-bold text-gray-900">
                    ₱{{ formattedBalance }}
                </span>
            </div>
            <div class="text-right shrink-0">
                <p class="text-[10px] text-gray-400 mb-0.5">Last Activity</p>
                <p class="text-xs font-semibold text-emerald-600">
                    {{ formattedUpdatedAt }}
                </p>
            </div>
        </div>
    </div>
</template>
