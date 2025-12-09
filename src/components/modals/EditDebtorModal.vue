<script setup lang="ts">
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';
import { useEditDebtorValidation } from '@/composables/useEditDebtorValidation';
import { toast } from 'vue-sonner';
import { watch } from 'vue';

const props = defineProps<{
    debtorId: number,
    debtorName: string,
    debtorAmount: number
}>()

const emit = defineEmits<{
    (e: "close"): void
    (e: "update", data: { id: number, name: string, debtAmount: number }): void
}>()

const {
    name,
    debtAmount,
    nameMessage,
    debtAmountMessage,
    validate
} = useEditDebtorValidation();

// 👇 FIX: reactively sync props to inputs
watch(
    () => props.debtorId,
    () => {
        name.value = props.debtorName;
        debtAmount.value = props.debtorAmount;
    },
    { immediate: true }
);

const handleEditDebtor = () => {
    if (validate()) {
        emit("update", {
            id: props.debtorId,
            name: name.value,
            debtAmount: debtAmount.value
        });

        toast.success("Debtor updated successfully!");
        emit("close");
    }
};
</script>

<template>
    <form @submit.prevent="handleEditDebtor" class="flex flex-col gap-5">

        <!-- Name -->
        <div class="flex flex-col gap-2">
            <Input type="text" v-model="name" placeholder="Debtor Name" :class="{
                'border-red-500': nameMessage,
                'focus-visible:ring-red-200': nameMessage
            }" />

            <p v-if="nameMessage" class="text-[12px] ml-2 text-red-500">
                {{ nameMessage }}
            </p>
        </div>

        <!-- Amount -->
        <div class="flex flex-col gap-2">
            <Input type="number" v-model="debtAmount" placeholder="Debt Amount" :class="{
                'border-red-500': debtAmountMessage,
                'focus-visible:ring-red-200': debtAmountMessage
            }" min="1" />

            <p v-if="debtAmountMessage" class="text-[12px] ml-2 text-red-500">
                {{ debtAmountMessage }}
            </p>
        </div>

        <Button class="w-full">Update Debtor</Button>
    </form>
</template>
