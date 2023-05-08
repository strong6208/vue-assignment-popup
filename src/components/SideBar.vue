<template>
  <div class="sidebar">
    <div v-if="sidebarStatus === 'action_list'" class="sidebar__title">
      <span class="sidebar__title__logo action">
        <font-awesome-icon icon="fa-icon fa-bolt" />Action
      </span>
      <span class="sidebar__title__menu">
        <font-awesome-icon icon="fa-solid fa-ellipsis" size="lg" />
      </span>
    </div>

    <div v-if="sidebarStatus === 'add_action_select'" class="sidebar__title">
      <span
        style="cursor: pointer"
        class="sidebar__title__logo"
        @click="sidebarStatus = 'action_list'; selectedTypeId = 0; searchKey = ''"
      >
        <font-awesome-icon icon="fa-icon fa-chevron-left" style="margin-right: 10px" /> Add actions
      </span>
    </div>

    <div v-if="sidebarStatus === 'add_action'" class="sidebar__title">
      <span style="cursor: pointer" @click="sidebarStatus = 'action_list'">
        <font-awesome-icon
          icon="fa-icon fa-chevron-left"
          style="margin-right: 10px"
        />Addactions</span
      >
    </div>

    <div v-if="sidebarStatus === 'action_edit'" class="sidebar__title">
      <span
        style="cursor: pointer"
        @click="sidebarStatus = 'action_list'"
        class="sidebar__title__logo"
      >
        <font-awesome-icon icon="fa-icon fa-chevron-left" style="margin-right: 10px" />{{
          editingAction.title
        }}</span
      >

      <v-menu location="left bottom">
        <template v-slot:activator="{ props }">
          <span class="logo-hamburger cursor-pointer" v-bind="props"
            ><font-awesome-icon icon="fa-solid fa-ellipsis"
          /></span>
        </template>
        <v-list>
          <v-list-item value="1" @click="toggleActionStatus">
            <v-list-item-title
              ><font-awesome-icon
                style="margin-right: 14px"
                :icon="`fa-solid${editingAction.status ? ' fa-toggle-on' : ' fa-toggle-off'}`"
              />{{
                `Make
                            ${editingAction.status ? 'inactive' : 'active'}`
              }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item value="2">
            <v-list-item-title @click="deleteAction" style="color: #ff2d55"
              ><font-awesome-icon
                style="margin-right: 14px"
                icon="fa-solid fa-trash"
                color="#FF2D55"
              />Delete action</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="sidebar__content">
      <div v-if="sidebarStatus === 'action_list'" class="sidebar__content__header">
        <h4>Assigned actions</h4>
        <small
          >The selected actions will run in the background when the user journey gets to this
          elements</small
        >
      </div>

      <div v-if="sidebarStatus === 'action_list'" class="sidebar__content__header">
        <div
          v-for="(action, index) in registeredActions"
          :class="`action-button ${action.status ? '' : ' action-status-inactive'}`"
          @click="editAction(index)"
          v-bind:key="index"
        >
          <label>
            <font-awesome-icon :icon="`fa-solid ${action.icon}`" />
            <span>{{ action.title }}</span>
          </label>
          <div v-if="!action.status" class="inactive-badge">
            <font-awesome-icon icon="fa-solid fa-circle" />Inactive
          </div>
          <div v-else></div>
        </div>
        <div class="action-button add-action" @click="sidebarStatus = 'add_action_select'">
          <span>Add actions</span>
          <font-awesome-icon icon="fa-solid fa-plus" />
        </div>
      </div>

      <div v-if="sidebarStatus === 'add_action_select'" class="sidebar__content__menu">
        <div class="sidebar__content__menu__search">
          <font-awesome-icon icon="fa-solid fa-search" />
          <input v-model="searchKey" placeholder="Search actions..." />
        </div>
        <div class="spacer"></div>
        <div v-if="!searchKey.length" class="">
          <p class="tag-group">Native Popup actions</p>
          <div
            v-for="(action, key) in nativePopupActions"
            :class="`sidebar__content__menu__item ${
              action.id === selectedTypeId ? ' action-type-selected' : ''
            }`"
            v-bind:key="key"
          >
            <label :for="action.id">
              <font-awesome-icon :icon="`fa-solid ${action.icon}`" />
              <span>{{ action.title }}</span>
            </label>
            <input type="checkbox" name="" :id="action.id" @click="typeSelect(action.id)" />
          </div>
          <p class="tag-group">Integration with other apps</p>
          <div
            v-for="(action, key) in otherApps"
            :class="`sidebar__content__menu__item ${
              action.id === selectedTypeId ? ' action-type-selected' : ''
            }`"
            v-bind:key="key"
          >
            <label :for="action.id">
              <font-awesome-icon :icon="`fa-solid ${action.icon}`" />
              <span>{{ action.title }}</span>
            </label>
            <input type="checkbox" name="" :id="action.id" @click="typeSelect(action.id)" />
          </div>
        </div>

        <div v-else>
          <div
            v-for="(action, key) in filteredActions"
            :class="`sidebar__content__menu__item ${
              action.id === selectedTypeId ? ' action-type-selected' : ''
            }`"
            v-bind:key="key"
          >
            <label :for="action.id">
              <font-awesome-icon :icon="`fa-solid ${action.icon}`" />
              <span>{{ action.title }}</span>
            </label>
            <input type="checkbox" name="" :id="action.id" @click="typeSelect(action.id)" />
          </div>
        </div>
      </div>

      <div v-if="sidebarStatus === 'action_edit'">
        <div v-if="editingAction.type === 1">
          <EditTagCustomer :action="editingAction" :onChange="handleChange" />
        </div>
        <div v-if="editingAction.type === 5">
          <EditHttpRequest :action="editingAction" :onChange="handleChange" />
        </div>
      </div>

      <div v-if="selectedTypeId != 0" class="sidebar__content__footer">
        <v-btn @click="cancelSelection">Cancel</v-btn>
        <v-btn color="info" class="text-subtitle-1" @click="addAction">Confirm</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import EditHttpRequest from './EditHttpRequest.vue'
import EditTagCustomer from './EditTagCustomer.vue'

export default {
  setup() {
    const store = useStore()
    const sidebarStatus = ref('action_list')
    const currentActionId = ref(null)
    const searchKey = ref('')
    const selectedTypeId = ref(0)
    let multSelectedTypeId: number[] = []
    const nativePopupActions = computed(() => store.state.actionTypes.nativeActions).value
    const otherApps = computed(() => store.state.actionTypes.others).value
    const allActions = computed(() => nativePopupActions.concat(otherApps)).value
    const registeredActions = computed(() => store.state.actions)
    const editingIndex = computed(() => store.state.editingIndex)
    const editingAction = ref(registeredActions.value[0])
    const filteredActions = computed(() => {
      return allActions.filter((action: any) =>
        action.title.toLowerCase().includes(searchKey.value.toLowerCase())
      )
    })

    watch(editingIndex, (cur) => {
      editingAction.value = registeredActions.value[cur]
    })

    watch(registeredActions, (cur) => {
      editingAction.value = cur[editingIndex.value]
    })

    const handleChange = (data: any) => {
      store.dispatch('updateAction', data)
    }

    const addAction = () => {
      multSelectedTypeId.map((res) => {
        const { title, icon } = allActions.find((action: any) => action.id === res)
        const data = res !== 5 ? [] : { endpoint: '', method: '', headers: [], body: null }
        store.dispatch('addAction', { title, icon, type: res, status: true, data })
      })
      selectedTypeId.value = 0
      multSelectedTypeId = []
      sidebarStatus.value = 'action_list'
      searchKey.value = ''
    }

    const cancelSelection = () => {
      selectedTypeId.value = 0
      multSelectedTypeId = []
      searchKey.value = ''
    }

    const typeSelect = (id: number) => {
      const index = multSelectedTypeId.indexOf(id)
      index > -1 ? multSelectedTypeId.splice(index, 1) : multSelectedTypeId.push(id)
      selectedTypeId.value = id
    }

    const editAction = (index: number) => {
      sidebarStatus.value = 'action_edit'
      store.dispatch('setEditingIndex', index)
    }

    const deleteAction = () => {
      store.dispatch('deleteAction', editingIndex.value)
      sidebarStatus.value = 'action_list'
    }

    const toggleActionStatus = () => {
      store.dispatch('setActionStatus', !editingAction.value.status)
      sidebarStatus.value = 'action_list'
    }

    watch(sidebarStatus, (curr, prev) => {
      if (curr === 'action_list') store.dispatch('setBoardType', 'list')
      else if (curr === 'add_action_select') store.dispatch('setBoardType', 'create')
      else if (curr === 'action_edit') store.dispatch('setBoardType', 'edit')
    })

    return {
      editAction,
      addAction,
      cancelSelection,
      typeSelect,
      handleChange,
      deleteAction,
      toggleActionStatus,
      editingAction,
      selectedTypeId,
      filteredActions,
      sidebarStatus,
      currentActionId,
      nativePopupActions,
      otherApps,
      searchKey,
      registeredActions
    }
  },
  components: {
    EditHttpRequest,
    EditTagCustomer
  }
}
</script>

<style lang="scss"></style>
