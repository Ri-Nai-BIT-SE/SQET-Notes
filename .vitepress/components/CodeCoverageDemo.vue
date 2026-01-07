<template>
  <div class="demo-card">
    <h3>🔍 语句与分支覆盖演示</h3>
    <div class="container">
      <!-- 左侧：代码可视化区域 -->
      <div class="code-box">
        <div 
          v-for="(line, index) in codeLines" 
          :key="index"
          class="code-line"
          :class="{ 'executed': line.isExecuted, 'skipped': !line.isExecuted }"
        >
          <span class="line-num">{{ index + 1 }}</span>
          <pre>{{ line.text }}</pre>
        </div>
      </div>

      <!-- 右侧：控制台 -->
      <div class="controls">
        <label>
          输入年龄 (Age):
          <input type="number" v-model.number="age" />
        </label>
        
        <div class="status-panel">
          <p>当前逻辑判断结果：</p>
          <div class="badge" :class="age >= 18 ? 'success' : 'warn'">
            {{ age >= 18 ? '成年人 (True)' : '未成年 (False)' }}
          </div>
        </div>

        <div class="coverage-stats">
          <p>语句覆盖率: <strong>{{ coveragePercent }}%</strong></p>
          <small>尝试输入 15 和 20 看看区别</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const age = ref(0)

// 定义代码行结构，用来模拟"代码文件"
const lines = [
  { id: 1, text: 'function checkAge(age) {' },
  { id: 2, text: '  let type = "";' },
  { id: 3, text: '  if (age >= 18) {' },
  { id: 4, text: '    type = "成年人";' },
  { id: 5, text: '  } else {' },
  { id: 6, text: '    type = "未成年";' },
  { id: 7, text: '  }' },
  { id: 8, text: '  return type;' },
  { id: 9, text: '}' }
]

// 计算属性：根据输入值动态计算哪些行被"执行"了
const codeLines = computed(() => {
  const isAdult = age.value >= 18
  
  return lines.map(line => {
    let executed = true
    // 模拟白盒逻辑：
    // 如果是成年，else 分支（第6行）不会执行
    if (isAdult && line.id === 6) executed = false
    // 如果是未成年，if 内部（第4行）不会执行
    if (!isAdult && line.id === 4) executed = false
    
    return { ...line, isExecuted: executed }
  })
})

const coveragePercent = computed(() => {
  const executedCount = codeLines.value.filter(l => l.isExecuted).length
  return Math.round((executedCount / lines.length) * 100)
})
</script>

<style scoped>
.demo-card { 
  border: 1px solid var(--vp-c-divider); 
  padding: 20px; 
  border-radius: 8px; 
  max-width: 800px; 
  margin: 20px auto; 
  font-family: sans-serif; 
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.container { 
  display: flex; 
  gap: 20px; 
  flex-wrap: wrap;
}
.code-box { 
  background: #1e1e1e; 
  color: #d4d4d4; 
  padding: 15px; 
  border-radius: 6px; 
  flex: 1; 
  font-family: 'Consolas', 'Monaco', monospace;
  min-width: 300px;
}
.dark .code-box {
  background: #1e293b;
  color: #e2e8f0;
}
.code-line { 
  display: flex; 
  padding: 2px 5px; 
  opacity: 0.5; 
  transition: all 0.3s; 
}
.code-line.executed { 
  opacity: 1; 
  background: rgba(46, 204, 113, 0.2); 
  border-left: 3px solid #2ecc71; 
}
.dark .code-line.executed {
  background: rgba(46, 204, 113, 0.3);
  border-left-color: #2ecc71;
}
.code-line.skipped {
  opacity: 0.3;
}
.dark .code-line.skipped {
  opacity: 0.2;
}
.line-num { 
  color: #858585; 
  margin-right: 15px; 
  user-select: none; 
  min-width: 30px;
}
.dark .line-num {
  color: #64748b;
}
.controls { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
  min-width: 200px;
}
.controls label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: var(--vp-c-text-1);
}
.badge { 
  padding: 10px; 
  color: white; 
  border-radius: 4px; 
  text-align: center; 
}
.badge.success { 
  background: #27ae60; 
}
.badge.warn { 
  background: #e67e22; 
}
input[type="number"] { 
  padding: 8px; 
  width: 100%; 
  box-sizing: border-box; 
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
input[type="number"]:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.coverage-stats {
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}
.coverage-stats strong {
  color: #2ecc71;
  font-size: 1.2em;
}
.status-panel p {
  margin: 0 0 5px 0;
  color: var(--vp-c-text-1);
}
small {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}
</style>

