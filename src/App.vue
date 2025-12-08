<script setup lang="ts">
import { RouterView } from 'vue-router';
import 'vue-sonner/style.css'
import { Toaster } from 'vue-sonner';
</script>

<template>
  <RouterView />
  <Toaster position="top-right" closeButton closeButtonPosition="top-right" richColors />
</template>
