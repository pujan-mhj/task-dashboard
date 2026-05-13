<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percentage: number
}>()

const clampedPercentage = computed(() => {
  const n = Number(props.percentage)
  if (!Number.isFinite(n)) return 0
  return Math.min(100, Math.max(0, Math.round(n)))
})
</script>

<template>
  <div class="td-progress">
    <div class="td-progress__header">
      <span class="td-progress__label">Completion Progress</span>
      <span class="td-progress__value">{{ clampedPercentage }}%</span>
    </div>
    <div class="td-progress__track">
      <div
        class="td-progress__fill"
        :style="{ width: `${clampedPercentage}%` }"
        role="progressbar"
        :aria-valuenow="clampedPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>
