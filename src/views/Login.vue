<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { CircleDollarSign, Eye, EyeOff, Loader2 } from 'lucide-vue-next';
import { useLoginValidation } from '@/composables/useLoginValidation';
import { toast } from 'vue-sonner';

const auth = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const isLoading = ref(false);

const {
    email,
    password,
    remember,
    emailMessage,
    passwordMessage,
    validateMessage,
    validate
} = useLoginValidation();

const handleLogin = async () => {
    const isValid = validate();
    if (!isValid) {
        if (validateMessage.value) toast.error(validateMessage.value);
        return;
    }

    isLoading.value = true;

    try {
        await auth.login(email.value, password.value, remember.value);
        toast.success("Login successful!");
        router.push("/dashboard");
    } catch (err: any) {
        toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
        isLoading.value = false;
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
            <Input 
                type="email" 
                placeholder="Email" 
                v-model="email" 
                :disabled="isLoading"
                :class="{
                    'border-red-500': emailMessage,
                    'focus-visible:ring-red-200': emailMessage
                }" 
            />

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
                <Input 
                    :type="showPassword ? 'text' : 'password'" 
                    placeholder="Password" 
                    v-model="password"
                    :disabled="isLoading"
                    class="pr-10" 
                    :class="{
                        'border-red-500': passwordMessage,
                        'focus-visible:ring-red-200': passwordMessage
                    }" 
                />

                <button 
                    type="button" 
                    @click="showPassword = !showPassword"
                    :disabled="isLoading"
                    class="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
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

        <!-- Remember Me -->
        <div class="flex text-sm items-center gap-2">
            <Checkbox v-model="remember" id="remember" :disabled="isLoading" />
            <label for="remember" :class="{ 'opacity-50': isLoading }">Remember Me</label>
        </div>

        <!-- Login Button -->
        <Button @click="handleLogin" :disabled="isLoading" class="relative">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isLoading ? 'Logging in...' : 'Login' }}
        </Button>

        <div class="text-center text-sm mt-2">
            <button 
                class="underline text-gray-600 hover:text-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                @click="goToRegister"
                :disabled="isLoading"
            >
                Dont have an account? Register
            </button>
        </div>
    </div>
</template>