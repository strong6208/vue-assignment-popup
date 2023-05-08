<template>
  <div class="edit-http-request">
    <p class="edit-http-request__title">Request endpoint</p>
    <v-text-field
      v-model="endpoint"
      density="compact"
      variant="solo"
      label="Enter endpoint..."
      single-line
      hide-details
    ></v-text-field>
    
    <p class="edit-http-request__title">Request method</p>
    <v-select
      v-model="method"
      label="Choose method..."
      single-line
      density="compact"
      :items="['Post', 'Put', 'Delete', 'Patch']"
    >
    </v-select>
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in Object.keys(headers)" v-bind:key="key">
          <td>{{ key }}</td>
          <td>{{ headers[key] }}</td>
          <td style="padding: 0 10px">
            <font-awesome-icon
              @click="removeHeader(key)"
              class="cursor-pointer"
              icon="fa-solid fa-trash"
              style="color: #9da8b4"
            />
          </td>
        </tr>
        <tr>
          <td>
            <v-text-field
              v-model="newKey"
              density="compact"
              variant="solo"
              label="Enter key..."
              single-line
              hide-details
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="newValue"
              density="compact"
              variant="solo"
              label="Enter value..."
              single-line
              hide-details
            ></v-text-field>
          </td>
          <td style="padding: 0 10px">
            <font-awesome-icon
              @click="addHeader"
              class="cursor-pointer"
              icon="fa-solid fa-plus"
              style="color: #0052ff"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mb-5"></div>
    <p class="text-gray">Request body</p>
    <v-textarea v-model="body"></v-textarea>
    <p v-if="invalidFormat" class="text-warning">Invalid JSON format</p>
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import { computed } from 'vue'
import { ref, toRef } from 'vue'

export default {
  props: {
    action: Object,
    onChange: Function
  },
  setup(props: any) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const onChange = props.onChange
    const action = toRef(props, 'action').value
    const endpoint = ref(action.data.endpoint)
    const method = ref(action.data.method)
    const headers = ref(action.data.headers)
    const body = ref(action.data.body ? JSON.stringify(action.data.body, null, 4) : '')
    const invalidFormat = ref(false)
    const parsedBody = ref(body.value ? JSON.parse(body.value) : null)
    const newKey = ref('')
    const newValue = ref('')

    const isJsonString = (str: string) => {
      try {
        JSON.parse(str)
      } catch {
        return false
      }

      return true
    }

    const changes = computed(() => {
      return {
        endpoint: endpoint.value,
        method: method.value,
        headers: headers.value,
        body: parsedBody.value
      }
    })

    watch(body, (cur) => {
      if (isJsonString(cur)) {
        invalidFormat.value = false
        parsedBody.value = JSON.parse(cur)
      } else {
        invalidFormat.value = true
        parsedBody.value = action.data.body
      }
    })

    watch(changes, (cur) => {
      onChange(cur)
    })

    const addHeader = () => {
      if (!newKey.value) return
      !newValue.value ? (newValue.value = '---') : newValue.value
      const newHeaders = { ...headers.value }
      newHeaders[newKey.value] = newValue.value

      headers.value = newHeaders
      newKey.value = ''
      newValue.value = ''
    }

    const removeHeader = (key: string) => {
      const newHeaders = { ...headers.value }

      delete newHeaders[key]
      headers.value = newHeaders
    }

    return {
      addHeader,
      removeHeader,
      body,
      endpoint,
      method,
      headers,
      invalidFormat,
      newKey,
      newValue
    }
  }
}
</script>

<style lang="scss"></style>
