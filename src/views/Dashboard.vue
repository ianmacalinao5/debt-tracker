<script setup lang="ts">
import DebtCard from '@/components/DebtCard.vue';
import { Button } from '@/components/ui/button';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import {
    Plus,
} from 'lucide-vue-next';
import { ref, onMounted, computed } from 'vue';
import { useDashboard } from '@/composables/useDashboard';
import { useAuthStore } from '@/stores/auth';
import Header from '@/components/Header.vue';
import MetricCard from '@/components/MetricCard.vue';
import SearchFilter from '@/components/SearchFilter.vue';
import NoDebtorsFound from '@/components/NoDebtorsFound.vue';
import debtorList from "@/api/debtors.json"
import { useDashboardModal } from '@/composables/useDashboardModal';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const auth = useAuthStore();
const debtors = ref(debtorList);
const loading = ref(false);
const userLoading = ref(true);

const {
    isDialogOpen,
    selectedDebtorId,
    modalTitle,
    modalDescription,
    modalComponent,
    modalProps,
    openAddDebtorModal,
    openChangePasswordModal,
    openModal,
    closeModal,
} = useDashboardModal();

const {
    totalOutstanding,
    totalDebtors,
    filteredDebtors,
    emptyState,
    searchQuery,
    filter,
    handleUpdateDebtor,
    handleDeleteDebtor,
    handleLogout
} = useDashboard(debtors);

const userName = computed(() => auth.user?.name || 'User');

onMounted(async () => {
    try {
        if (!auth.user) {
            await auth.getUser();
        }
    } catch (error) {
        console.error('Failed to fetch user:', error);
    } finally {
        userLoading.value = false;
    }
});

</script>

<template>
    <div class="px-5 py-6 lg:px-5 lg:py-6 w-full max-w-7xl mx-auto">
        <!-- Header Section -->
        <Header :userName="userName" :userLoading="userLoading" :handleAddDebtor="openAddDebtorModal"
            :handleChangePassword="openChangePasswordModal" :handleLogout="handleLogout"
            @close="isDialogOpen = false" />

        <Button @click="openAddDebtorModal" @close="isDialogOpen = false" class="w-full sm:hidden mb-6 cursor-pointer">
            <Plus class="w-4 h-4 mr-2" />
            Add New Debtor
        </Button>


        <!-- Metric Cards -->
        <MetricCard :totalOutstanding="totalOutstanding" :totalDebtors="totalDebtors" />

        <!-- Search and Filter Bar -->
        <SearchFilter v-model:searchQuery="searchQuery" v-model:filter="filter" class="mt-10" />

        <!-- Show Cards -->
        <div v-if="filteredDebtors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            <template v-if="loading">
                <Skeleton v-for="i in filteredDebtors.length > 0 ? filteredDebtors.length : 6" :key="'skeleton-' + i"
                    class="w-full h-[150px]" />
            </template>

            <template v-else>
                <DebtCard v-for="item in filteredDebtors" :key="item.id" v-bind="item" @action="openModal"
                    @close="isDialogOpen = false" />
            </template>
        </div>

        <!-- Show if now data to render -->
        <div v-else>
            <NoDebtorsFound :state="emptyState" />
        </div>
    </div>

    <!-- MODAL -->
    <Dialog v-model:open="isDialogOpen">
        <DialogContent class="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {{ modalTitle }}
                </DialogTitle>
                <DialogDescription>
                    {{ modalDescription }}
                </DialogDescription>
            </DialogHeader>

            <!-- Dynamic modal body -->
            <component :is="modalComponent" :debtorId="selectedDebtorId" @close="closeModal"
                @confirm="handleDeleteDebtor" @update="handleUpdateDebtor" v-bind="modalProps" />
        </DialogContent>
    </Dialog>

</template>