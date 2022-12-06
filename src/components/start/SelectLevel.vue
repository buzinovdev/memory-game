<template>
  <div>
    <div class="select-title">Выберите уровень сложности</div>
    <div class="select-list">
      <Button
          v-for="item in difficultyLevels"
          :key="item"
          :text="item.title"
          class="bnt-select"
          :type="item.type"
          @click="selectedLevel(item.type)"/>
    </div>
    <Button class="select-info" text="Инструкция" type="info" @click="store.dispatch('instruction', true)"/>
  </div>
</template>

<script setup>
import Button from '@/components/Button'
import {computed} from "vue";
import {useStore} from 'vuex'

const store = useStore()

const difficultyLevels = computed(() => {
  return store.state.difficultyLevel
})
const selectedLevel = (level) => {
  store.dispatch('setGameLevel', level)
  store.dispatch('isPlaying', true)
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.select {
  &-title {
    font-weight: 700;
    text-align: center;
    font-size: 2em;
    margin-bottom: 2rem;
    color: $black;
  }

  &-info {
    display: block;
    margin: 4rem auto 0;
  }
}

.bnt-select {
  margin: 0 1rem;
  border: 2px solid;
  color: $black;

  &.easy {
    border-color: $green;
  }

  &.average {
    border-color: $orange;
  }

  &.difficult {
    border-color: $red;
  }
}
</style>