<script setup lang="ts">
import Button from '../ui/button/Button.vue'

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'confirm'): void
}>()
</script>

<template>
    <div class="flex flex-col gap-5">
        <p>Are you sure you want to delete this debtor?</p>

        <div class="flex flex-col gap-2">
            <Button class="w-full" variant="destructive" @click="emit('confirm')">
                Confirm Delete
            </Button>

            <!-- Only present in delete modal -->
            <Button class="w-full" variant="outline" @click="emit('close')">
                Cancel
            </Button>
        </div>
    </div>
</template>
