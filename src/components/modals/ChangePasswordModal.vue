<script setup lang="ts">
import { ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import { toast } from "vue-sonner";
import { useAuthStore } from "@/stores/auth";
import { useChangePasswordValidation } from "@/composables/useChangePasswordValidation";

const authStore = useAuthStore();

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

const isSubmitting = ref(false);

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const handleChangePassword = async () => {
    if (!validate() || isSubmitting.value) return;

    try {
        isSubmitting.value = true;

        await authStore.changePassword({
            current_password: currentPassword.value,
            new_password: newPassword.value,
            new_password_confirmation: confirmPassword.value,
        });

        toast.success("Password changed successfully!");
        emit("close");
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || "Failed to change password"
        );
    } finally {
        isSubmitting.value = false;
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
                <div class="relative">
                    <Input
                        :type="showCurrentPassword ? 'text' : 'password'"
                        v-model="currentPassword"
                        placeholder="Current Password"
                        :class="{
                            'border-red-500': currentPasswordMessage,
                            'focus-visible:ring-red-200':
                                currentPasswordMessage,
                        }"
                    />

                    <button
                        type="button"
                        @click="showCurrentPassword = !showCurrentPassword"
                        class="cursor-pointer absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                    >
                        <EyeOff v-if="showCurrentPassword" class="w-5 h-5" />
                        <Eye v-else class="w-5 h-5" />
                    </button>
                </div>

                <transition>
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
                <div class="relative">
                    <Input
                        :type="showNewPassword ? 'text' : 'password'"
                        v-model="newPassword"
                        placeholder="New Password"
                        :class="{
                            'border-red-500': newPasswordMessage,
                            'focus-visible:ring-red-200': newPasswordMessage,
                        }"
                    />

                    <button
                        type="button"
                        @click="showNewPassword = !showNewPassword"
                        class="cursor-pointer absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                    >
                        <EyeOff v-if="showNewPassword" class="w-5 h-5" />
                        <Eye v-else class="w-5 h-5" />
                    </button>
                </div>

                <transition>
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
                <div class="relative">
                    <Input
                        :type="showConfirmPassword ? 'text' : 'password'"
                        v-model="confirmPassword"
                        placeholder="Confirm New Password"
                        :class="{
                            'border-red-500': confirmPasswordMessage,
                            'focus-visible:ring-red-200':
                                confirmPasswordMessage,
                        }"
                    />

                    <button
                        type="button"
                        @click="showConfirmPassword = !showConfirmPassword"
                        class="cursor-pointer absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                    >
                        <EyeOff v-if="showConfirmPassword" class="w-5 h-5" />
                        <Eye v-else class="w-5 h-5" />
                    </button>
                </div>

                <transition>
                    <p
                        v-if="confirmPasswordMessage"
                        class="text-[12px] ml-2 text-red-500"
                    >
                        {{ confirmPasswordMessage }}
                    </p>
                </transition>
            </div>

            <Button class="w-full" :disabled="isSubmitting">
                {{ isSubmitting ? "Updating..." : "Change Password" }}
            </Button>
        </form>
    </div>
</template>
