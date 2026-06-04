<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="choice-list">
    <p class="choice-list__label">{{ label }}</p>
    <ul class="choice-list__options">
      <li v-for="option in options" :key="option">
        <button
          type="button"
          class="choice-list__option"
          :class="{ 'choice-list__option--selected': modelValue === option }"
          @click="$emit('update:modelValue', option)"
        >{{ option }}</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.choice-list__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.choice-list__options {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.choice-list__option {
  display: block;
  width: 100%;
  padding: 0.625rem 1rem;
  text-align: left;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  color: var(--color-text-primary);
  font-family: var(--font-base);
  font-size: 1rem;
  cursor: pointer;
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.choice-list__option:hover {
  background: var(--color-surface-elevated);
}

.choice-list__option--selected {
  border-color: var(--color-accent);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-weight: 500;
}
</style>
