<script setup lang="ts">
import Button from './ui/button/Button.vue';
import { Plus, LogOut } from 'lucide-vue-next';

const props = defineProps<{
    handleAddDebtor: () => void
    handleLogout: () => void
}>()
</script>

<template>
    <div class="flex items-center justify-between mb-6">
        <div class="flex flex-col">
            <h1 class="text-xl lg:text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p class="text-sm text-gray-600">Overview of outstanding debts owed to you</p>
        </div>

        <div class="flex items-center gap-2">
            <Button @click="props.handleAddDebtor" class="hidden sm:flex">
                <Plus class="w-4 h-4 mr-2" />
                Add New Debtor
            </Button>

            <Button @click="props.handleLogout" variant="outline" size="icon">
                <LogOut class="w-4 h-4" />
            </Button>
        </div>
    </div>
</template>