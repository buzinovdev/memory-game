<template>
  <h1 class="title">
    <span>Найти пару</span>
  </h1>
</template>

<script setup>
import {ref, onMounted} from "vue";
const props = defineProps({
  title: {
    type: String,
    default: 'игра'
  }
})
const textAnim = (text) => {
  const textArray = text.split('')
  const textBlock = document.querySelector('.title')
  let animTiming = 0.0
  const animDelay = 0.2
  textBlock.innerHTML = ''
  textArray.forEach(el => {
    textBlock.insertAdjacentHTML('beforeend', `<span>${el}</span>`)
  })
  textBlock.querySelectorAll('span').forEach(el => {
    if (el.innerHTML !== ' ') {
      el.style.animationDelay = `${animTiming}s`
      animTiming += animDelay
    }
  })
}
onMounted(() => {
  textAnim(props.title)
})
</script>

<style lang="scss">
@import "@/assets/styles/vars.scss";

.title {
  margin: 0;
  display: block;
  text-transform: uppercase;
  font-size: 4em;
  color: $black;

  span {
    position: relative;
    float: left;
    min-width: 10px;
    min-height: 10px;
    font-family: $font-title;
    font-weight: 700;
    letter-spacing: .5rem;
    opacity: 0;
    transform: translate(0, 20px) scale(0.2);
    animation: content 1s ease forwards;
  }
}

@keyframes content {
  0% {
    opacity: 0;
    text-shadow: 2px 2px 2px rgba(150, 150, 150, 0);
    transform: translate(0, 20px) scale(0.2);
  }
  50% {
    opacity: 0.7;
    transform: translate(0px, 0) scale(1.4);
    text-shadow: 10px 10px 2px rgba(150, 150, 150, .7);
  }
  100% {
    opacity: 1;
    text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);
    transform: translate(0, 0) scale(1);
  }
}
</style>