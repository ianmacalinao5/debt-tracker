<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { CircleDollarSign } from 'lucide-vue-next';
import { useLoginValidation } from '@/composables/useLoginValidation';
import { toast } from 'vue-sonner';

const {
    email,
    password,
    remember,
    emailMessage,
    passwordMessage,
    validateMessage,
    validate
} = useLoginValidation();

const router = useRouter();

const handleLogin = () => {
    const isValid = validate();

    if (isValid) {
        toast.success("Login successful!");
        router.push("/dashboard");
        return;
    }

    if (validateMessage.value) {
        toast.error(validateMessage.value);
    }
};

const goToRegister = () => {
    router.push("/register");
};
</script>

<template class="w-full">
    <div class="w-full px-5 py-3 flex flex-col gap-5 mx-auto my-auto max-w-[400px] mt-10 lg:mt-20">
        <div class="flex gap-2 items-center justify-center mb-5">
            <h1 class="text-xl font-medium">Debt Tracker</h1>
            <CircleDollarSign class="text-emerald-500" />
        </div>

        <h2 class="text-lg font-medium">Login</h2>

        <!-- Email -->
        <div class="flex flex-col gap-2">
            <Input type="email" placeholder="Email" v-model="email" :class="{
                'border-red-500': emailMessage,
                'focus-visible:ring-red-200': emailMessage
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
            <Input type="password" placeholder="Password" v-model="password" :class="{
                'border-red-500': passwordMessage,
                'focus-visible:ring-red-200': passwordMessage
            }" />

            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="passwordMessage" class="text-[12px] ml-2 text-red-500">
                    {{ passwordMessage }}
                </p>
            </transition>
        </div>

        <!-- Remember Me -->
        <div class="flex text-sm items-center gap-2">
            <Checkbox v-model="remember" id="remember" />
            <label for="remember">Remember Me</label>
        </div>

        <!-- Login Button -->
        <Button @click="handleLogin">Login</Button>

        <div class="text-center text-sm mt-2">
            <button class="underline text-gray-600 hover:text-gray-800 cursor-pointer" @click="goToRegister">
                Dont have an account? Register
            </button>
        </div>
    </div>
</template>
