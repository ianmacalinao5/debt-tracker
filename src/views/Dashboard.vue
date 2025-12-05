<script setup lang="ts">
import DebtCard from '@/components/DebtCard.vue';
import { Button } from '@/components/ui/button';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import {
    Plus,
} from 'lucide-vue-next';
import { ref } from 'vue';
import { useDashboard } from '@/composables/useDashboard';
import Header from '@/components/Header.vue';
import MetricCard from '@/components/MetricCard.vue';
import SearchFilter from '@/components/SearchFilter.vue';
import NoDebtorsFound from '@/components/NoDebtorsFound.vue';

const debtors = ref([
    {
        id: 1,
        name: "John Doe",
        current_balance: "5,000",
        created_at: "12/04/2025 2:58 PM",
        last_updated: "12/05/2025 1:00 PM"
    },
    {
        id: 2,
        name: "Jane Smith",
        current_balance: "3,500",
        created_at: "12/04/2025 2:58 PM",
        last_updated: "12/05/2025 1:00 PM"
    },
    {
        id: 3,
        name: "Bob Johnson",
        current_balance: "7,200",
        created_at: "12/04/2025 2:58 PM",
        last_updated: "12/05/2025 1:00 PM"
    }
]);

const loading = ref(false);
const {
    totalOutstanding,
    totalDebtors,
    filteredDebtors,
    searchQuery,
    handleAddDebtor,
    handleLogout
} = useDashboard(debtors);

</script>

<template>
    <div class="px-3 py-4 lg:px-5 lg:py-6 w-full max-w-7xl mx-auto">
        <!-- Header Section -->
        <Header :handleAddDebtor="handleAddDebtor" :handleLogout="handleLogout" />

        <Button @click="handleAddDebtor" class="w-full sm:hidden mb-6">
            <Plus class="w-4 h-4 mr-2" />
            Add New Debtor
        </Button>

        <!-- Metric Cards -->
        <MetricCard :totalOutstanding="totalOutstanding" :totalDebtors="totalDebtors" />

        <!-- Search and Filter Bar -->
        <SearchFilter v-model:searchQuery="searchQuery" class="mt-10" />

        <!-- Show Cards -->
        <div v-if="filteredDebtors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <template v-if="loading">
                <Skeleton v-for="i in filteredDebtors.length > 0 ? filteredDebtors.length : 6" :key="'skeleton-' + i"
                    class="w-full h-[150px]" />
            </template>

            <template v-else>
                <DebtCard v-for="item in filteredDebtors" :key="item.id" v-bind="item" />
            </template>
        </div>

        <!-- Show if now data to render -->
        <div v-else>
            <NoDebtorsFound />
        </div>
    </div>
</template>