<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import { useLessAmountValidation } from "@/composables/useLessAmountValidation";
import { toast } from "vue-sonner";
import { useDebtorStore } from "@/stores/debtors";

const debtorStore = useDebtorStore();

const { amountLess, amountLessMessage, validate } = useLessAmountValidation();

const emit = defineEmits(["close"]);
const props = defineProps<{
    debtorId: number;
}>();

const isSubmitting = ref(false);

const remainingBalance = computed(() => {
    const debtor = debtorStore.debtors.find((d) => d.id === props.debtorId);
    return debtor ? debtor.current_balance : 0;
});

const handleLessAmount = async () => {
    if (!validate() || isSubmitting.value) return;

    try {
        isSubmitting.value = true;

        await debtorStore.payAmount(props.debtorId, Number(amountLess.value));

        toast.success("Amount reduced successfully!");
        emit("close");
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || "Failed to reduce amount"
        );
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="handleLessAmount" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <p class="text-gray-700">
                    Remaining Balance:
                    {{
                        Number(remainingBalance).toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                    }}
                </p>

                <Input
                    type="number"
                    v-model="amountLess"
                    placeholder="Amount to reduce"
                    :class="{
                        'border-red-500': amountLessMessage,
                        'focus-visible:ring-red-200': amountLessMessage,
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
                        v-if="amountLessMessage"
                        class="text-[12px] ml-2 text-red-500"
                    >
                        {{ amountLessMessage }}
                    </p>
                </transition>
            </div>

            <Button class="w-full" :disabled="isSubmitting">
                {{ isSubmitting ? "Reducing..." : "Reduce Amount" }}
            </Button>
        </form>
    </div>
</template>
