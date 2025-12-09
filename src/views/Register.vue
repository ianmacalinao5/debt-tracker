<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import { CircleDollarSign } from "lucide-vue-next";
import { useRegisterValidation } from "@/composables/useRegisterValidation";
import { toast } from "vue-sonner";

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

const router = useRouter();

const handleRegister = () => {
    if (validate()) {
        toast.success("Registration successful!");
        router.push("/dashboard");
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
            <Input type="text" placeholder="Full Name" v-model="name" :class="{
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
            <Input type="email" placeholder="Email" v-model="email" :class="{
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

        <div class="flex flex-col gap-2">
            <Input type="password" placeholder="Password" v-model="password" :class="{
                'border-red-500': passwordMessage,
                'focus-visible:ring-red-200': passwordMessage,
            }" />
            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="passwordMessage" class="text-[12px] ml-2 text-red-500">
                    {{ passwordMessage }}
                </p>
            </transition>
        </div>

        <div class="flex flex-col gap-2">
            <Input type="password" placeholder="Confirm Password" v-model="confirmPassword" :class="{
                'border-red-500': confirmMessage,
                'focus-visible:ring-red-200': confirmMessage,
            }" />
            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="confirmMessage" class="text-[12px] ml-2 text-red-500">
                    {{ confirmMessage }}
                </p>
            </transition>
        </div>

        <Button @click="handleRegister">Register</Button>

        <div class="text-center text-sm mt-2">
            <button class="underline text-gray-600 hover:text-gray-800 cursor-pointer" @click="goToLogin">
                Already have an account? Login
            </button>
        </div>
    </div>
</template>
