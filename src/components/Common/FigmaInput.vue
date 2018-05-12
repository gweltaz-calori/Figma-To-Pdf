<template>
    <input ref="input" :type="type" :placeholder="placeholder">
</template>

<script>
export default {
  props: ["placeholder", "type"],
  methods: {
    onContainerClicked() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style scoped>
input {
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  font-size: 13px;
  text-transform: uppercase;
  color: #685eff;
}

input::placeholder {
  color: rgba(32, 22, 175, 0.38);
  opacity: 1;
}

input:-ms-input-placeholder {
  color: rgba(32, 22, 175, 0.38);
}

input::-ms-input-placeholder {
  color: rgba(32, 22, 175, 0.38);
}
</style>
