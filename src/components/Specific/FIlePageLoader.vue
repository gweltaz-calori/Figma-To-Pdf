<template>
  <div v-if="!error" class="loader">
    <figma-title>FETCHING FILE</figma-title>
    <div class="progress-content">
        <figma-progress-placeholder class="progress"></figma-progress-placeholder>
        <span class="progress-label">{{step}}</span>
    </div>
  </div>
  <div v-else class="fetch-error">
    <span class="error">{{error}}</span>
    <figma-button  :to="{'name':'home'}" class="toggle-selection-button">GO HOME</figma-button>
  </div>
</template>
<script>
import FigmaButton from "@/components/Common/FigmaButton.vue";
import FigmaTitle from "@/components/Common/FigmaTitle.vue";
import FigmaProgressPlaceholder from "@/components/Specific/FigmaProgressPlaceholder.vue";
export default {
  props: ["step", "progressValue", "error"],
  components: {
    FigmaTitle,
    FigmaProgressPlaceholder,
    FigmaButton
  }
};
</script>
<style scoped>
.loader,
.fetch-error {
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

.error {
  color: rgb(255, 88, 88);
  font-weight: bold;
  margin-bottom: 15px;
}
</style>
