<template>
    <div class="home">
        <figma-title>Figma pdf</figma-title>
        <p class="description">The easiest way to convert figma files into pdf</p>
        <figma-button-input class="file-input" placeholder="File url"></figma-button-input>
    </div>
</template>
<script>
import FigmaButtonInput from "@/components/Common/FigmaButtonInput.vue";
import FigmaTitle from "@/components/Common/FigmaTitle.vue";
export default {
  components: { FigmaButtonInput, FigmaTitle }
};
</script>
<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.description {
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 13px;
  text-align: center;

  color: rgba(101, 91, 244, 0.57);
}

.file-input {
  margin-top: 37px;
}
</style>
