<template>
  <div class="finished" :class="{show:isEnd === true}">
    <div
        class="finished-title"
        :class="{success:endType === 'success', danger:endType === 'over'}"
    >
      Игра {{ endType === 'success' ? 'завершена' : 'проиграна' }}
    </div>
    <div class="finished-score">Ходов сделано: {{ score }}</div>
    <div class="finished-level">Уровень сложности: {{ bestScoreDifficult.title }}</div>
    <Button class="finished-btn finished-exit" text="Выйти" @click="exit"/>
    <div class="finished-text">или</div>
    <Button class="finished-btn finished-again" text="Попробовать заново" @click="again"/>
  </div>
</template>

<script setup>
import Button from '@/components/Button'
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
defineProps({
  isEnd: {
    type: Boolean,
    default: false
  },
  endType: {
    type: String,
    default: 'over'
  }
})
const score = computed(() => store.getters.currentGameScore)
const bestScoreDifficult = computed(() => {
  const levels = store.state.difficultyLevel
  const bestLevel = store.getters.currentGameLevel
  return bestLevel ? levels.find(item => item.type.toLowerCase() === bestLevel.toLowerCase()) : ''
})
const exit = () => {
  window.location.reload()
  localStorage.removeItem('isPlaying')
  localStorage.removeItem('currentLevel')
}
const again = () => {
  window.location.reload()
}
</script>

<style lang="scss">
@import "@/assets/styles/vars.scss";

.finished {
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all $transition;
  opacity: 0;
  visibility: hidden;
  box-shadow: $shadow;
  padding: 2rem;
  border-radius: $radius;
  background-color: $white;

  &.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    visibility: visible;
  }

  &-title {
    font-weight: 700;
    font-size: 3em;
    text-align: center;
    margin-bottom: 2rem;

    &.success {
      color: $green;
    }

    &.danger {
      color: $red;
    }
  }

  &-list {
    color: $grey;
    margin-bottom: 1.6rem;

    li + li {
      margin-top: .5rem;
    }
  }

  &-score,
  &-level {
    text-align: center;
    font-size: 1.2em;
  }

  &-level {
    margin-top: .5rem;
  }

  &-btn {
    display: block;
    margin: 0 auto 0;
  }

  &-exit {
    margin-top: 2.2rem;
  }

  &-text {
    margin: 1rem 0;
    font-size: 1.2em;
    text-align: center;
  }

}
</style>