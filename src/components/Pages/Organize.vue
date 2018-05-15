<template>
  <generation-loader v-if="generating" :file="file"></generation-loader>
  <div v-else-if="this.file.frames.length > 0" class="creator">
      <figma-input v-model="file.name" placeholder="File name" class="file-title"></figma-input>
      <div class="content">
        <div class="export-header">
          <div class="settings">
            <h2 class="options-title">options</h2>
            <div class="options">
              <figma-radio-button label="Text outlines" v-model="file.options.textOutlines"></figma-radio-button>
            </div> 
          </div>
          <div class="buttons">
            <figma-button class="reset-button">reset</figma-button>
            <figma-button @click.native="createPdf" theme="dark">create pdf</figma-button>
          </div>
        </div>
        <div class="export-pages">
          <file-page-item :frame="frame" :key="frame.id" v-for="frame in file.frames" class="export-page"></file-page-item>
        </div>
      </div>
  </div>
  <file-page-loader v-else :progress-value="progressValue" :step="loadingStep"></file-page-loader>
</template>

<script>
import FigmaButton from "@/components/Common/FigmaButton.vue";
import FilePageLoader from "@/components/Specific/FilePageLoader.vue";
import GenerationLoader from "@/components/Specific/GenerationLoader.vue";
import FigmaInput from "@/components/Common/FigmaInput.vue";
import FilePageItem from "@/components/Specific/FilePageItem.vue";
import FigmaRadioButton from "@/components/Common/FigmaRadioButton.vue";

import { getFramePages, createPdf } from "@/api/index";

import WS from "@/js/utils/ws";

export default {
  components: {
    FigmaButton,
    FigmaInput,
    FilePageItem,
    FigmaRadioButton,
    FilePageLoader,
    GenerationLoader
  },
  data() {
    return {
      file: {
        name: "",
        version: "1.5",
        options: {
          textOutlines: false
        },
        frames: []
      },
      loadingStep: "Loading",
      progressValue: 0,
      generating: false
    };
  },
  methods: {
    createPdf() {
      if (this.file.name.length == 0)
        this.file.name = this.$route.params.fileId;
      this.generating = true;
    },
    onFetchedFrameStep(data) {
      this.loadingStep = data.step;
    },
    onComplete(data) {
      this.file.frames = data.frames;
    }
  },
  beforeDestroy() {
    WS.off();
  },
  async mounted() {
    WS.fetchFile({
      fileId: this.$route.params.fileId
    });
    WS.onFetchedFrameStep(this.onFetchedFrameStep.bind(this));
    WS.onComplete(this.onComplete.bind(this));
  }
};
</script>

<style scoped>
.creator {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.content {
  margin-top: 75px;
  width: 80%;
}

.file-title {
  text-align: center;
  position: absolute;
  top: 34px;
  width: 320px;
}

.export-header {
  display: flex;
  align-items: center;
}

.export-pages {
  margin-top: 38px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.export-page {
  margin: 5px;
}

.buttons {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.reset-button {
  margin-right: 10px;
}

.options-title {
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  font-size: 12px;
  text-transform: uppercase;
  background: -webkit-linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}
</style>
