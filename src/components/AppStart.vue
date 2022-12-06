<template>
  <div class="start">
    <div class="top">
      <AppTitle title="Найти пару"/>
    </div>
    <div class="middle">
      <Button class="start-btn" text="Играть" @click="startClick = true" v-if="startClick === false"/>
      <SelectLevel v-else/>
      <BestScore/>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script setup>
import AppTitle from "@/components/AppTitle";
import Button from '@/components/Button'
import BestScore from "@/components/BestScore";
import SelectLevel from '@/components/start/SelectLevel'
import {ref} from "vue";
const startClick = ref(false)
</script>

<style lang="scss" scoped>
.start {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.top, .middle, .bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top {
  height: 20vh;
}
.middle {
  flex-direction: column;
  height: 70vh;
  opacity: 0;
  transform: scale(0.2);
  animation: middle 1s 1.5s ease forwards;
}
.bottom {
  height: 10vh;
  animation: bottom 1s 1.5s ease forwards;
  opacity: 0;
  transform: translateY(100%);
}
.start-btn {
  display: block;
  margin: 0 auto;
}
@keyframes middle {
  from {
    opacity: 0;
    transform: scale(0.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>