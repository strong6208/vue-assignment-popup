<template>
  <div class="action-board">
    <div v-if="boardType === 'list' && registeredActions.length">
      <div v-for="(action, key) in registeredActions" class="action-board__item" v-bind:key="key">
        <TagCustomerView v-if="action.type === 1" :action="action" />
        <TagCustomerView v-if="action.type === 2" :action="action" />
        <TagCustomerView v-if="action.type === 3" :action="action" />
        <TagCustomerView v-if="action.type === 4" :action="action" />
        <HttpRequestView v-if="action.type === 5" :action="action" />
        <TagCustomerView v-if="action.type === 6" :action="action" />
      </div>
    </div>
    <div v-else-if="boardType === 'edit'" class="action-board__item">
      <TagCustomerView v-if="editingAction.type === 1" :action="editingAction" />
      <HttpRequestView v-if="editingAction.type === 5" :action="editingAction" />
    </div>
    <div v-else class="action-board__placeholder">Your actions will appear here</div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import HttpRequestView from './HttpRequestView.vue'
import TagCustomerView from './TagCustomerView.vue'

export default {
  setup() {
    const store = useStore()
    const boardType = computed(() => store.state.boardType)
    const editingIndex = computed(() => store.state.editingIndex)
    const registeredActions = computed(() => store.state.actions)
    const editingAction = computed(() => registeredActions.value[editingIndex.value])

    return { boardType, registeredActions, editingIndex, editingAction }
  },
  components: { HttpRequestView, TagCustomerView }
}
</script>
