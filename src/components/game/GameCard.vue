<template>
  <div class="card" :class="{show, find}">
    <div class="card-front card-side"></div>
    <div class="card-back card-side">{{ content }}</div>
  </div>
</template>

<script setup>
defineProps({
  content: {
    default: 'el'
  },
  show: {
    type: Boolean,
    default: false
  },
  find: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.card {
  margin: 1rem;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $radius;
  border: 1px solid $black;
  cursor: pointer;
  background-color: $white;
  transition: all $transition;
  position: relative;
  overflow: hidden;
  perspective: 100px;


  &-side {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    overflow: hidden;
  }

  &-back {
    transform: rotateY(180deg);
  }

  &.show,
  &.find {
    .card-front {
      transform: rotateY(180deg);
    }
    .card-back {
      transform: rotateY(0);
    }
  }
  &.show {
    background-color: $grey-light;
  }
  &.find {
    background-color: $green-50!important;
  }
}
</style>