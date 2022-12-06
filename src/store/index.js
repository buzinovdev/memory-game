import {createStore} from 'vuex'

export default createStore({
  state: {
    difficultyLevel: [
      {title: 'Легкий', type: 'easy', desc:'ограничения отсутствуют', num: 1, health: null},
      {title: 'Средний', type: 'average', desc:'допускается 10 ошибок', num: 2, health: 10},
      {title: 'Сложный', type: 'difficult', desc:'допускается 5 ошибок', num: 3, health: 5}
    ],
    bestGame: JSON.parse(localStorage.getItem('bestScore')) || {level:'', score: 0},
    showInstruction: false,
    game: {
      isPlaying: localStorage.getItem('isPlaying') || false,
      level: localStorage.getItem('currentLevel') || '',
      score: 0,
      health: null
    }
  },
  getters: {
    bestGame: state => state.bestGame,
    showInstruction: state => state.showInstruction,
    isPlaying: state => state.game.isPlaying,
    currentGameLevel: state => state.game.level,
    currentGameScore: state => state.game.score
  },
  actions: {
    instruction({commit}, bool) {
      commit('instruction', bool)
    },
    isPlaying({commit}, bool) {
      commit('isPlaying', bool)
    },
    setGameLevel({commit}, level) {
      commit('setGameLevel', level)
    },
    setGameScore({commit}, score) {
      commit('setGameScore', score)
    },
    saveGameScore({commit}, score) {
      commit('saveGameScore', score)
    }
  },
  mutations: {
    instruction(state, bool) {
      state.showInstruction = bool
    },
    isPlaying(state, bool) {
      state.game.isPlaying = bool
      localStorage.setItem('isPlaying', true)
    },
    setGameLevel(state, level) {
      state.game.level = level
      localStorage.setItem('currentLevel', level)
    },
    setGameScore(state, score) {
      state.game.score = score
    },
    saveGameScore(state, score) {
      state.bestGame = score
      localStorage.setItem('bestScore', JSON.stringify(score))
    }
  },
  modules: {}
})
