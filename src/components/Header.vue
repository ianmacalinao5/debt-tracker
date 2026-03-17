<script setup lang="ts">
import { computed } from "vue";
import Button from "./ui/button/Button.vue";
import { Plus, LogOut, KeyRound } from "lucide-vue-next";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Skeleton from "./ui/skeleton/Skeleton.vue";

const props = defineProps<{
    userName?: string;
    isLoading: boolean;
    handleAddDebtor: () => void;
    handleLogout: () => void;
    handleChangePassword?: () => void;
}>();

const isLoading = computed(() => props.isLoading);

const nameInitials = computed(() => {
    if (!props.userName) return "";
    return props.userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
});
</script>

<template>
    <div class="flex items-center justify-between mb-6 gap-5">
        <!-- Left -->
        <div v-if="isLoading" class="flex flex-col gap-2">
            <Skeleton class="w-40 h-6" />
            <Skeleton class="w-60 h-4" />
        </div>

        <div v-else class="flex flex-col">
            <h1 class="text-xl lg:text-2xl font-semibold text-gray-900">
                Welcome back, {{ userName }}
            </h1>
            <p class="text-sm text-gray-600 mt-1">
                Here's your overview of outstanding debts and recent activity.
            </p>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-2">
            <Button @click="props.handleAddDebtor" class="hidden sm:flex">
                <Plus class="w-4 h-4 mr-2" />
                Add New Debtor
            </Button>

            <!-- Avatar + Dropdown -->
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div v-if="isLoading">
                        <Skeleton class="w-10 h-10 rounded-full" />
                    </div>

                    <div
                        v-else
                        class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer text-sm font-semibold"
                    >
                        {{ nameInitials }}
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent class="w-48 mr-3">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>

                    <DropdownMenuItem
                        v-if="props.handleChangePassword"
                        @click="props.handleChangePassword()"
                        class="cursor-pointer"
                    >
                        <KeyRound class="w-4 h-4 mr-2" />
                        Change Password
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        @click="props.handleLogout"
                        class="cursor-pointer"
                    >
                        <LogOut class="w-4 h-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>
