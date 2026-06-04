<script setup>
import { ref, computed, watch } from 'vue'
import ChoiceList from './ChoiceList.vue'
import CheckboxGroup from './CheckboxGroup.vue'
import { SIDES, COSTUMES, WEAPONS } from '../game-data.js'

const emit = defineEmits(['complete'])

const side    = ref('')
const costume = ref('')
const weapons = ref([])

const costumeOptions = computed(() => side.value ? COSTUMES[side.value] : [])
const weaponOptions  = computed(() => side.value ? WEAPONS[side.value] : [])

watch(side, (val) => {
  costume.value = ''
  weapons.value = val ? WEAPONS[val].filter(w => w.checked).map(w => w.name) : []
})

const canSubmit = computed(() => side.value && costume.value)

function submit() {
  if (!canSubmit.value) return
  emit('complete', { side: side.value, costume: costume.value, weapons: weapons.value })
}
</script>

<template>
  <div class="phase-card">
    <h2 class="phase-card__title">Choose your side</h2>

    <ChoiceList label="Which side?" :options="SIDES" v-model="side" />

    <template v-if="side">
      <div class="costume-section">
        <p class="costume-section__label">Costume?</p>
        <ul class="costume-section__options">
          <li v-for="hex in costumeOptions" :key="hex">
            <button
              type="button"
              class="costume-option"
              :class="{ 'costume-option--selected': costume === hex }"
              @click="costume = hex"
            >
              <span class="costume-option__swatch" :style="{ background: hex }" />
              <span class="costume-option__label">{{ hex }}</span>
            </button>
          </li>
        </ul>
      </div>

      <CheckboxGroup label="Weapons?" :options="weaponOptions" v-model="weapons" />
    </template>

    <button class="btn btn--primary" :disabled="!canSubmit" @click="submit">
      Deploy →
    </button>
  </div>
</template>

<style scoped>
.costume-section__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.costume-section__options {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.costume-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.625rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  cursor: pointer;
  font-family: var(--font-base);
  font-size: 1rem;
  color: var(--color-text-primary);
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast);
}

.costume-option:hover {
  background: var(--color-surface-elevated);
}

.costume-option--selected {
  border-color: var(--color-accent);
  background: var(--color-accent-subtle);
}

.costume-option__swatch {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.costume-option__label {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.costume-option--selected .costume-option__label {
  color: var(--color-accent);
}
</style>
