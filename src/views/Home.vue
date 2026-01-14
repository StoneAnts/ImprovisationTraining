<template>
  <div class="home-bar-container">
    <div v-for="value in jsonData.bar" :key="value">
      <div class="home-bar">
        <Bar :notes="value"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import Bar from '../components/Bar.vue';
import { useNoteStore } from '../stores/note';
import json from '../testdata/test.json';
export default {
  name: 'Home',
  components: {
    Bar
  },
  computed: {
    // 映射 state
    ...mapWritableState(useNoteStore, ['unitNote'])
  },
  data() {
    return {
      jsonData: json
    }
  },
  created() {
    console.log('Home component created.');
    this.jsonData = json;
    console.log(this.jsonData);
    this.unitNote = 1/parseFloat(this.jsonData.meter.split('/')[1]); // 根据拍号设置单位音符，例如4/4拍中，单位音符为1/4音符，即0.25
    console.log('unitNote: ', this.unitNote);
  },
  mounted() {
    console.log('Home component mounted.');
  }
}
</script>

<style>
.home-bar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.home-bar {

}

</style>
