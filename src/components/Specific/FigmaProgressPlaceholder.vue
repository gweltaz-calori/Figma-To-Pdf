<template>
    <div class="progress">
        <transition name="fade">
          <div v-show="visible" ref="progressContent" class="progress-content" :style="{width:100+'%'}" ></div>
        </transition>
        <div class="progress-background"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    this.visible = true;
  }
};
</script>

<style scoped>
.progress {
  height: 7px;
  border-radius: 17px;
  width: 222px;
  overflow: hidden;
  position: relative;
}

.progress-background {
  background: rgba(141, 135, 225, 0.36);
  border-radius: 17px;
  width: 100%;
  height: 100%;
}

.progress-content {
  background: linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%);
  border-radius: 17px;
  width: 50%;
  height: 100%;
  position: absolute;
  transform: translateX(0%);
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 120s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.fade-enter,
.fade-leave-to {
  transform: translateX(-100%);
}
</style>
