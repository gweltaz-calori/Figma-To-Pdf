<template>
    <draggable-row-item :margin="margin" :size="size" :index="index" class="frame">
        <div class="frame-index">{{index}}</div>
        <div class="frame-name">{{frame.name}}</div>
        <div class="frame-actions">
            <div class="frame-action"></div>
        </div>
    </draggable-row-item>
</template>

<script>
import DraggableRowItem from "@/components/Common/DraggableRowItem.vue";

export default {
  props: ["margin", "size", "index", "frame"],
  components: {
    DraggableRowItem
  }
};
</script>

<style scoped>
.frame {
  width: 163.68px;
  height: 35.87px;
  display: flex;
  align-items: center;
  padding: 0 10px;

  background: linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%);
  border-radius: 8px;
}

.frame-index {
  width: 20.38px;
  height: 20.38px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Exo;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 10px;
  border-radius: 50%;

  color: #4b3eff;

  background: #ffffff;
}

.frame-name {
  font-family: Exo;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 10px;
  margin-left: 8px;

  color: #ffffff;
}
</style>
