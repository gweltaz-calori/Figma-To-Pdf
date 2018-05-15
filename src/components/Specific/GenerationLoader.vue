<template>
  <div class="loader">
    <figma-title>GENERATION STARTED</figma-title>
    <div class="progress-content">
        <figma-progress class="progress" :progress="(currentPage/file.frames.length)*100"></figma-progress>
        <span class="progress-label">Processing page {{currentPage}}/{{file.frames.length}}</span>
    </div>
  </div>
</template>
<script>
import WS from "@/js/utils/ws";
import FigmaTitle from "@/components/Common/FigmaTitle.vue";
import FigmaProgress from "@/components/Common/FigmaProgress.vue";
export default {
  props: ["file"],
  components: {
    FigmaTitle,
    FigmaProgress
  },
  data() {
    return {
      currentPage: 0
    };
  },
  methods: {
    onPdfStep(data) {
      this.currentPage++;
    },
    onPdfContent(data) {
      var buffer = new ArrayBuffer(data);
      var blob = new Blob([buffer], { type: "application/pdf" });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${this.file.name}.pdf`;
      link.click();
    }
  },
  beforeDestroy() {
    WS.off();
  },
  mounted() {
    WS.createPdf({
      file: this.file
    });

    WS.onPdfStep(this.onPdfStep);
    WS.onPdfContent(this.onPdfContent);
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
