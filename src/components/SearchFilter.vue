<script setup lang="ts">
import { computed } from 'vue';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/button/Button.vue';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Filter, Search, Check } from 'lucide-vue-next';

const props = defineProps<{
    searchQuery: string;
    filter: string;
}>();

const emit = defineEmits<{
    (e: "update:searchQuery", value: string): void;
    (e: "update:filter", value: string): void;
}>();

const internalSearchQuery = computed({
    get: () => props.searchQuery,
    set: (value) => emit("update:searchQuery", value),
});

const filters = [
    { label: "All Debtors", value: "all" },
    { label: "With Balance", value: "outstanding" },
    { label: "Fully Paid", value: "cleared" },
];

</script>

<template>
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <!-- Search Input -->
        <div class="relative sm:w-1/2">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input v-model="internalSearchQuery" placeholder="Search debtors by name..." class="pl-10" />
        </div>

        <!-- Dropdown Filter -->
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline" class="w-full sm:w-auto">
                    <Filter class="w-4 h-4 mr-2" />
                    Filter
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent class="w-48">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem v-for="f in filters" :key="f.value" @click="emit('update:filter', f.value)"
                    class="flex items-center justify-between mt-1 cursor-pointer" :class="{
                        'bg-accent text-accent-foreground': props.filter === f.value
                    }">
                    {{ f.label }}

                    <!-- Check icon on active -->
                    <Check v-if="props.filter === f.value" class="w-4 h-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
