import { createStore } from "vuex"
import VuexPersistence from "vuex-persist"

export const store = createStore({
    state: {
        colorHistory: [],
        presetColors: [
            '#FFFFFF', '#000000', '#64748B', '#6B7280', '#71717A', '#737373', '#78716C', '#EF4444', '#F97316',
            '#F59E0B', '#EAB308', '#84CC16', '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6',
            '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E'
        ]
    },

    mutations: {
        ADD_COLOR_TO_HISTORY(state, payload) {
            state.colorHistory.unshift(payload)
        },

        REMOVE_LAST_COLOR(state) {
            state.colorHistory.pop()
        }
    },

    actions: {
        addColorToHistory({ commit, state }, data) {
            if (state.colorHistory.length >= 8) {
                commit('REMOVE_LAST_COLOR')
                commit('ADD_COLOR_TO_HISTORY', data)
            } else {
                commit('ADD_COLOR_TO_HISTORY', data)
            }
        }
    },

    plugins: [new VuexPersistence().plugin]
})