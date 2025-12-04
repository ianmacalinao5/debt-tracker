<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { computed } from 'vue';
import { Filter, Search } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';

const props = defineProps<{
    searchQuery: string;
}>()

const emit = defineEmits<{
    (e: 'update:searchQuery', value: string): void
}>()

const internalSearchQuery = computed({
    get: () => props.searchQuery,
    set: (value) => {
        emit('update:searchQuery', value)
    }
})

</script>

<template>
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input v-model="internalSearchQuery" placeholder="Search debtors by name..." class="pl-10" />
        </div>
        <Button variant="outline" class="w-full sm:w-auto">
            <Filter class="w-4 h-4 mr-2" />
            Filter
        </Button>
    </div>
</template>