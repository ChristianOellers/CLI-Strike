<script setup>
import { GRAFFITI_OPTIONS, LOSE_REACTIONS, WIN_REACTIONS } from "../game-data.js";
import ChoiceList from "./ChoiceList.vue";
import { computed, ref } from "vue";

const props = defineProps({
  outcome: { type: String, required: true }, // 'win' | 'lose'
  score: { type: Number, required: true },
});

const emit = defineEmits(["next"]);

const reaction = ref("");
const graffiti = ref("");

const isWin = computed(() => props.outcome === "win");
const reactionOptions = computed(() => (isWin.value ? WIN_REACTIONS : LOSE_REACTIONS));
const reactionLabel = computed(() => (isWin.value ? "Your reaction?" : "Your excuse?"));

const canSubmit = computed(() => {
  if (!reaction.value) return false;
  if (isWin.value && !graffiti.value) return false;

  return true;
});
</script>

<template>
  <div class="phase-card" :class="isWin ? 'phase-card--win' : 'phase-card--lose'">
    <div>
      <h2 class="phase-card__title">
        {{ isWin ? "You win!" : "You lose!" }}
      </h2>
      <p class="phase-card__score">Score: {{ score }}</p>
    </div>

    <ChoiceList :label="reactionLabel" :options="reactionOptions" v-model="reaction" />

    <ChoiceList v-if="isWin && reaction" label="Spray graffiti?" :options="GRAFFITI_OPTIONS" v-model="graffiti" />

    <button class="btn btn--primary" :disabled="!canSubmit" @click="emit('next')">Next round →</button>
  </div>
</template>
