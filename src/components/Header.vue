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

const props = defineProps<{
    userName: string;
    handleAddDebtor: () => void;
    handleLogout: () => void;
    handleChangePassword?: () => void;
}>();

const nameInitials = computed(() => {
    if (!props.userName) return "U";

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
        <div class="flex flex-col">
            <div class="flex items-center gap-3 flex-wrap">
                <h1 class="text-xl lg:text-2xl font-semibold text-gray-900">
                    Welcome back, {{ userName }}
                </h1>

                <!-- <Smile class="text-yellow-500 w-8 h-8" /> -->
            </div>

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
                    <div
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
