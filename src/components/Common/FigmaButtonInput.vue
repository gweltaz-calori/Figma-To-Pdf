<template>
    <div class="input-container" @click="onContainerClicked">
        <input ref="input" :type="type" :placeholder="placeholder">
        <figma-round-button @click.native.stop class="button"></figma-round-button>
    </div>
</template>

<script>
import FigmaRoundButton from "@/components/Common/FigmaRoundButton.vue";
export default {
  components: { FigmaRoundButton },
  props: ["placeholder", "type"],
  methods: {
    onContainerClicked() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style scoped>
.input-container {
  border: solid #867effa1 2px;
  border-radius: 21px;
  padding: 0 18px;
  min-width: 335px;
  min-height: 72px;
  display: flex;
  align-items: center;
}

input {
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  font-size: 13px;
  text-transform: uppercase;
  color: #685eff;
  padding-right: 18px;
  width: calc(100% - 46px);
}

input::placeholder {
  color: rgba(91, 80, 255, 0.21);
  opacity: 1;
}

input:-ms-input-placeholder {
  color: rgba(91, 80, 255, 0.21);
}

input::-ms-input-placeholder {
  color: rgba(91, 80, 255, 0.21);
}

.button {
  margin-left: auto;
}
</style>
