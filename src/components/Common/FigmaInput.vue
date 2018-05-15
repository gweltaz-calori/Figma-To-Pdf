<template>
    <input :value="value" @input="onValueChanged($event.target.value)" ref="input" :type="type" :placeholder="placeholder">
</template>

<script>
export default {
  props: ["placeholder", "type", "value"],
  methods: {
    onContainerClicked() {
      this.$refs.input.focus();
    },
    onValueChanged(value) {
      this.$emit("input", value);
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
  background-color: transparent;
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
