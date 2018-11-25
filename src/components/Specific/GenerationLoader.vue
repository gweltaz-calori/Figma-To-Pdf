<template>
  <div class="loader">
    <figma-button v-if="complete" class="back-button" :to="{name: 'home'}" theme="dark">create another pdf</figma-button>
    <figma-title>{{stepLabel}}</figma-title>
    <div v-if="exportHasError" class="export-summary">
      <span class="summary-title">Export Summary</span>
      <div class="summary-error" v-for="error in errors" :key="error.id">
        [Error] For Frame "{{error.content}}"
      </div>
    </div>
    <div v-if="!complete" class="progress-content">
        <figma-progress class="progress" :progress="(currentPage/frames.length)*100"></figma-progress>
        <span class="progress-label">{{getAction}} page {{currentPage}}/{{frames.length}}</span>
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
      complete: false,
      action: "PROCESSED",
      errors: []
    };
  },
  computed: {
    getAction() {
      return this.action == "SKIP" ? "Skipping" : "Processing";
    },
    exportHasError() {
      return this.errors.length > 0;
    }
  },
  methods: {
    onPdfFrameStep(data) {
      this.currentPage++;
      this.action = data.action;
      if (this.action == "SKIP") {
        this.errors.push({
          content: data.frame.name,
          id: data.frame.id
        });
      }
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
    onPdfGenerating() {
      this.stepLabel = "GENERATING PDF";
    },
    onPdfDownloading() {
      this.stepLabel = "DOWNLOADING PDF";
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
    WebSocketManager.onPdfDownloading(this.onPdfDownloading.bind(this));
    WebSocketManager.onPdfGenerating(this.onPdfGenerating.bind(this));
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

.export-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary-title {
  font-family: Exo;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  background: -webkit-linear-gradient(180deg, #8d87e1 0%, #685eff 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary-error {
  font-family: Exo;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 10px;
  margin-bottom: 10px;
  color: #8d87e1;
}
</style>
