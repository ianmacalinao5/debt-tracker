<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import { useAddDebtorValidation } from "@/composables/useAddDebtorValidation";
import { toast } from "vue-sonner";
import { useDebtorStore } from "@/stores/debtors";

const debtorStore = useDebtorStore();

const { name, debtAmount, nameMessage, debtAmountMessage, validate } =
    useAddDebtorValidation();

const emit = defineEmits(["close"]);

const isSubmitting = ref(false);

const handleAddNewDebtor = async () => {
    if (!validate() || isSubmitting.value) return;

    try {
        isSubmitting.value = true;

        await debtorStore.createDebtor({
            name: name.value,
            current_balance: Number(debtAmount.value),
        });
        emit("close");
        toast.success("Debtor added successfully!");
    } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to add debtor");
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="handleAddNewDebtor" class="flex flex-col gap-5">
            <!-- Name -->
            <div class="flex flex-col gap-2">
                <Input
                    type="text"
                    v-model="name"
                    placeholder="Debtor Name"
                    :class="{
                        'border-red-500': nameMessage,
                        'focus-visible:ring-red-200': nameMessage,
                    }"
                />

                <transition
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                    leave-active-class="transition-all duration-150"
                >
                    <p v-if="nameMessage" class="text-[12px] ml-2 text-red-500">
                        {{ nameMessage }}
                    </p>
                </transition>
            </div>

            <!-- Amount -->
            <div class="flex flex-col gap-2">
                <Input
                    type="number"
                    v-model="debtAmount"
                    placeholder="Debt Amount"
                    :class="{
                        'border-red-500': debtAmountMessage,
                        'focus-visible:ring-red-200': debtAmountMessage,
                    }"
                    min="1"
                />

                <transition
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    enter-active-class="transition-all duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                    leave-active-class="transition-all duration-150"
                >
                    <p
                        v-if="debtAmountMessage"
                        class="text-[12px] ml-2 text-red-500"
                    >
                        {{ debtAmountMessage }}
                    </p>
                </transition>
            </div>

            <Button class="w-full" :disabled="isSubmitting">
                {{ isSubmitting ? "Creating..." : "Create New Debtor" }}
            </Button>
        </form>
    </div>
</template>
