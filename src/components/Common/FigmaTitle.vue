<template>
  <h1 :class="color"><slot></slot></h1>
</template>
<script>
export default {
  props: {
    color: {
      default: "dark"
    }
  }
};
</script>

<style scoped>
h1 {
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  text-align: center;
  font-size: 36px;
  text-align: center;
  color: #685eff;
  background: -webkit-linear-gradient(180deg, #8d87e1 0%, #685eff 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.white {
  color: white;
  background: transparent;
  -webkit-text-fill-color: inherit;
}
</style>
