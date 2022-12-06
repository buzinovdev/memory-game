<template>
  <div class="game">
    <transition name="component-fade" mode="out-in">
      <component :is="Component" class="page-inner"/>
    </transition>
    <Instruction/>
  </div>
</template>

<script setup>
import Start from "@/components/AppStart";
import Game from "@/components/AppGame";
import Instruction from '@/components/Instruction'
import {computed} from "vue";
import {useStore} from "vuex";
const store = useStore()
const Component = computed(()=> {
  return store.getters.isPlaying ? Game : Start
})
</script>

<style lang="scss" scoped>
// Плавная смена компонента
.component-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
