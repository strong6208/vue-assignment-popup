<template>
  <div :class="`${isEmpty ? `http-request-item__header` : ` action-board__item__title`}`">
    <font-awesome-icon :icon="`fa-solid ${action.icon}`" />
    <span>{{ action.title }}</span>
  </div>

  <div v-if="isEmpty" class="http-request-item">
    <p class="http-request-item__title">Request endpoint</p>
    <p>{{ action.data.endpoint }}</p>
  </div>

  <div v-if="isEmpty" class="http-request-item">
    <p class="http-request-item__title">Request method</p>
    <p>{{ action.data.method }}</p>
  </div>

  <div v-if="isEmpty" class="http-request-item">
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in Object.keys(action.data.headers)" v-bind:key="key">
          <td>{{ key }}</td>
          <td>{{ action.data.headers[key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="isEmpty" class="http-request-item">
    <p class="http-request-item__title">Request body</p>
    <textarea readonly rows="8">{{
      action.data.body ? JSON.stringify(action.data.body, null, 4) : ''
    }}</textarea>
  </div>
</template>

<script lang="ts">
import { toRef, computed } from 'vue'

export default {
  props: {
    action: Object
  },
  setup(props: any) {
    const action = toRef(props, 'action')
    const isEmpty = computed(() =>
      Object.keys(action.value.data).reduce(
        (prev, key) =>
          (key === 'headers' ? action.value.data[key].length : !!action.value.data[key]) || prev,
        false
      )
    )
    // eslint-disable-next-line vue/no-dupe-keys
    return { action, isEmpty }
  }
}
</script>
