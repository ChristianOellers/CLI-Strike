<script setup>
import { ref, computed } from 'vue'
import ChoiceList from './ChoiceList.vue'
import { MOVE_OPTIONS, ATTACK_OPTIONS } from '../game-data.js'

defineProps({
  player: { type: Object, required: true },
})
const emit = defineEmits(['complete'])

const move      = ref('')
const jump      = ref('')
const duck      = ref('')
const seeEnemy  = ref('')
const attack    = ref('')

const canSubmit = computed(() => {
  if (!move.value || !jump.value) return false
  if (jump.value === 'No' && !duck.value) return false
  if (!seeEnemy.value) return false
  if (seeEnemy.value === 'Yes' && !attack.value) return false
  return true
})

function submit() {
  if (!canSubmit.value) return
  emit('complete', {
    move:      move.value,
    jump:      jump.value === 'Yes',
    duck:      duck.value === 'Yes',
    seeEnemy:  seeEnemy.value,
    attack:    seeEnemy.value === 'Yes' ? attack.value : '',
  })
}
</script>

<template>
  <div class="phase-card">
    <h2 class="phase-card__title">Round</h2>

    <ChoiceList label="Go which direction?" :options="MOVE_OPTIONS" v-model="move" />
    <ChoiceList label="Jump?" :options="['Yes', 'No']" v-model="jump" />
    <ChoiceList v-if="jump === 'No'" label="Duck?" :options="['Yes', 'No']" v-model="duck" />
    <ChoiceList label="Do you see an enemy?" :options="['Yes', 'No']" v-model="seeEnemy" />
    <ChoiceList v-if="seeEnemy === 'Yes'" label="Attack?" :options="ATTACK_OPTIONS" v-model="attack" />

    <button class="btn btn--primary" :disabled="!canSubmit" @click="submit">
      Go →
    </button>
  </div>
</template>
