<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { CircleDollarSign } from 'lucide-vue-next';
import { useLoginValidation } from '@/composables/useLoginValidation';

const { username, password, remember, usernameMessage, passwordMessage, validateMessage, validate } = useLoginValidation();

const router = useRouter();

const handleLogin = () => {
    if (validate()) {
        console.log('Login successful with:', username.value);
        router.push('/dashboard');
    } else {
        console.log('Validation failed. Errors displayed.');
    }
};

</script>

<template class="w-full">
    <div class="w-full px-3 py-3 flex flex-col gap-5 mx-auto my-auto max-w-[400px] mt-10 lg:mt-20">
        <div class="flex gap-2 items-center justify-center mb-5">
            <h1 class="text-xl font-medium">Debt Tracker</h1>
            <CircleDollarSign class="text-emerald-500" />
        </div>
        <h2 class="text-lg font-medium">Login</h2>

        <div class="flex flex-col gap-2">
            <Input type="text" placeholder="Username" v-model="username" :class="{
                'border-red-500': usernameMessage,
                'focus-visible:ring-red-200': usernameMessage
            }" />
            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="usernameMessage" class="text-[12px] ml-2 text-red-500">
                    {{ usernameMessage }}
                </p>
            </transition>

        </div>

        <div class="flex flex-col gap-2">
            <Input type="password" placeholder="Password" v-model="password" :class="{
                'border-red-500': passwordMessage,
                'focus-visible:ring-red-200': passwordMessage
            }" />
            <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                <p v-if="passwordMessage" class="text-[12px] ml-2 text-red-500 transition-opacity duration-150">{{
                    passwordMessage }}
                </p>
            </transition>
        </div>

        <div class="flex text-sm items-center gap-2">
            <Checkbox v-model="remember" id="remember" />
            <label for="remember">Remember Me</label>
        </div>

        <Button @click="handleLogin">Login</Button>

        <p v-if="validateMessage" class="text-center text-sm text-red-500 bg-red-50 py-2 px-5 rounded">{{
            validateMessage }}</p>

    </div>

</template>