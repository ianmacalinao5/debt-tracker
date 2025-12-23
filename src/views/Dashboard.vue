<script setup lang="ts">
import DebtCard from "@/components/DebtCard.vue";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import { Plus } from "lucide-vue-next";
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import Header from "@/components/Header.vue";
import MetricCard from "@/components/MetricCard.vue";
import SearchFilter from "@/components/SearchFilter.vue";
import NoDebtorsFound from "@/components/NoDebtorsFound.vue";

import { useDashboardModal } from "@/composables/useDashboardModal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useAuthStore } from "@/stores/auth";
import { useDebtorStore } from "@/stores/debtors";

const auth = useAuthStore();
const debtorStore = useDebtorStore();

const {
    loading,
    filteredDebtors,
    totalOutstanding,
    totalDebtors,
    emptyState,
    searchQuery,
    filter,
} = storeToRefs(debtorStore);

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

const userName = computed(() => auth.user?.name || "User");
const router = useRouter();

const selectedDebtorName = computed(() => {
    return (
        debtorStore.debtors.find((d) => d.id === selectedDebtorId.value)
            ?.name || ""
    );
});

const handleLogout = async () => {
    await auth.logout();
    router.push("/");
    toast.success("Logged out successfully!");
};

onMounted(async () => {
    if (!auth.user) {
        await auth.getUser();
    }

    await debtorStore.loadDebtors();
});
</script>

<template>
    <div class="px-5 py-6 lg:px-5 lg:py-6 w-full max-w-7xl mx-auto">
        <!-- Header -->
        <Header
            :userName="userName"
            :handleAddDebtor="openAddDebtorModal"
            :handleChangePassword="openChangePasswordModal"
            :handleLogout="handleLogout"
        />

        <Button
            @click="openAddDebtorModal"
            class="w-full sm:hidden mb-6 cursor-pointer"
        >
            <Plus class="w-4 h-4 mr-2" />
            Add New Debtor
        </Button>

        <!-- Metrics -->
        <MetricCard
            :totalOutstanding="totalOutstanding"
            :totalDebtors="totalDebtors"
            :loading="debtorStore.loading"
        />

        <!-- Search / Filter -->
        <SearchFilter
            v-model:searchQuery="searchQuery"
            v-model:filter="filter"
            class="mt-10"
        />

        <!-- Loading -->
        <div
            v-if="loading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
            <Skeleton v-for="i in 6" :key="i" class="w-full h-[150px]" />
        </div>

        <!-- Cards -->
        <div
            v-else-if="filteredDebtors.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
            <DebtCard
                v-for="debtor in filteredDebtors"
                :key="debtor.id"
                v-bind="debtor"
                @action="openModal"
            />
        </div>

        <!-- Empty -->
        <div v-else>
            <NoDebtorsFound :state="emptyState" />
        </div>
    </div>

    <!-- MODAL -->
    <Dialog v-model:open="isDialogOpen">
        <DialogContent class="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{{ modalTitle }}</DialogTitle>
                <DialogDescription>
                    {{ modalDescription }}
                </DialogDescription>
            </DialogHeader>

            <component
                :is="modalComponent"
                :debtorId="selectedDebtorId"
                :debtorName="selectedDebtorName"
                v-bind="modalProps"
                @close="closeModal"
                @confirm="debtorStore.deleteDebtor"
                @update="
                    (data: { id: number; name: string; current_balance: number; }) =>
                        debtorStore.updateDebtor(data.id, {
                            name: data.name,
                            current_balance: data.current_balance,
                        })
                "
            />
        </DialogContent>
    </Dialog>
</template>
