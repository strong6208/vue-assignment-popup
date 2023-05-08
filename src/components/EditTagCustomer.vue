<template>
  <div class="edit-tag">
    <div class="edit-tag__input">
      <font-awesome-icon icon="fa-solid fa-plus" />
      <input v-model="newTag" placeholder="Add tags..." v-on:keyup.enter="addTag" />
    </div>
    <div class="mb-5"></div>
    <div v-for="(tag, key) in action.data" class="edit-tag__item" v-bind:key="key">
      <label>
        <font-awesome-icon icon="fa-solid fa-circle" :style="{color: tag.color}" />
        <span>{{ tag.data }}</span>
      </label>
      <font-awesome-icon class="cursor-pointer" icon="fa-solid fa-trash" style="color: #9DA8B4;" @click="deleteItem(key)"  />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRef } from 'vue'

export default {
  props: {
    action: Object,
    onChange: Function
  },
  setup(props: any) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const onChange = props.onChange
    const action = toRef(props, 'action')
    const newTag = ref('')
    
    const addTag = () => {
      if (!newTag.value) return
      const color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
      const currentTags = action.value.data
      const data = {
        data: newTag.value,
        color: color
      }
      currentTags.push(data)
      onChange(currentTags)
      newTag.value = ''
    }

    const deleteItem = (key: number) => {
      const newTag = action.value.data
      newTag.splice(key, 1);
      onChange(newTag)
    }

    // eslint-disable-next-line vue/no-dupe-keys
    return { action, newTag, addTag, deleteItem }
  }
}
</script>

<style lang="scss"></style>
