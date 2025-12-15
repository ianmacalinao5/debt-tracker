<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-vue-next";
import * as htmlToImage from "html-to-image";
import { storeToRefs } from "pinia";
import { useDebtorStore } from "@/stores/debtors";

const props = defineProps<{
    debtorId: number;
    debtorName: string;
}>();

const debtorStore = useDebtorStore();
const { transactions, transactionsLoading } = storeToRefs(debtorStore);
const exporting = ref(false);
const receiptRef = ref<HTMLElement | null>(null);

onMounted(() => {
    debtorStore.loadTransactions(props.debtorId);
});

const currentBalance = computed(() => {
    const debtor = debtorStore.debtors.find((d) => d.id === props.debtorId);
    return debtor ? debtor.current_balance : 0;
});

const formattedTransactions = computed(() =>
    transactions.value.map((t) => ({
        ...t,
        sign: t.type === "add" ? "+" : "−",
        color: t.type === "add" ? "text-red-700" : "text-green-700",
        label: t.type === "add" ? "Added Debt" : "Payment",
    }))
);

async function downloadAsImage() {
    if (!receiptRef.value) return;

    exporting.value = true;
    await nextTick();

    const dataUrl = await htmlToImage.toPng(receiptRef.value, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
    });

    exporting.value = false;

    const link = document.createElement("a");
    link.download = "receipt.png";
    link.href = dataUrl;
    link.click();
}
</script>

<template>
    <div
        class="w-full max-w-md mx-auto bg-white rounded-lg border shadow-sm p-4"
    >
        <div
            ref="receiptRef"
            :class="[
                'bg-white rounded-lg',
                exporting ? 'px-6 py-6' : 'px-2 py-3 lg:px-4 lg:py-5',
            ]"
        >
            <h2 class="text-lg font-semibold text-center">
                Transaction Receipt
            </h2>

            <p class="text-sm text-gray-500 text-center mb-4">
                Debtor: {{ debtorName }}
            </p>

            <div class="border-t pt-3">
                <div
                    v-if="transactionsLoading"
                    class="text-center text-sm text-gray-400 py-6"
                >
                    Loading transactions…
                </div>

                <div
                    v-else
                    v-for="t in formattedTransactions"
                    :key="t.id"
                    class="py-3 text-sm border-b last:border-none"
                >
                    <div class="flex justify-between items-center">
                        <div>
                            <p :class="['font-medium', t.color]">
                                {{ t.label }}
                            </p>
                            <p class="text-xs text-gray-400">
                                {{ new Date(t.created_at).toLocaleString() }}
                            </p>
                        </div>

                        <p :class="['font-semibold', t.color]">
                            {{ t.sign }} ₱{{ t.amount.toLocaleString() }}
                        </p>
                    </div>

                    <!-- Balance flow -->
                    <div
                        class="mt-1 text-xs text-gray-500 flex justify-between"
                    >
                        <span>
                            Before: ₱{{ t.balance_before.toLocaleString() }}
                        </span>
                        <span>
                            After: ₱{{ t.balance_after.toLocaleString() }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="mt-4 text-center text-sm text-gray-600">
                <p>
                    Total Current Balance:
                    <span class="font-semibold">
                        ₱{{ Number(currentBalance).toLocaleString() }}
                    </span>
                </p>
            </div>
        </div>

        <Button
            class="w-full mt-4 flex items-center justify-center gap-2"
            @click="downloadAsImage"
        >
            <Download class="w-4 h-4" />
            Download Receipt (PNG)
        </Button>
    </div>
</template>
