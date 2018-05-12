<template>
  <div class="page-item">
    <div class="preview-container">
      <div class="page-item-preview"></div>
      <figma-action-button class="remove-button"></figma-action-button>
    </div>
    <span class="page-item-number">2</span>
  </div>
</template>

<script>
import FigmaActionButton from "@/components/Common/FigmaActionButton.vue";
export default {
  components: {
    FigmaActionButton
  }
};
</script>

<style scoped>
.page-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.preview-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-item-preview {
  width: 238px;
  height: 338px;
  background: linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%);
  border-radius: 5px;
}

.page-item-number {
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 18px;
  text-align: center;
  margin-top: 12px;

  background: -webkit-linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.remove-button {
  position: absolute;
  bottom: 25px;
}
</style>
