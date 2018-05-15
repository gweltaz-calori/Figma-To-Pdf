<template>
  <div class="loader">
    <figma-title>FETCHING FILE</figma-title>
    <div class="progress-content">
        <figma-progress-placeholder class="progress"></figma-progress-placeholder>
        <span class="progress-label">{{step}}</span>
    </div>
  </div>
</template>
<script>
import FigmaTitle from "@/components/Common/FigmaTitle.vue";
import FigmaProgressPlaceholder from "@/components/Specific/FigmaProgressPlaceholder.vue";
export default {
  props: ["step", "progressValue"],
  components: {
    FigmaTitle,
    FigmaProgressPlaceholder
  }
};
</script>
<style scoped>
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.progress {
  margin-top: 29px;
}

.progress-label {
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 13px;
  margin-top: 5px;
  background: -webkit-linear-gradient(180deg, #8d87e1 0%, #685eff 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
