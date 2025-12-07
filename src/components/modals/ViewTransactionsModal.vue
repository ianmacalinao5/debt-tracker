<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-vue-next"
import * as htmlToImage from "html-to-image"

// Sample Data
const transactions = [
    { id: 1, type: "less", amount: 500, date: "12/05/2025 1:00 PM" },
    { id: 2, type: "add", amount: 1500, date: "12/04/2025 3:12 PM" },
    { id: 3, type: "add", amount: 1500, date: "12/03/2025 9:45 AM" },
]

const receiptRef = ref<HTMLElement | null>(null)

async function downloadAsImage() {
    if (!receiptRef.value) return

    const dataUrl = await htmlToImage.toPng(receiptRef.value, {
        backgroundColor: "#ffffff", // ← force white bg
    })

    const link = document.createElement("a")
    link.download = "receipt.png"
    link.href = dataUrl
    link.click()
}
</script>

<template>
    <div class="w-full max-w-md mx-auto bg-white rounded-lg border shadow-sm p-4">

        <div ref="receiptRef" class="px-2 py-3 lg:px-4 lg:py-5 bg-white rounded-lg">
            <h2 class="text-lg font-semibold text-center">Transaction Receipt</h2>
            <p class="text-sm text-gray-500 text-center mb-4">
                Debtor: Vilma Butac
            </p>

            <div class="border-t pt-3">
                <div v-for="t in transactions" :key="t.id"
                    class="flex justify-between items-center py-2 text-sm border-b last:border-none">
                    <div>
                        <p :class="{
                            'text-green-700': t.type === 'less',
                            'text-red-700': t.type === 'add',
                        }" class="font-medium capitalize">
                            {{ t.type === "less" ? "Payment (Less)" : "Added Debt" }}
                        </p>
                        <p class="text-xs text-gray-400">{{ t.date }}</p>
                    </div>

                    <p class="font-semibold" :class="{
                        'text-green-700': t.type === 'less',
                        'text-red-700': t.type === 'add',
                    }">
                        ₱{{ t.amount }}
                    </p>
                </div>
            </div>

            <div class="mt-4 text-center text-sm text-gray-600">
                <p>Total Current Balance: <span class="font-semibold">₱3,500</span></p>
            </div>
        </div>

        <Button class="w-full mt-4 flex items-center justify-center gap-2" @click="downloadAsImage">
            <Download class="w-4 h-4" />
            Download as Photo
        </Button>
    </div>
</template>
