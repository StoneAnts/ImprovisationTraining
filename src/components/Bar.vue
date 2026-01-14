<template>
  <div class="bar-container">
    <div v-for="value in list" :key="value" class="bar-note">
      <Note :note="value"/>
    </div>
  </div>
</template>

<script>
import Note from './Note.vue';
import { mapState, mapActions, mapWritableState } from 'pinia'
import { useNoteStore } from '../stores/note';
export default {
  name: 'Bar',
  components: {
    Note
  },
  props: {
    notes: {
      type: Object,
      required: true
    }
  },
  computed: {
  // 映射 state
  ...mapWritableState(useNoteStore, ['unitNote'])
  },
  mounted() {
    console.log('this.unitNote: ', this.unitNote);
    this.setList();
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    /**
     * 设置小节内的音符列表,根据拍号来决定单位音符的闭合，例如4/4拍中，1/4音符为单位音符，1个1/4音符可由1个1/4音符闭合而成，
     * 或者2个1/8音符闭合而成，或者4个1/16音符闭合而成，或者2个1/16音符加1个1/8音符闭合而成，依此类推
     */
    setList() {
      let count = 0
      this.notes.note.forEach(item => {
        count += 1/item.type; // 累加音符类型的倒数，计算当前音符占据的单位音符数量
        //console.log('count: ', count);
        //console.log(count >= this.unitNote);
        //console.log('Note in Bar: ', item);
        if(count >= this.unitNote) {
          //console.log('Matched note type in Bar: ', item);
          count = 0;
          item.isClosed = true; // 标记该音符为闭合音符的最后一个
        } else {
          //console.log('Unmatched note type in Bar: ', item);
        }
        this.list.push(item);
      });
      //console.log('Bar note list: ', this.list);
    }
  }
}
</script>

<style scoped>
.bar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
}
.bar-note {
  margin-bottom: 0.25rem;
}
</style>
