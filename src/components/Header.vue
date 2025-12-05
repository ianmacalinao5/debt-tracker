<script setup lang="ts">
import { ref } from 'vue';
import Button from './ui/button/Button.vue';
import { Plus, LogOut, Smile } from 'lucide-vue-next';

const props = defineProps<{
    handleAddDebtor: () => void
    handleLogout: () => void
}>()

const username = ref("Ian");

</script>

<template>
    <div class="flex items-center justify-between mb-6">
        <div class="flex flex-col">
            <div class="flex items-center gap-2">
                <h1 class="text-xl lg:text-2xl font-semibold text-gray-900">
                    Welcome back, {{ username }}
                </h1>
                <Smile class="text-yellow-500 w-8 h-8" />
            </div>

            <p class="text-sm text-gray-600">
                Here’s your overview of outstanding debts and recent activity.
            </p>
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