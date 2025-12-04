<script setup lang="ts">
import { Search } from 'lucide-vue-next';
</script>

<template>
    <div class="text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Search class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">No debtors found</h3>
        <p class="text-sm text-gray-500">Try adjusting your search query</p>
    </div>
</template>