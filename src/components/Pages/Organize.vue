<template>
  <div class="creator">
      <figma-input placeholder="File name" class="file-title"></figma-input>
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
            <figma-button theme="dark">create pdf</figma-button>
          </div>
        </div>
        <div class="export-pages">
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
          <file-page-item class="export-page"></file-page-item>
        </div>
      </div>
  </div>
</template>

<script>
import FigmaButton from "@/components/Common/FigmaButton.vue";
import FigmaInput from "@/components/Common/FigmaInput.vue";
import FilePageItem from "@/components/Specific/FilePageItem.vue";
import FigmaProgress from "@/components/Common/FigmaProgress.vue";
import FigmaRadioButton from "@/components/Common/FigmaRadioButton.vue";
export default {
  data() {
    return {
      file: {
        options: {
          textOutlines: false
        },
        pages: []
      }
    };
  },
  components: {
    FigmaButton,
    FigmaInput,
    FilePageItem,
    FigmaProgress,
    FigmaRadioButton
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
