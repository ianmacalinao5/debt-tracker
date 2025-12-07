<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';

const remainingBalance = ref(0);
const amountLess = ref();
</script>

<template>
    <div>
        <form @submit.prevent="" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <p class="text-gray-700">Remaining Balance: {{ remainingBalance }}</p>
                <Input type="number" v-model="amountLess" placeholder="Amount to less" />
            </div>

            <Button class="w-full">Reduce Amount</Button>
        </form>
    </div>
</template>