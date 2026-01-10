<script setup lang="ts">
import Button from "../ui/button/Button.vue";
import { toast } from "vue-sonner";

const props = defineProps<{
    debtorId: number;
}>();

const emit = defineEmits<{
    (e: "close"): void;
    (e: "delete", id: number): void;
}>();

const handleDeleteDebtor = () => {
    emit("delete", props.debtorId);
    emit("close");
    toast.success("Debtor deleted successfully!");
};
</script>

<template>
    <div class="flex flex-col gap-5">
        <p>Are you sure you want to delete this debtor?</p>

        <div class="flex flex-col gap-2">
            <Button
                class="w-full"
                variant="destructive"
                @click="handleDeleteDebtor"
            >
                Confirm Delete
            </Button>

            <Button class="w-full" variant="outline" @click="emit('close')">
                Cancel
            </Button>
        </div>
    </div>
</template>
