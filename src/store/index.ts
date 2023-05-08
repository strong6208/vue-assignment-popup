import { createStore } from "vuex";

type ActionType = {
	id: number;
	title: string;
	icon: string;
}

type Action = {
	title: string;
	type: number;
	icon: string;
	data: string[];
	status: boolean;
	color: string;
}

interface State {
	listData: object,
	num: number,
	boardType: 'list' | 'edit' | 'create',
	editingIndex: number,
	actionTypes: {
		nativeActions: ActionType[],
		others: ActionType[]
	},
	actions: Action[];
}

export default createStore<State>({
	state: {
		listData: { 1: 10 },
		num: 10,
		boardType: 'list',
		editingIndex: 0,
		actionTypes: {
			nativeActions: [
				{ id: 1, title: 'Tag customer', icon: 'fa-tag' },
				{ id: 2, title: 'Tag order', icon: 'fa-tags' },
				{ id: 3, title: 'Send email notification', icon: 'fa-inbox' },
				{ id: 4, title: 'Select digital product', icon: 'fa-note-sticky' },
				{ id: 5, title: 'Make HTTPS request', icon: 'fa-shield' }
			],
			others: [
				{ id: 6, title: 'Send data to Google Sheet', icon: 'fa-sheet-plastic' }
			]
		},
		actions: []
	},
	mutations: {
		setData(state, value) {
			state.listData = value
		},
		addNum(state) {
			state.num = state.num + 10
		},
		addAction(state: State, value: Action) {
			const { actions } = state
			const clonedActions: any[] = [...actions]
			clonedActions.push(value)

			state.actions = clonedActions
		},
		setBoardType(state, value) {
			state.boardType = value
		},
		setEditingIndex(state, value) {
			state.editingIndex = value
		},
		updateAction(state: State, value: any) {
			const { actions, editingIndex } = state
			const clonedActions = [...actions]
			clonedActions[editingIndex].data = value

			state.actions = clonedActions
		},
		deleteAction(state: State, value: number) {
			const { actions } = state
			const clonedActions = [...actions]

			clonedActions.splice(value, 1)
			state.actions = clonedActions
		},
		setActionStatus(state: State, value: boolean) {
			const { actions, editingIndex } = state
			const clonedActions = [...actions]

			clonedActions[editingIndex].status = value
			state.actions = clonedActions
		}
	},
	actions: {
		setData(context, value) {
			context.commit('setData', value)
		},
		addAction(context, value) {
			context.commit('addAction', value)
		},
		setBoardType(context, value) {
			context.commit('setBoardType', value)
		},
		setEditingIndex(context, value) {
			context.commit('setEditingIndex', value)
		},
		updateAction(context, value) {
			context.commit('updateAction', value)
		},
		deleteAction(context, value) {
			context.commit('deleteAction', value)
		},
		setActionStatus(context, value) {
			context.commit('setActionStatus', value)
		}
	},
	modules: {}
});
