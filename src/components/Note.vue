<template>
  <div class="note" :style="cssVars">
    <div v-if="note.type == 1" class="note-container">
      <div class="note-whole-note" :class="pitchClass">{{ note.value }}</div>
      <div class="note-whole-note">-</div>
      <div class="note-whole-note">-</div>
      <div class="note-whole-note">-</div>
    </div>
    <div v-else-if="note.type == 2" class="note-container">
      <div class="note-half-note" :class="pitchClass">{{ note.value }}</div>
      <div class="note-half-note">-</div>
    </div>
    <div v-else class="note-value" :class="[lineClass, pitchClass]">
      {{ note.value }}
    </div>
  </div>
</template>

<script>
import { NOTE_TYPE, PITCH } from '../utlis/constants';
export default {
  name: 'Note',
  components: {},
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log('Note component created.');
    console.log('Note prop: ', this.note);
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    'note.type': {
      immediate: true,
      handler(newVal) {
        // 根据类型设置显示的值
        switch (newVal) {
          case NOTE_TYPE.WHOLE_NOTE:
            //this.value = '𝅝';
            //console.log('Whole Note detected');
            //const noteBar = document.querySelector('.bar-note');
            //console.log(noteBar);
            //if (noteBar) {

            //  const newDiv = document.createElement('div')
            //  newDiv.className = 'bar-note'
            //  newDiv.textContent = '-'
            //  noteBar.parentNode.insertBefore(newDiv, noteBar.nextSibling)
            //}
            break;
          case NOTE_TYPE.HALF_NOTE:
            //this.value = '𝅗𝅥';
            break;
          case NOTE_TYPE.QUARTER_NOTE:
            //this.value = '𝅘𝅥';
            break;
          case NOTE_TYPE.EIGHTH_NOTE:
            //this.value = '𝅘𝅥𝅮';
            break;
          case NOTE_TYPE.SIXTEENTH_NOTE:
            //this.value = '𝅘𝅥𝅯';
            break;
          default:
            this.value = '';
        }
      }
    }
  },
  computed: {
    lineClass() {
      console.log(`lines-${this.note.type}`);
      return `lines-${this.note.type}`
    },
    pitchClass() {
      switch(this.note.pitch) {
        case PITCH.DOUBLE_LOW:
          return 'pitch-double-low';
        case PITCH.LOW:
          return 'pitch-low';
        case PITCH.MIDDLE:
          return '';
        case PITCH.HIGH:
          return 'pitch-high';
        case PITCH.DOUBLE_HIGH:
          return 'pitch-double-high';
        default:
          return '';
      }
    },
    cssVars() {
      // 如果该音符是闭合音符的最后一个，则添加右侧间距
      if(this.note.isClosed === true) {
        return {
          'padding-right': '10px'
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@use "sass:list";

.note{
  //padding: 0.5rem;
  //border: 1px solid var(--color-border);
  //text-align: center;
}
.note-value {
  font-size: 1.25rem;
  font-weight: bold;
}

.note-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.note-whole-note,
.note-half-note {
  padding: 0 10px 0 10px;
  font-size: 1.25rem;
  font-weight: bold;
}

.pitch-double-low,
.pitch-low,
.pitch-high,
.pitch-double-high {
  position: relative;
  display: inline-block;
}

.pitch-double-low::before,
.pitch-double-low::after,
.pitch-high::before,
.pitch-low::after,
.pitch-double-high::before,
.pitch-double-high::after
 {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  background-color: #333;
  border-radius: 50%;
}

.pitch-double-low::before {
  bottom: 0px; /* 第一个点位置 */
}

.pitch-double-low::after {
  bottom: -4px; /* 第二个点位置 */
}

.pitch-high::before {
  top: 0px; /* 上方的点位置 */
}

.pitch-low::after {
  bottom: 0px; /* 下方的点位置 */
}

.pitch-double-high::before {
  top: 1px; /* 第一个点 */
}

.pitch-double-high::after {
  top: -4px; /* 第二个点在第一个点上方 */
}

// SCSS 版本

/**
$i: 当前是第几条线（从 1 开始计数）

$height: 单条下划线的粗细（如 2px）

$gap: 下划线之间的间隙（如 4px）

$position-from-bottom: 从底部到当前线下边缘的距离
**/
@mixin multi-underline($count: 3, $height: 2px, $gap: 4px, $color: #333) {
  $background-list: ();

  @for $i from 1 through $count {
    $position-from-bottom: ($i - 1) * ($height + $gap) + 6px;  //从底部到当前线下边缘的距离
    $line-start: calc(100% - #{$position-from-bottom + $height});
    $line-end: calc(100% - #{$position-from-bottom});

    $gradient: linear-gradient(
      to bottom, // 方向
      transparent, // 0% 位置的颜色
      transparent $line-start, // $line-start 位置的颜色
      $color $line-start, // $line-start 位置的颜色（硬边过渡）
      $color $line-end, // $line-end 位置的颜色
      transparent $line-end // $line-end 位置的颜色（硬边过渡）
    );

    $background-list: list.append($background-list, $gradient, $separator: comma);
  }

  background-image: $background-list;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-bottom: ($height * $count) + ($gap * ($count - 1));
  display: inline-block;
}

// 使用
.lines-8 { @include multi-underline(1, 1px, 1px, #333); }
.lines-16 { @include multi-underline(2, 1px, 1px, #333); }
.lines-32 { @include multi-underline(3, 1px, 1px, #333); }
.lines-64 { @include multi-underline(4, 1px, 1px, #333); }
</style>
