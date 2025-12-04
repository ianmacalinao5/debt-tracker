<script setup lang="ts">
import DebtCard from '@/components/DebtCard.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Plus,
    Search,
    TrendingUp,
    Users,
    DollarSign,
    Filter,
    LogOut
} from 'lucide-vue-next';
import { ref, computed } from 'vue';

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

const searchQuery = ref('');

const totalOutstanding = computed(() => {
    return debtors.value.reduce((sum, debtor) => {
        return sum + parseFloat(debtor.current_balance.replace(',', ''));
    }, 0).toLocaleString();
});

const totalDebtors = computed(() => debtors.value.length);

const filteredDebtors = computed(() => {
    if (!searchQuery.value) return debtors.value;
    return debtors.value.filter(debtor =>
        debtor.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const handleAddDebtor = () => {
    // Add your logic here
    console.log('Add new debtor');
};

const handleLogout = () => {

}
</script>

<template>
    <div class="px-3 py-4 lg:px-5 lg:py-6 w-full max-w-7xl mx-auto">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex flex-col gap-1">
                <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p class="text-sm text-gray-600">Overview of outstanding debts owed to you</p>
            </div>

            <div class="flex items-center gap-2">
                <Button @click="handleAddDebtor" class="hidden sm:flex">
                    <Plus class="w-4 h-4 mr-2" />
                    Add New Debtor
                </Button>

                <Button @click="handleLogout" variant="outline" size="icon">
                    <LogOut class="w-4 h-4" />
                </Button>
            </div>
        </div>

        <Button @click="handleAddDebtor" class="w-full sm:hidden mb-6">
            <Plus class="w-4 h-4 mr-2" />
            Add New Debtor
        </Button>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <!-- Total Outstanding -->
            <div class="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-emerald-700">Total Outstanding</span>
                    <div class="p-2 bg-emerald-200 rounded-lg">
                        <DollarSign class="w-4 h-4 text-emerald-700" />
                    </div>
                </div>
                <p class="text-2xl font-bold text-emerald-900">₱{{ totalOutstanding }}</p>
                <p class="text-xs text-emerald-600 mt-1">Across all debtors</p>
            </div>

            <!-- Total Debtors -->
            <div class="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-blue-700">Active Debtors</span>
                    <div class="p-2 bg-blue-200 rounded-lg">
                        <Users class="w-4 h-4 text-blue-700" />
                    </div>
                </div>
                <p class="text-2xl font-bold text-blue-900">{{ totalDebtors }}</p>
                <p class="text-xs text-blue-600 mt-1">People owing money</p>
            </div>

            <!-- Average Debt -->
            <div class="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-purple-700">Average Debt</span>
                    <div class="p-2 bg-purple-200 rounded-lg">
                        <TrendingUp class="w-4 h-4 text-purple-700" />
                    </div>
                </div>
                <p class="text-2xl font-bold text-purple-900">
                    ₱{{ totalDebtors > 0 ? Math.round(parseFloat(totalOutstanding.replace(',', '')) /
                        totalDebtors).toLocaleString() : 0 }}
                </p>
                <p class="text-xs text-purple-600 mt-1">Per debtor</p>
            </div>
        </div>

        <!-- Search and Filter Bar -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
            <div class="relative flex-1">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input v-model="searchQuery" placeholder="Search debtors by name..." class="pl-10" />
            </div>
            <Button variant="outline" class="w-full sm:w-auto">
                <Filter class="w-4 h-4 mr-2" />
                Filter
            </Button>
        </div>

        <!-- Debtors Grid -->
        <div v-if="filteredDebtors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DebtCard v-for="item in filteredDebtors" :key="item.id" v-bind="item" />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search class="w-8 h-8 text-gray-400" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-1">No debtors found</h3>
            <p class="text-sm text-gray-500">Try adjusting your search query</p>
        </div>
    </div>
</template>