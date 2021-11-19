import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        componentId: '',
        count: 0,
        index: -1,
        name: '',
        class: '',
        type1: false,
        type2: false,
        id: -1,
        apply_time: '',
        reason: '',
        veto_reason: '',
        tableData: [],
        name2: '',
        id2: -1,
        apply_time2: '',
        class2: '',
        type3: false,
        type4: false,
        reason2: '',
        veto_reason2: '',
        teacher: '',
        status1: -1,
        status2: -1,
        tableData2: []
    },
    mutations: {
        
    }
  })