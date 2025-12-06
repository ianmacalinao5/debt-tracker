<script setup lang="ts">
import DebtCard from '@/components/DebtCard.vue';
import { Button } from '@/components/ui/button';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import {
    Plus,
} from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { useDashboard } from '@/composables/useDashboard';
import Header from '@/components/Header.vue';
import MetricCard from '@/components/MetricCard.vue';
import SearchFilter from '@/components/SearchFilter.vue';
import NoDebtorsFound from '@/components/NoDebtorsFound.vue';
import type { Debtor, ActionType } from '@/types';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

// Example modal bodies:
import AddAmountModal from '@/components/modals/AddAmountModal.vue';
import ReduceAmountModal from '@/components/modals/ReduceAmountModal.vue';
import EditDebtorModal from '@/components/modals/EditDebtorModal.vue';
import DeleteDebtorModal from '@/components/modals/DeleteDebtorModal.vue';
import ViewTransactionsModal from '@/components/modals/ViewTransactionsModal.vue';

const modalTitle = computed(() => {
    switch (currentAction.value) {
        case "add": return "Add Amount";
        case "less": return "Record Payment";
        case "edit": return "Edit Debtor";
        case "delete": return "Delete Debtor";
        case "view": return "Debtor Transactions";
        default: return "";
    }
});

const modalDescription = computed(() => {
    switch (currentAction.value) {
        case "add": return "Increase the total amount owed.";
        case "less": return "Record a payment made by the debtor.";
        case "edit": return "Modify debtor information.";
        case "delete": return "This action cannot be undone.";
        case "view": return "View all transaction records for this debtor.";
        default: return "";
    }
});

const modalComponent = computed(() => {
    switch (currentAction.value) {
        case "add": return AddAmountModal;
        case "less": return ReduceAmountModal;
        case "edit": return EditDebtorModal;
        case "delete": return DeleteDebtorModal;
        case "view": return ViewTransactionsModal;
        default: return null;
    }
});


const debtors = ref([
    {
        id: 1,
        name: "John Doe",
        current_balance: "5,000",
        status: "ouststanding",
        created_at: "12/04/2025 2:58 PM",
        last_updated: "12/05/2025 1:00 PM"
    },
    {
        id: 2,
        name: "Jane Smith",
        current_balance: "3,500",
        status: "outstanding",
        created_at: "12/04/2025 2:58 PM",
        last_updated: "12/05/2025 1:00 PM"
    },
    {
        id: 3,
        name: "Bob Johnson",
        current_balance: "7,200",
        status: "outstanding",
        created_at: "12/04/2025 2:58 PM",
        last_updated: "12/05/2025 1:00 PM"
    }
]);
const isDialogOpen = ref(false);
const currentAction = ref<string | null>(null);
const selectedDebtorId = ref<number | null>(null);

const openModal = (payload: { action: ActionType; debtor: Debtor }) => {
    const { action, debtor } = payload;
    console.log("Selected action:", action);
    console.log("Debtor:", debtor);

    currentAction.value = action;
    selectedDebtorId.value = debtor.id;
    isDialogOpen.value = true;
};

const closeModal = () => {
    isDialogOpen.value = false;
    currentAction.value = null;
    selectedDebtorId.value = null;
};


const loading = ref(false);
const {
    totalOutstanding,
    totalDebtors,
    filteredDebtors,
    searchQuery,
    filter,
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
        <SearchFilter v-model:searchQuery="searchQuery" v-model:filter="filter" class="mt-10" />

        <!-- Show Cards -->
        <div v-if="filteredDebtors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <template v-if="loading">
                <Skeleton v-for="i in filteredDebtors.length > 0 ? filteredDebtors.length : 6" :key="'skeleton-' + i"
                    class="w-full h-[150px]" />
            </template>

            <template v-else>
                <DebtCard v-for="item in filteredDebtors" :key="item.id" v-bind="item" @action="openModal" />
            </template>
        </div>

        <!-- Show if now data to render -->
        <div v-else>
            <NoDebtorsFound />
        </div>
    </div>

    <!-- MODAL -->
    <Dialog v-model:open="isDialogOpen">
        <DialogContent class="max-w-md">
            <DialogHeader>
                <DialogTitle>
                    {{ modalTitle }}
                </DialogTitle>
                <DialogDescription>
                    {{ modalDescription }}
                </DialogDescription>
            </DialogHeader>

            <!-- Dynamic modal body -->
            <component :is="modalComponent" :debtorId="selectedDebtorId" @close="closeModal" />

            <DialogFooter>
                <Button variant="outline" @click="closeModal">Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

</template>