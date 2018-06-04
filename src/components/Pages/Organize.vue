<template>
  <generation-loader v-if="generating" :file="file" :frames="filteredFrames"></generation-loader>
  <div v-else-if="this.file.frames.length > 0" class="creator">
      <figma-input v-model="file.name" placeholder="File name" class="file-title"></figma-input>
      <div class="content">
        <div class="export-header">
          <div class="settings">
            <h2 class="options-title">options</h2>
            <div class="options">
              Coming soon
              <!-- <figma-radio-button label="Text outlines" v-model="file.options.textOutlines"></figma-radio-button> -->
            </div> 
          </div>
          <div class="buttons">
            <div class="buttons-container">
              <figma-button  @click.native="reset" class="reset-button">reset</figma-button>
              <figma-button  @click.native="cancel" class="reset-button">undo</figma-button>
              <figma-button @click.native="generatePdf" :disabled="filteredFrames.length == 0" theme="dark">create pdf</figma-button>
            </div>
            <figma-flash class="error-message" v-show="filteredFrames.length == 0">You need to have at least one frame</figma-flash>
          </div>
        </div>
        <div class="export-content">
          <transition-group name="frames-transition-list" ref="grid" class="frames-list">
            <file-page-item class="export-page" :id="frame.id"  v-for="frame in filteredFrames" :key="frame.id"  @onRemoved="remove(frame)" :frame="frame" ></file-page-item>
          </transition-group>
          <div class="frame-order">
            <div class="selected-frames">Selected Frames</div>
            <p class="order-description">Simply drag frames in the order you want</p>
              <draggable-row-container :items="file.frames" class="draggables-frames" >
                <figma-draggable-frame 
                :index="index" 
                :frame="frame"
                :margin="{'bottom':5}" 
                :key="frame.id" :size="40" 
                v-for="(frame,index) in file.frames" 
                class="draggable-frame">
              </figma-draggable-frame>
            </draggable-row-container>
          </div>
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
import FilePageItems from "@/components/Specific/FilePageItems.vue";
import FigmaRadioButton from "@/components/Common/FigmaRadioButton.vue";
import FigmaDraggableFrame from "@/components/Specific/FigmaDraggableFrame.vue";
import DraggableRowContainer from "@/components/Common/DraggableRowContainer.vue";
import FigmaFlash from "@/components/Common/FigmaFlash.vue";

import { createFramePages } from "@/api/index";

import WebSocketManager from "@/js/utils/ws";

const REMOVE_FRAME = "REMOVE_FRAME";

export default {
  components: {
    FigmaButton,
    FigmaInput,
    FilePageItem,
    FilePageItems,
    FigmaRadioButton,
    FilePageLoader,
    GenerationLoader,
    FigmaDraggableFrame,
    DraggableRowContainer,
    FigmaFlash
  },
  data() {
    return {
      file: {
        name: "",
        version: "1.5",
        options: {
          textOutlines: false
        },
        frames: [],
        id: this.$route.params.fileId
      },
      loadingStep: "Loading",
      progressValue: 0,
      generating: false,
      historyStack: []
    };
  },
  computed: {
    filteredFrames() {
      return this.file.frames.filter(frame => frame.enabled);
    }
  },
  methods: {
    generatePdf() {
      if (this.filteredFrames.length == 0) return false;
      if (this.file.name.length == 0) this.file.name = this.file.id;
      this.generating = true;
    },
    onFrameStep(data) {
      this.loadingStep = data.step;
    },
    remove(frame, index) {
      frame.enabled = false;
      this.historyStack.push({
        type: REMOVE_FRAME,
        id: frame.id
      });
    },
    reset() {
      for (let frame of this.file.frames) {
        frame.enabled = true;
      }
    },
    cancel() {
      let lastAction = this.historyStack.pop();

      if (!lastAction) return;

      switch (lastAction.type) {
        case REMOVE_FRAME:
          let frame = this.file.frames.find(frame => frame.id == lastAction.id);
          frame.enabled = true;
          break;
      }
    }
  },
  beforeDestroy() {
    WebSocketManager.off();
  },

  mounted() {
    createFramePages(this.$route.params.fileId).then(frames => {
      this.file.frames = frames;
    });
    WebSocketManager.onFrameStep(this.onFrameStep.bind(this));
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

.export-page {
  margin: 5px; /* 
  position: absolute; */
  z-index: 1;
}

.frame-order {
  margin-left: 20px;
}

.buttons {
  display: flex;
  flex-direction: column;
  margin-left: auto;
}

.buttons-container {
  display: flex;
}

.reset-button {
  margin-right: 10px;
}

.options {
  color: #4b3eff;
  font-weight: 500;
  font-size: 12px;
}

.options-title,
.selected-frames {
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

.frames-list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 1131px;
  justify-content: center;
}

.frames-transition-list-move {
  transition: transform 0.3s;
}

.export-content {
  display: flex;
  margin-top: 38px;
  justify-content: center;
}

.draggables-frames {
  width: 163.68px;
  position: relative;
}

.draggable-frame {
  margin-bottom: 5px;
}

.order-description {
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 11px;
  color: #4b3eff99;
  margin-bottom: 21px;
}

.error-message {
  margin-top: 5px;
  margin-left: auto;
}
</style>
