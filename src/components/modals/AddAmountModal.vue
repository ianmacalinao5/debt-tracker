<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';

const remainingBalance = ref(0);
const amountAdd = ref();
</script>

<template>
    <div>
        <form @submit.prevent="" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <p class="text-gray-700">Remaining Balance: {{ remainingBalance }}</p>
                <Input type="number" v-model="amountAdd" placeholder="Amount to add" />
            </div>

            <Button class="w-full">Add Amount</Button>
        </form>
    </div>
</template>