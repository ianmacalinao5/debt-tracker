<script setup lang="ts">
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import { toast } from "vue-sonner";

import { useChangePasswordValidation } from "@/composables/useChangePasswordValidation";

const {
    currentPassword,
    newPassword,
    confirmPassword,
    currentPasswordMessage,
    newPasswordMessage,
    confirmPasswordMessage,
    validate,
} = useChangePasswordValidation();

const emit = defineEmits(["close"]);

const handleChangePassword = () => {
    if (validate()) {
        toast.success("Password changed successfully!");
        emit("close");
    }
};
</script>

<template>
    <div>
        <form
            @submit.prevent="handleChangePassword"
            class="flex flex-col gap-5"
        >
            <!-- Current Password -->
            <div class="flex flex-col gap-2">
                <Input
                    type="password"
                    v-model="currentPassword"
                    placeholder="Current Password"
                    :class="{
                        'border-red-500': currentPasswordMessage,
                        'focus-visible:ring-red-200': currentPasswordMessage,
                    }"
                />

                <transition
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                    leave-active-class="transition-all duration-150"
                >
                    <p
                        v-if="currentPasswordMessage"
                        class="text-[12px] ml-2 text-red-500"
                    >
                        {{ currentPasswordMessage }}
                    </p>
                </transition>
            </div>

            <!-- New Password -->
            <div class="flex flex-col gap-2">
                <Input
                    type="password"
                    v-model="newPassword"
                    placeholder="New Password"
                    :class="{
                        'border-red-500': newPasswordMessage,
                        'focus-visible:ring-red-200': newPasswordMessage,
                    }"
                />

                <transition
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                    leave-active-class="transition-all duration-150"
                >
                    <p
                        v-if="newPasswordMessage"
                        class="text-[12px] ml-2 text-red-500"
                    >
                        {{ newPasswordMessage }}
                    </p>
                </transition>
            </div>

            <!-- Confirm Password -->
            <div class="flex flex-col gap-2">
                <Input
                    type="password"
                    v-model="confirmPassword"
                    placeholder="Confirm New Password"
                    :class="{
                        'border-red-500': confirmPasswordMessage,
                        'focus-visible:ring-red-200': confirmPasswordMessage,
                    }"
                />

                <transition
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                    leave-active-class="transition-all duration-150"
                >
                    <p
                        v-if="confirmPasswordMessage"
                        class="text-[12px] ml-2 text-red-500"
                    >
                        {{ confirmPasswordMessage }}
                    </p>
                </transition>
            </div>

            <Button class="w-full">Change Password</Button>
        </form>
    </div>
</template>
