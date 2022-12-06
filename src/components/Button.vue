<template>
  <button class="btn" :class="type">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: {type: String, default: ''},
  type: {type: String, default: 'success'}
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";
.btn {
  border: none;
  border-radius: $radius;
  padding: 1rem 2rem;
  text-transform: uppercase;
  background-color: transparent;
  font-weight: 700;
  font-size: 1em;
  transition: border-radius $transition;
  &:hover {
    border-radius: $radius-mini;
  }
  &.success {
    background-color: $green;
    color: $white;
  }
  &.danger {
    background-color: $red;
    color: $white;
  }
  &.info {
    background-color: $grey-light;
    color: $white;
  }
}
</style>