<template>
    <div class="alert-content">
        <slot></slot>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.alert-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
}
</style>
