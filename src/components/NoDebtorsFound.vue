<script setup lang="ts">
import { computed } from 'vue';
import { Search, UserX, FilterX } from 'lucide-vue-next';

const props = defineProps<{
    state: "empty" | "search" | "filter"
}>()

const icon = computed(() => {
    if (props.state === "empty") return UserX
    if (props.state === "search") return Search
    if (props.state === "filter") return FilterX
})

const title = computed(() => {
    if (props.state === "empty") return "No debtors yet"
    if (props.state === "search") return "No debtors found"
    if (props.state === "filter") return "No results for this filter"
})

const description = computed(() => {
    if (props.state === "empty") return "Create your first debtor to get started"
    if (props.state === "search") return "Try adjusting your search query"
    if (props.state === "filter") return "Try changing or clearing filters"
})
</script>

<template>
    <div class="text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <component :is="icon" class="w-8 h-8 text-gray-400" />
        </div>

        <h3 class="text-lg font-medium text-gray-900 mb-1">
            {{ title }}
        </h3>

        <p class="text-sm text-gray-500">
            {{ description }}
        </p>
    </div>
</template>
