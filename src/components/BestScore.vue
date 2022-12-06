<template>
  <div class="best-score">Лучшая игра пройдена за <span>{{ bestScore }}</span> шагов
    <span>{{ bestScore ? `на уровне ${bestScoreDifficult.title}` : '' }}</span></div>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from 'vuex'

const store = useStore()
const bestScore = computed(() => store.getters.bestGame.score)
const bestScoreDifficult = computed(() => {
  const levels = store.state.difficultyLevel
  const bestLevel = store.getters.bestGame.level
  return bestLevel ? levels.find(item => item.type.toLowerCase() === bestLevel.toLowerCase()) : ''
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.best-score {
  color: $grey;
  font-size: 1.2em;
  margin-top: 2rem;

  span {
    color: $black;
  }
}
</style>