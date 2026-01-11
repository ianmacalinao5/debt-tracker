<script setup lang="ts">
import { computed } from "vue";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationMeta {
    current_page: number;
    last_page: number;
}

const props = defineProps<{
    meta: PaginationMeta | null;
}>();

const emit = defineEmits<{
    (e: "change", page: number): void;
}>();

const goToPage = (page: number) => {
    if (!props.meta) return;
    if (page < 1 || page > props.meta.last_page) return;
    if (page === props.meta.current_page) return;

    emit("change", page);
};

// Calculate which pages to show
const visiblePages = computed(() => {
    if (!props.meta) return [];

    const current = props.meta.current_page;
    const last = props.meta.last_page;
    const delta = 2; // Pages to show on each side of current page

    const pages: Array<{ type: "page" | "ellipsis"; value?: number }> = [];

    // Always show first page
    pages.push({ type: "page", value: 1 });

    // Calculate range around current page
    let rangeStart = Math.max(2, current - delta);
    let rangeEnd = Math.min(last - 1, current + delta);

    // Add left ellipsis if needed
    if (rangeStart > 2) {
        pages.push({ type: "ellipsis" });
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push({ type: "page", value: i });
    }

    // Add right ellipsis if needed
    if (rangeEnd < last - 1) {
        pages.push({ type: "ellipsis" });
    }

    // Always show last page (if more than 1 page)
    if (last > 1) {
        pages.push({ type: "page", value: last });
    }

    return pages;
});
</script>

<template>
    <Pagination
        v-if="meta && meta.last_page > 1"
        :total="meta.last_page * 10"
        :items-per-page="10"
        :sibling-count="1"
        show-edges
        :default-page="meta.current_page"
        class="mt-6"
    >
        <PaginationContent>
            <PaginationPrevious @click="goToPage(meta.current_page - 1)" />

            <template
                v-for="(item, index) in visiblePages"
                :key="`page-${index}`"
            >
                <PaginationEllipsis
                    v-if="item.type === 'ellipsis'"
                    :index="index"
                />
                <PaginationItem
                    v-else-if="item.value"
                    :value="item.value"
                    :is-active="item.value === meta.current_page"
                    @click="goToPage(item.value)"
                >
                    {{ item.value }}
                </PaginationItem>
            </template>

            <PaginationNext @click="goToPage(meta.current_page + 1)" />
        </PaginationContent>
    </Pagination>
</template>
