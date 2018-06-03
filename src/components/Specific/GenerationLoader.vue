<template>
  <div class="loader">
    <figma-button v-if="complete" class="back-button" :to="{name: 'home'}" theme="dark">create another pdf</figma-button>
    <figma-title>{{stepLabel}}</figma-title>
    <div v-if="!complete" class="progress-content">
        <figma-progress class="progress" :progress="(currentPage/frames.length)*100"></figma-progress>
        <span class="progress-label">Processing page {{currentPage}}/{{frames.length}}</span>
    </div>
    <figma-button class="download" v-else @click.native="download" >download again</figma-button>
  </div>
</template>
<script>
import WebSocketManager from "@/js/utils/ws";
import { createPdf } from "@/api/index";

import FigmaButton from "@/components/Common/FigmaButton.vue";
import FigmaTitle from "@/components/Common/FigmaTitle.vue";
import FigmaProgress from "@/components/Common/FigmaProgress.vue";
export default {
  props: ["file", "frames"],
  components: {
    FigmaTitle,
    FigmaProgress,
    FigmaButton
  },
  data() {
    return {
      currentPage: 0,
      stepLabel: "GENERATION STARTED",
      complete: false
    };
  },
  methods: {
    onPdfFrameStep() {
      this.currentPage++;
    },
    onPdfGenerated(data) {
      this.stepLabel = "PDF GENERATED";
      this.complete = true;

      let blob = new Blob([data], { type: "application/pdf" });
      this.link = document.createElement("a");
      this.link.href = window.URL.createObjectURL(blob);
      this.link.download = `${this.file.name}.pdf`;

      this.download();
    },
    download() {
      this.link.click();
    }
  },
  beforeDestroy() {
    WebSocketManager.off();
  },
  mounted() {
    createPdf(this.file, this.frames).then(this.onPdfGenerated.bind(this));
    WebSocketManager.onPdfFrameStep(this.onPdfFrameStep.bind(this));
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

.download {
  margin-top: 12px;
}

.back-button {
  position: absolute;
  top: 50px;
  right: 50px;
}
</style>
