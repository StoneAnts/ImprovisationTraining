<template>
<div class="sheet-music">
  <div class="staff">
    <div class="measure">
      <div class="note-group">
        <div class="note">5</div>
        <div class="tie-horizontal"></div>
        <div class="note">6</div>
        <div class="tie-horizontal"></div>
        <div class="note">7</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style>
.sheet-music {
  font-family: 'Arial', sans-serif;
  font-size: 20px;
}

.staff {
  border-bottom: 1px solid #000;
  padding: 20px 0;
}

.measure {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.note-group {
  display: flex;
  align-items: center;
  position: relative;
}

.note {
  width: 20px;
  height: 20px;
  text-align: center;
  background: #000;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  z-index: 2;
}

.tie-horizontal {
  position: absolute;
  top: -8px;
  left: 20px;
  right: 20px;
  height: 15px;
  border: 2px solid #000;
  border-bottom: none;
  border-radius: 50% 50% 0 0;
  z-index: 1;
}

/* 垂直方向的连线 */
.tie-vertical {
  position: absolute;
  left: 50%;
  top: -20px;
  bottom: -20px;
  width: 2px;
  background: #000;
  transform: translateX(-50%);
}

</style>
