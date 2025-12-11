<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth';
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import { CircleDollarSign, Eye, EyeOff, Loader2 } from "lucide-vue-next";
import { useRegisterValidation } from "@/composables/useRegisterValidation";
import { toast } from "vue-sonner";

const auth = useAuthStore();
const router = useRouter();
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const {
    name,
    email,
    password,
    confirmPassword,
    nameMessage,
    emailMessage,
    passwordMessage,
    confirmMessage,
    validate,
} = useRegisterValidation();

const handleRegister = async () => {
    const isValid = validate();
    if (!isValid) return;

    isLoading.value = true;

    try {
        await auth.register(name.value, email.value, password.value, confirmPassword.value);
        toast.success("Registration successful!");
        router.push("/dashboard");
    } catch (err: any) {
        toast.error(err.response?.data?.message || "Registration failed");
    } finally {
        isLoading.value = false;
    }
};

const goToLogin = () => {
    router.push("/");
};
</script>

<template class="w-full">
    <div class="w-full px-5 py-3 flex flex-col gap-5 mx-auto max-w-[400px] mt-10 lg:mt-20">

        <!-- Logo -->
        <div class="flex gap-2 items-center justify-center mb-5">
            <h1 class="text-xl font-medium">Debt Tracker</h1>
            <CircleDollarSign class="text-emerald-500" />
        </div>

        <h2 class="text-lg font-medium">Register</h2>

        <!-- Name -->
        <div class="flex flex-col gap-2">
            <Input type="text" placeholder="Full Name" v-model="name" :disabled="isLoading" :class="{
                'border-red-500': nameMessage,
                'focus-visible:ring-red-200': nameMessage,
            }" />
            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="nameMessage" class="text-[12px] ml-2 text-red-500">
                    {{ nameMessage }}
                </p>
            </transition>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
            <Input type="email" placeholder="Email" v-model="email" :disabled="isLoading" :class="{
                'border-red-500': emailMessage,
                'focus-visible:ring-red-200': emailMessage,
            }" />
            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="emailMessage" class="text-[12px] ml-2 text-red-500">
                    {{ emailMessage }}
                </p>
            </transition>
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-2">
            <div class="relative">
                <Input :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="password"
                    :disabled="isLoading" class="pr-10" :class="{
                        'border-red-500': passwordMessage,
                        'focus-visible:ring-red-200': passwordMessage,
                    }" />
                <button type="button" @click="showPassword = !showPassword" :disabled="isLoading"
                    class="cursor-pointer absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                    <EyeOff v-if="showPassword" class="w-5 h-5" />
                    <Eye v-else class="w-5 h-5" />
                </button>
            </div>
            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="passwordMessage" class="text-[12px] ml-2 text-red-500">
                    {{ passwordMessage }}
                </p>
            </transition>
        </div>

        <!-- Confirm Password -->
        <div class="flex flex-col gap-2">
            <div class="relative">
                <Input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm Password"
                    v-model="confirmPassword" :disabled="isLoading" class="pr-10" :class="{
                        'border-red-500': confirmMessage,
                        'focus-visible:ring-red-200': confirmMessage,
                    }" />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword" :disabled="isLoading"
                    class="cursor-pointer absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                    <EyeOff v-if="showConfirmPassword" class="w-5 h-5" />
                    <Eye v-else class="w-5 h-5" />
                </button>
            </div>
            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="confirmMessage" class="text-[12px] ml-2 text-red-500">
                    {{ confirmMessage }}
                </p>
            </transition>
        </div>

        <!-- Register Button -->
        <Button type="button" @click.prevent="handleRegister" :disabled="isLoading" class="relative">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isLoading ? 'Registering...' : 'Register' }}
        </Button>

        <div class="text-center text-sm mt-2">
            <button
                class="underline text-gray-600 hover:text-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                @click="goToLogin" :disabled="isLoading">
                Already have an account? Login
            </button>
        </div>
    </div>
</template>