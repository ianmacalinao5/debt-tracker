<script setup lang="ts">
import { computed, ref } from 'vue';
import Button from './ui/button/Button.vue';
import { Plus, LogOut, Smile, KeyRound } from 'lucide-vue-next';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const props = defineProps<{
    handleAddDebtor: () => void
    handleLogout: () => void
    handleChangePassword?: () => void
}>()

const name = ref("John Doe");

const nameInitials = computed(() => {
    return name.value
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
});
</script>

<template>
    <div class="flex items-center justify-between mb-6 gap-5">
        <div class="flex flex-col">
            <div class="flex items-center gap-2">
                <h1 class="text-xl lg:text-2xl font-semibold text-gray-900">
                    Welcome back, {{ name }}
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

            <!-- Avatar + Dropdown -->
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div
                        class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer text-sm font-semibold">
                        {{ nameInitials }}
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent class="w-48 mr-3">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>

                    <DropdownMenuItem @click="props.handleChangePassword && props.handleChangePassword()"
                        class="cursor-pointer">
                        <KeyRound class="w-4 h-4 mr-2" />
                        Change Password
                    </DropdownMenuItem>

                    <DropdownMenuItem @click="props.handleLogout" class="cursor-pointer">
                        <LogOut class="w-4 h-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>
