<template>
  <div class="instruction" :class="{show}">
    <div>
      <div class="instruction-title">Инструкция</div>
      <ul class="instruction-list">
        <li v-for="item in difficultlyLevel" :key="item.type"><span>{{ item.title }} уровень</span> - {{ item.desc }}</li>
      </ul>
    </div>
    <Button class="instruction-btn" text="Понятно" @click="store.dispatch('instruction', false)"/>
  </div>
</template>

<script setup>
import Button from '@/components/Button'
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore()
const difficultlyLevel = computed(() => store.state.difficultyLevel)
const show = computed(() => {
  return store.getters.showInstruction
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.instruction {
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
    font-size: 1.8em;
    text-align: center;
    margin-bottom: 2rem;
  }

  &-list {
    color: $grey;
    margin-bottom: 1.6rem;

    li + li {
      margin-top: .5rem;
    }
  }

  &-btn {
    display: block;
    margin: 0 auto;
  }
}
</style>