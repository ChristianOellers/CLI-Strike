<script setup>
import PhaseGameLoop from "./components/PhaseGameLoop.vue";
import PhaseOutcome from "./components/PhaseOutcome.vue";
import PhaseSelection from "./components/PhaseSelection.vue";
import ScoreBar from "./components/ScoreBar.vue";
import { inject as injectAnalytics } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { reactive } from "vue";

injectAnalytics();
injectSpeedInsights();

const state = reactive({
  phase: "selection",
  score: 0,
  player: { side: "", costume: "", weapons: [] },
  round: {
    move: "",
    jump: false,
    duck: false,
    seeEnemy: "",
    attack: "",
    outcome: null,
  },
});

function onSelectionComplete(player) {
  state.player = player;
  state.phase = "game_loop";
}

function onGameLoopComplete(round) {
  if (!round.attack) {
    // No enemy — skip outcome, loop back
    state.round = { ...round, outcome: null };
    state.phase = "game_loop";

    return;
  }

  const isWin = Math.random() >= 0.5;

  state.round = { ...round, outcome: isWin ? "win" : "lose" };

  if (isWin) state.score++;

  state.phase = "outcome";
}

function onNext() {
  state.round = {
    move: "",
    jump: false,
    duck: false,
    seeEnemy: "",
    attack: "",
    outcome: null,
  };

  state.phase = "game_loop";
}
</script>

<template>
  <ScoreBar :score="state.score" :side="state.player.side" :weapons="state.player.weapons" />
  <main class="main">
    <PhaseSelection v-if="state.phase === 'selection'" @complete="onSelectionComplete" />
    <PhaseGameLoop v-else-if="state.phase === 'game_loop'" :player="state.player" @complete="onGameLoopComplete" />
    <PhaseOutcome v-else-if="state.phase === 'outcome'" :outcome="state.round.outcome" :score="state.score" @next="onNext" />
  </main>
</template>
