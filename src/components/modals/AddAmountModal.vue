<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';
import { useAddAmountValidation } from '@/composables/useAddAmountValidation';
import { toast } from 'vue-sonner';

const {
    amountAdd,
    amountAddMessage,
    validate
} = useAddAmountValidation();

const emit = defineEmits(["close"]);
const remainingBalance = ref(0);

const handleAddAmount = () => {
    if (validate()) {
        toast.success("Amount added successfully!");
        emit("close");
    }
};
</script>


<template>
    <div>
        <form @submit.prevent="handleAddAmount" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <p class="text-gray-700">Remaining Balance: {{ remainingBalance }}</p>

                <Input type="number" v-model="amountAdd" placeholder="Amount to add" :class="{
                    'border-red-500': amountAddMessage,
                    'focus-visible:ring-red-200': amountAddMessage
                }" min="1" />

                <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                    <p v-if="amountAddMessage" class="text-[12px] ml-2 text-red-500">
                        {{ amountAddMessage }}
                    </p>
                </transition>
            </div>

            <Button class="w-full">Add Amount</Button>
        </form>
    </div>
</template>
