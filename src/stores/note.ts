import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNoteStore = defineStore('note', () => {
  const unitNote = ref(4) // 单位音符，默认为1/4音符
  return { unitNote }
})
