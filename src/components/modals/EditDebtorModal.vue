<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';

const name = ref('');
const debtAmount = ref();
</script>

<template>
    <div>
        <form @submit.prevent="" class="flex flex-col gap-5">
            <Input type="text" v-model="name" placeholder="Debtor Name" />
            <Input type="number" v-model="debtAmount" placeholder="Debt Amount" />

            <Button class="w-full">Update Debtor</Button>
        </form>
    </div>
</template>