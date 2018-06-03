<template>
    <div class="message" :class="[{'error':status == 'error'},{'warning':status == 'error'}]"><slot></slot></div>
</template>
<script>
export default {
  props: ["status"]
};
</script>

<style scoped>
.message {
  color: #ff4d4d;
  font-weight: 600;
  font-size: 12px;
}
</style>
