<template>
  <div class="page-item">
    <div class="preview-container" >
      <div class="page-item-preview" >
        <img class="preview-image" :src="frame.imageUrl" alt="">
      </div>
      <figma-action-button @click.native="remove" class="remove-button"></figma-action-button>
    </div>
  </div>
</template>

<script>
import FigmaActionButton from "@/components/Common/FigmaActionButton.vue";
export default {
  props: ["frame"],
  components: {
    FigmaActionButton
  },
  computed: {
    bounds() {
      return {
        height: `${this.frame.absoluteBoundingBox.height / 4}px`,
        width: `${this.frame.absoluteBoundingBox.width / 4}px`
      };
    }
  },
  methods: {
    remove() {
      this.$emit("onRemoved");
    }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-item-preview {
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center; /* 
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.11); */
  width: 360px;
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
  margin-top: 9px;
}

.preview-image {
  width: 100%;
  height: auto;
  background: linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%);
  pointer-events: none;
}
</style>
