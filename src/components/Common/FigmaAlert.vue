<template>
    <div class="alert-container" :class="{'visible':visible}">
        <div class="alert">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    visible: {
      default: true
    }
  }
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  pointer-events: none;
}
.alert {
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.08);
  border-radius: 31px;
  padding: 41px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transform: scale(0.9);
  transition: transform 0.3s, opacity 0.3s;
  pointer-events: none;
}

.visible {
  background-color: rgba(0, 0, 0, 0.2);
}

.visible .alert {
  opacity: 1;
  transform: scale(1);
  pointer-events: all;
}
</style>
