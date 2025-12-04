<script setup lang="ts">
import { computed } from 'vue'
import {
    TrendingUp,
    Users,
    DollarSign,
} from 'lucide-vue-next';

const props = defineProps<{
    totalOutstanding: number | string,
    totalDebtors: number | string
}>()

const averagePerDebtor = computed(() => {
    const cleanTotalOutstanding = String(props.totalOutstanding)
        .replace(/[₱, ]/g, '');
    const total = Number(cleanTotalOutstanding)
    const count = Number(props.totalDebtors ?? 0)

    if (count <= 0) return '0'
    if (isNaN(total)) return '0'

    return Math.round(total / count).toLocaleString()
})
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <!-- Total Outstanding -->
        <div class="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-emerald-700">Total Outstanding</span>
                <div class="p-2 bg-emerald-200 rounded-lg">
                    <DollarSign class="w-4 h-4 text-emerald-700" />
                </div>
            </div>
            <p class="text-2xl font-bold text-emerald-900">₱{{ props.totalOutstanding.toLocaleString() }}</p>
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
            <p class="text-2xl font-bold text-blue-900">{{ props.totalDebtors }}</p>
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
                ₱{{ averagePerDebtor }}
            </p>

            <p class="text-xs text-purple-600 mt-1">Per debtor</p>
        </div>
    </div>
</template>
