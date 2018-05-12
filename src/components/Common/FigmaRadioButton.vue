<template>
  <div class="radio-content">
      <div class="radio" @click="toggleRadio">
        <div class="radio-inner">
            <svg v-if="active" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1.44L2.25 3.6L6 0" transform="translate(0.800842 0.700012)" stroke="url(#paint0_linear)" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                <linearGradient id="paint0_linear" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6) scale(6 3.6) rotate(90)">
                <stop stop-color="#8D87E1"/>
                <stop offset="1" stop-color="#4B3EFF"/>
                </linearGradient>
                </defs>
            </svg>
        </div>
    </div>
    <span class="radio-label">{{label}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: false
    };
  },
  props: {
    label: {},
    value: {}
  },
  methods: {
    toggleRadio() {
      this.active = !this.active;
      this.$emit("input", this.active);
    }
  }
};
</script>
<style scoped>
.radio {
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background: linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-inner {
  border-radius: 50%;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  margin-left: 1px;
  height: 8px;
}

.radio-content {
  display: flex;
  align-items: center;
}

.radio-label {
  margin-left: 5px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 12px;
  color: #4b3eff;
}
</style>

