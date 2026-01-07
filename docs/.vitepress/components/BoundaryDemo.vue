<template>
  <div class="demo-card">
    <h3>📏 边界值分析演示 (1 - 10)</h3>
    
    <div class="input-area">
      输入测试值: <input type="number" v-model.number="inputValue" />
    </div>

    <!-- 可视化数轴 -->
    <div class="ruler-container">
      <!-- 无效区域左 -->
      <div class="zone invalid">无效 (< 1)</div>
      
      <!-- 边界点 1 -->
      <div class="point boundary" :class="{ active: inputValue === 1 }">1</div>
      
      <!-- 有效区域 -->
      <div class="zone valid">
        <div class="pointer" :style="{ left: pointerPosition + '%' }">⬇</div>
      </div>
      
      <!-- 边界点 10 -->
      <div class="point boundary" :class="{ active: inputValue === 10 }">10</div>
      
      <!-- 无效区域右 -->
      <div class="zone invalid">无效 (> 10)</div>
    </div>

    <div class="analysis-box">
      <div v-if="testResult.type === 'boundary'" class="msg boundary-msg">
        ⚠️ 命中边界值测试点！这是最容易出 Bug 的地方。
      </div>
      <div v-else-if="testResult.type === 'valid'" class="msg valid-msg">
        ✅ 有效等价类区间
      </div>
      <div v-else class="msg invalid-msg">
        ❌ 无效等价类区间
      </div>
      <p>测试结论: <strong>{{ testResult.text }}</strong></p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputValue = ref(5)
const MIN = 1
const MAX = 10

// 计算指针在中间区域的位置（仅作视觉演示）
const pointerPosition = computed(() => {
  if (inputValue.value < MIN) return 0
  if (inputValue.value > MAX) return 100
  return ((inputValue.value - MIN) / (MAX - MIN)) * 100
})

const testResult = computed(() => {
  const val = inputValue.value
  
  // 边界值判断（白盒测试重点）
  if (val === MIN || val === MAX) {
    return { type: 'boundary', text: '边界值：恰好在限制边缘，检查 < 和 <= 是否写错' }
  }
  if (val === MIN - 1 || val === MAX + 1) {
    return { type: 'boundary', text: '次边界值：刚刚越界，检查异常处理是否生效' }
  }
  
  if (val > MIN && val < MAX) {
    return { type: 'valid', text: '中间值：通常只要测一个代表值即可' }
  }
  
  return { type: 'invalid', text: '无效值：应该被拦截' }
})
</script>

<style scoped>
.demo-card { 
  border: 1px solid #ddd; 
  padding: 20px; 
  max-width: 600px; 
  margin: 20px auto; 
  border-radius: 8px; 
  background: white;
}
.input-area { 
  margin-bottom: 30px; 
  text-align: center; 
  font-size: 1.2em; 
}
input[type="number"] { 
  padding: 5px; 
  font-size: 1em; 
  width: 80px; 
  text-align: center; 
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
}

.ruler-container { 
  display: flex; 
  align-items: center; 
  height: 60px; 
  margin-bottom: 20px; 
  position: relative; 
}
.zone { 
  flex: 1; 
  height: 10px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 12px; 
  color: white; 
  border-radius: 4px; 
  margin: 0 5px; 
  position: relative; 
}
.zone.valid { 
  background: #2ecc71; 
  flex: 2; 
}
.zone.invalid { 
  background: #e74c3c; 
}

.point { 
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
  background: #f1c40f; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-weight: bold; 
  border: 2px solid #fff; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); 
  z-index: 2; 
  transition: all 0.2s; 
  color: #333;
}
.point.active { 
  transform: scale(1.3); 
  background: #f39c12; 
  border-color: #333; 
}

.pointer { 
  position: absolute; 
  top: -25px; 
  font-size: 24px; 
  transform: translateX(-50%); 
  transition: left 0.3s; 
  color: #333; 
}

.analysis-box { 
  background: #f9f9f9; 
  padding: 15px; 
  border-radius: 6px; 
  text-align: center; 
}
.msg { 
  font-weight: bold; 
  margin-bottom: 5px; 
  font-size: 16px;
}
.boundary-msg { 
  color: #d35400; 
}
.valid-msg { 
  color: #27ae60; 
}
.invalid-msg { 
  color: #c0392b; 
}
</style>

