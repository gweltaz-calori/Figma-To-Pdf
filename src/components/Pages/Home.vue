<template>
    <div class="home">
        <figma-title color="white">Figma pdf</figma-title>
        <p class="description">The easiest way to convert figma files into pdf</p>
        <figma-button-input :valid="fileValid" @clearError="fileValid = true" v-model="figmaFileUrl" @onButtonClicked="validateFigmaUrl" class="file-input" placeholder="File url"></figma-button-input>
        <!-- <span>Or <a href="/api/auth">login</a> using Oauth</span> -->
        <figma-alert :visible="alertVisible">
          <figma-alert-header>
            <img src="../../assets/icons/info.svg" alt="">
          </figma-alert-header>
          <figma-alert-content>
            <p class="mask-helper">If Some of your frames have masks, make sure you checked “Use Shape Outline” inside Figma</p>
          </figma-alert-content>
          <figma-alert-actions>
            <figma-button @click.native="userReady">I'm ready</figma-button>
          </figma-alert-actions>
        </figma-alert>
    </div>
</template>
<script>
import FigmaButtonInput from "@/components/Common/FigmaButtonInput.vue";
import FigmaButton from "@/components/Common/FigmaButton.vue";
import FigmaTitle from "@/components/Common/FigmaTitle.vue";
import FigmaAlert from "@/components/Common/FigmaAlert.vue";
import FigmaAlertActions from "@/components/Common/FigmaAlertActions.vue";
import FigmaAlertContent from "@/components/Common/FigmaAlertContent.vue";
import FigmaAlertHeader from "@/components/Common/FigmaAlertHeader.vue";

const FIGMA_URL_REGEX = /https:\/\/([w\.-]+.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/;

export default {
  components: {
    FigmaButtonInput,
    FigmaButton,
    FigmaTitle,
    FigmaAlert,
    FigmaAlertActions,
    FigmaAlertContent,
    FigmaAlertHeader
  },
  data() {
    return {
      figmaFileUrl: "",
      alertVisible: false,
      fileId: "",
      fileValid: true
    };
  },
  methods: {
    async validateFigmaUrl() {
      let matches = this.figmaFileUrl.match(FIGMA_URL_REGEX);
      if (!matches) {
        //todo show error component
        this.fileValid = false;
        return;
      }
      this.fileId = matches[3];
      this.alertVisible = true;
    },
    userReady() {
      this.$router.push({
        name: "organize",
        params: {
          fileId: this.fileId
        }
      });
    }
  }
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

  background: linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%);
}

.description {
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 13px;
  text-align: center;

  color: rgba(255, 255, 255, 0.57);
}

.file-input {
  margin-top: 37px;
}

.mask-helper {
  width: 280px;

  font-family: Exo;
  font-style: normal;
  font-weight: 500;

  line-height: normal;
  font-size: 12px;

  color: #2d1bff;
}

.mask-icon {
  margin-right: 10px;
}
</style>
