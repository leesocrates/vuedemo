<template>
  <div>
    <div class="title">{{title}}</div>
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.title {
  display: inline-block;
  width: 10%;
}
</style>
