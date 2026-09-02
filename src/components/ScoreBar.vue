<script setup>
defineProps({
  score: { type: Number, default: 0 },
  side: { type: String, default: "" },
  weapons: { type: Array, default: () => [] },
});
</script>

<template>
  <header class="score-bar">
    <div class="score-bar__inner">
      <span class="score-bar__title">CLI-Strike</span>

      <div class="score-bar__meta" v-if="side">
        <span class="score-bar__side">{{ side }}</span>
        <span v-if="weapons.length" class="score-bar__weapons">{{ weapons.join(" · ") }}</span>
      </div>

      <div class="score-bar__score">
        <span class="score-bar__score-label">Score</span>
        <span class="score-bar__score-value">{{ score }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.score-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.score-bar__inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.score-bar__title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-accent);
  letter-spacing: -0.01em;
  flex-shrink: 0;
}

.score-bar__meta {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  overflow: hidden;
}

.score-bar__side {
  font-weight: 500;
  color: var(--color-text-primary);
  flex-shrink: 0;
}

.score-bar__weapons {
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.score-bar__score {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.score-bar__score-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.score-bar__score-value {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
  min-width: 1.5ch;
  text-align: right;
}
</style>
