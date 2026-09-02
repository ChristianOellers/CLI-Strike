<script setup>
const props = defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true }, // [{ name: string, checked: boolean }]
  modelValue: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue"]);

function toggle(name) {
  const next = [...props.modelValue];
  const id = next.indexOf(name);

  if (id === -1) next.push(name);
  else next.splice(id, 1);

  emit("update:modelValue", next);
}
</script>

<template>
  <div class="checkbox-group">
    <p class="checkbox-group__label">
      {{ label }}
    </p>
    <ul class="checkbox-group__options">
      <li v-for="option in options" :key="option.name">
        <button
          type="button"
          class="checkbox-group__option"
          :class="{ 'checkbox-group__option--checked': modelValue.includes(option.name) }"
          @click="toggle(option.name)"
        >
          <span class="checkbox-group__mark">{{ modelValue.includes(option.name) ? "✓" : "" }}</span>
          {{ option.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.checkbox-group__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.checkbox-group__options {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.checkbox-group__option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
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

.checkbox-group__option:hover {
  background: var(--color-surface-elevated);
}

.checkbox-group__option--checked {
  border-color: var(--color-accent);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  font-weight: 500;
}

.checkbox-group__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  border: 1.5px solid currentColor;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  flex-shrink: 0;
}
</style>
