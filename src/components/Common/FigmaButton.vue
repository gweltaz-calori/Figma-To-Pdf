<template>
    <a class="button" :class="[theme,{'disabled':disabled},{'round':round}]" v-if="href" href=""><slot></slot></a>
    <router-link :to="to" :class="[theme,{'disabled':disabled},{'round':round}]" class="button" v-else-if="to">
        <slot></slot>
    </router-link>
    <button :class="[theme,{'disabled':disabled},{'round':round}]" class="button" v-else>
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    theme: {
      default: "light"
    },
    href: {},
    to: {},
    disabled: {
      default: false
    },
    round: {
      default: false
    }
  }
};
</script>

<style scoped>
.button {
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 12px;
  text-align: center;
  padding: 9px 18px;
  cursor: pointer;
  text-decoration: none;
}

.round {
  padding: 9px;
}

.light {
  background: -webkit-linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%), #c4c4c4;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  border: solid #867effa1 2px;
}

.dark {
  color: white;
  background: linear-gradient(180deg, #8d87e1 0%, #4b3eff 100%);
}

.disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
