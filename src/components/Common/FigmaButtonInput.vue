<template>
    <div :class="{'error':!valid}" class="input-container" @click="onContainerClicked">
        <input :value="value" @input="onValueChanged($event.target.value)" ref="input" :type="type" :placeholder="placeholder">
        <figma-round-button @click.native.stop="click" class="button"></figma-round-button>
    </div>
</template>

<script>
import FigmaRoundButton from "@/components/Common/FigmaRoundButton.vue";
export default {
  components: { FigmaRoundButton },
  props: {
    placeholder: {},
    type: {},
    value: {},
    valid: {
      default: true
    }
  },
  methods: {
    onContainerClicked() {
      this.$refs.input.focus();
    },
    click() {
      this.$emit("onButtonClicked");
    },
    onValueChanged(value) {
      this.$emit("clearError");
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
.input-container {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 21px;
  padding: 0 18px;
  min-width: 335px;
  min-height: 72px;
  display: flex;
  align-items: center;
  transition: border 0.3s;
}

input {
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  font-size: 13px;
  text-transform: uppercase;
  color: white;
  padding-right: 18px;
  width: calc(100% - 46px);
  background-color: transparent;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.52);
  opacity: 1;
}

input:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.52);
}

input::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.52);
}

.button {
  margin-left: auto;
}

.error {
  border: 2px solid rgb(255, 88, 88);
}
</style>
