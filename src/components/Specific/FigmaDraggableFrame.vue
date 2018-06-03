<template>
    <draggable-row-item :margin="margin" :size="size" :index="index" class="frame">
        <div class="frame-index">{{index}}</div>
        <div class="frame-name">{{frame.name}}</div>
        <div class="frame-actions">
            <div class="frame-action"> 
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1.37119" height="10.8855" transform="translate(3.9823 1.59933)" fill="white"/>
                <rect width="5.6407" height="1.26481" rx="0.632403" transform="translate(8.68042 10.176) rotate(135)" fill="white"/>
                <rect width="5.6407" height="1.26481" rx="0.632403" transform="translate(0.655762 10.176) scale(1 -1) rotate(-45)" fill="white"/>
                <rect width="5.6407" height="1.26481" rx="0.632403" transform="translate(8.68042 4.6936) scale(-1 1) rotate(-45)" fill="white"/>
                <rect width="5.6407" height="1.26481" rx="0.632403" transform="translate(0.655762 4.6936) rotate(-45)" fill="white"/>
              </svg>
            </div>
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

.frame-actions {
  margin-left: auto;
}
</style>
