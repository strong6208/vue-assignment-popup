<template>
  <div :class="`${isEmpty ? ` action-board__item__title` : `action-board__item__title`}`">
    <font-awesome-icon :icon="`fa-solid ${action.icon}`" />
    <span>{{ action.title }}</span>
  </div>
  <div v-for="(tag, key) in action.data" class="action-board__item__tags" v-bind:key="key">
    <font-awesome-icon icon="fa-solid fa-circle" :style="{color: tag.color}" />
    <span>{{ tag.data }}</span>
  </div>
</template>

<script lang="ts">
import { toRef, computed } from 'vue'

export default {
  props: {
    action: Object,
    defualt: {}
  },
  setup(props: any) {
    const action = toRef(props, 'action')
    const isEmpty = computed(() => !!action.value.data.length)

    // eslint-disable-next-line vue/no-dupe-keys
    return { action, isEmpty }
  }
}
</script>

<style lang="scss"></style>
