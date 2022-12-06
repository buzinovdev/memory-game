<template>
  <div class="game">
    <div class="game-content">
      <div class="game-health" v-if="health > 0">Попыток осталось: {{ health }}</div>
      <div class="game-difficult">Уровень сложности: <span>{{ difficultyLevel.title }}</span></div>
      <div class="game-head">
        <span class="counter">ходов: {{ counterTrying }}</span>
        <span class="counter">найдено пар: {{ counterSuccess }}</span>
      </div>
      <div class="game-body">
        <GameCard
            :content="item.content"
            :show="item.show"
            :find="item.find"
            v-for="(item,idx) in cardList" :key="idx"
            @click="checkClick(item.id, idx, item.show)"
        />
      </div>
      <Button class="game-info" text="Инструкция" type="info" @click="store.dispatch('instruction', true)"/>
      <GameFinished :isEnd="endGame" :endType="endGameType"/>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button'
import GameCard from "@/components/game/GameCard"
import GameFinished from '@/components/game/GameFinished'
import {ref, reactive, computed, onBeforeMount} from "vue";
import {useStore} from "vuex";

const store = useStore()
const difficultyLevel = computed(() => {
  const currentGameLevel = store.getters.currentGameLevel
  return store.state.difficultyLevel.find(item => item.type === currentGameLevel)
})
const health = ref(difficultyLevel.value.health)
const isClicked = ref(false)
const endGame = ref(false)
const endGameType = ref('over')
const first = reactive({
  idx: -1,
  id: 0
})
const counterTrying = ref(0)
const counterSuccess = ref(0)
const cardList = reactive([
  {content: 'A', id: 1, show: false, find: false},
  {content: 'B', id: 2, show: false, find: false},
  {content: 'C', id: 3, show: false, find: false},
  {content: 'D', id: 4, show: false, find: false},
  {content: 'E', id: 5, show: false, find: false},
  {content: 'F', id: 6, show: false, find: false},
  {content: 'G', id: 7, show: false, find: false},
  {content: 'H', id: 8, show: false, find: false},
  {content: 'A', id: 1, show: false, find: false},
  {content: 'B', id: 2, show: false, find: false},
  {content: 'C', id: 3, show: false, find: false},
  {content: 'D', id: 4, show: false, find: false},
  {content: 'E', id: 5, show: false, find: false},
  {content: 'F', id: 6, show: false, find: false},
  {content: 'G', id: 7, show: false, find: false},
  {content: 'H', id: 8, show: false, find: false},
])
const checkClick = (id, idx, show) => {
  if (first.idx === idx || show) return
  if (isClicked.value === false) {
    if (first.id === 0) {
      first.idx = idx
      first.id = id
      cardList[idx].show = true
    } else {
      if (first.id === id) {
        cardList[first.idx].show = true
        cardList[idx].show = true
        cardList[first.idx].find = true
        cardList[idx].find = true
        first.id = 0
        first.idx = -1
        counterSuccess.value++
      } else {
        isClicked.value = true
        cardList[idx].show = true
        health.value--
        setTimeout(() => {
          cardList[idx].show = false
          cardList[first.idx].show = false
          first.id = 0
          first.idx = -1
          isClicked.value = false
        }, 1000)
      }
      counterTrying.value++
    }
    if (health.value === 0) {
      endGame.value = true
    } else {
      end()
    }
  }
}

const end = () => {
  if (cardList.every(el => el.find === true)) {
    store.dispatch('setGameScore', counterTrying.value)
    const bestGame = store.getters.bestGame
    if (bestGame.level !== '') {
      if (counterTrying.value <= bestGame.score &&
          difficultyLevel.value.num > store.state.difficultyLevel.find(item => item.type === bestGame.level).num) {
        store.dispatch('saveGameScore', {level: difficultyLevel.value.type, score: counterTrying.value})
      }
    } else {
      store.dispatch('saveGameScore', {level: difficultyLevel.value.type, score: counterTrying.value})
    }
    endGame.value = true
    endGameType.value = 'success'
  }
}
/*const end = computed(() => {
  if (cardList.every(el => el.find === true)) {
    store.dispatch('setGameScore', counterTrying.value)
    const bestGame = store.getters.bestGame
    if (bestGame.level !== '') {
      if (counterTrying.value <= bestGame.score &&
          difficultyLevel.value.num > store.state.difficultyLevel.find(item => item.type === bestGame.level).num) {
        store.dispatch('saveGameScore', {level: difficultyLevel.value.type, score: counterTrying.value})
      }
    } else {
      store.dispatch('saveGameScore', {level: difficultyLevel.value.type, score: counterTrying.value})
    }
    return true
  } else {
    return false
  }
})*/
const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
}
onBeforeMount(() => {
  //cardList.push(...cardList)
  shuffle(cardList)
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.game {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;


  &-difficult,
  &-health {
    margin-bottom: 24px;

    span {
      font-weight: 700;
    }
  }

  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

  }

  &-body {
    background-color: $white;
    border-radius: $radius-mini;
    border: 1px solid $black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . .";
  }

  &-info {
    display: block;
    margin: 25px auto 0;
  }
}

.counter {
  background-color: $white;
  border-radius: $radius-mini;
  border: 1px solid $black;
  padding: 5px 10px;

  & + & {
    margin-left: 10px;
  }
}
</style>