<template>
     <div>
        <slot></slot>
    </div>
</template>

<script>
import { clamp, arrayMove } from "@/js/utils/math";
export default {
  props: ["items"],
  methods: {
    changeIndex(item, to) {
      arrayMove(this.items, item.index, to);
    },
    onItemDrag(item) {
      var index = clamp(
        Math.round(item.y / item.size),
        0,
        this.items.length - 1
      );

      if (index !== item.index) {
        this.changeIndex(item, index);
      }
    }
  },
  mounted() {
    this.$on("on-drag", this.onItemDrag);
  }
};
</script>

<style>
</style>
