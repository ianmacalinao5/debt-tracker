<script setup lang="ts">
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';
import { useAddDebtorValidation } from '@/composables/useAddDebtorValidation';

const { name, debtAmount, nameMessage, debtAmountMessage, validateMessage, validate } = useAddDebtorValidation();
const emit = defineEmits(["close"]);

const handleAddNewDebtor = () => {
    if (validate()) {
        console.log("Added New Debtor Successfully.")
        emit("close");
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="handleAddNewDebtor" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <Input type="text" v-model="name" placeholder="Debtor Name" :class="{
                    'border-red-500': nameMessage,
                    'focus-visible:ring-red-200': nameMessage
                }" />

                <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                    <p v-if="nameMessage" class="text-[12px] ml-2 text-red-500">
                        {{ nameMessage }}
                    </p>
                </transition>

            </div>

            <div class="flex flex-col gap-2">
                <Input type="number" v-model="debtAmount" placeholder="Debt Amount" :class="{
                    'border-red-500': debtAmountMessage,
                    'focus-visible:ring-red-200': debtAmountMessage
                }" min="1" />

                <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                    <p v-if="debtAmountMessage" class="text-[12px] ml-2 text-red-500">
                        {{ debtAmountMessage }}
                    </p>
                </transition>
            </div>


            <Button class="w-full">Create New Debtor</Button>

            <p v-if="validateMessage" class="text-center text-sm text-red-500 bg-red-50 py-2 px-5 rounded">{{
                validateMessage }}</p>

        </form>
    </div>
</template>