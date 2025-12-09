<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';
import { useLessAmountValidation } from '@/composables/useLessAmountValidation';
import { toast } from 'vue-sonner';

const {
    amountLess,
    amountLessMessage,
    validate
} = useLessAmountValidation();

const emit = defineEmits(["close"]);
const remainingBalance = ref(0);

const handleLessAmount = () => {
    if (validate()) {
        toast.success("Amount Lessed successfully!");
        emit("close");
    }
};
</script>


<template>
    <div>
        <form @submit.prevent="handleLessAmount" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <p class="text-gray-700">Remaining Balance: {{ remainingBalance }}</p>

                <Input type="number" v-model="amountLess" placeholder="Amount to less" :class="{
                    'border-red-500': amountLessMessage,
                    'focus-visible:ring-red-200': amountLessMessage
                }" min="1" />

                <transition enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150" leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150">
                    <p v-if="amountLessMessage" class="text-[12px] ml-2 text-red-500">
                        {{ amountLessMessage }}
                    </p>
                </transition>
            </div>

            <Button class="w-full">Reduce Amount</Button>
        </form>
    </div>
</template>
