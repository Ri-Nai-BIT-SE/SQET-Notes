<template>
  <div class="demo-wrapper">
    <h2 class="title">🚀 白盒测试综合案例：基本路径测试</h2>
    
    <div class="main-layout">
      <!-- 左侧：代码与控制台 -->
      <div class="left-panel">
        <div class="code-block">
          <div class="code-header">📄 待测代码 (C语言)</div>
          <pre>
<span :class="{ active: activeLines.includes(1) }">void test(int A, int B, int X) {</span>
<span :class="{ active: activeLines.includes(2) }">    if (A > 1 && B == 0)  <span class="comment">// 判定 1 & 2</span></span>
<span :class="{ active: activeLines.includes(3) }">        X = X / A;        <span class="comment">// 语句 3</span></span>
<span :class="{ active: activeLines.includes(4) }">    if (A == 2 || X > 1)  <span class="comment">// 判定 4 & 5</span></span>
<span :class="{ active: activeLines.includes(5) }">        X = X + 1;        <span class="comment">// 语句 6</span></span>
<span :class="{ active: activeLines.includes(6) }">    printf("%d", X);      <span class="comment">// 结束 7</span></span>
<span :class="{ active: activeLines.includes(7) }">}</span>
          </pre>
        </div>

        <div class="controls">
          <h4>🧪 测试用例输入</h4>
          <div class="input-group">
            <label>A: <input type="number" v-model.number="inputA" /></label>
            <label>B: <input type="number" v-model.number="inputB" /></label>
            <label>X: <input type="number" v-model.number="inputX" /></label>
          </div>
          <div class="result-box">
            <p>当前执行结果 X = <strong>{{ executionResult.finalX }}</strong></p>
            <p>路径: <span class="path-text">{{ executionResult.pathStr }}</span></p>
          </div>
        </div>

        <div class="theory-box">
          <h4>📊 圈复杂度计算 V(G)</h4>
          <ul>
            <li>判定节点数 (P) = 4 <small>(拆分后: A>1, B==0, A==2, X>1)</small></li>
            <li>公式: <strong>V(G) = P + 1 = 5</strong></li>
            <li>这意味着：至少需要 <strong>5条</strong> 独立路径才能覆盖所有逻辑。</li>
          </ul>
        </div>
      </div>

      <!-- 右侧：动态控制流图 -->
      <div class="right-panel">
        <div class="cfg-container">
          <svg viewBox="0 0 400 550" class="cfg-svg">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#999" />
              </marker>
              <marker id="arrow-active" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#e74c3c" />
              </marker>
            </defs>

            <!-- 连线 -->
            <g v-for="link in links" :key="link.id">
              <path 
                :d="link.d" 
                class="link"
                :class="{ active: isLinkActive(link.from, link.to) }"
                :marker-end="isLinkActive(link.from, link.to) ? 'url(#arrow-active)' : 'url(#arrow)'"
              />
              <!-- T/F 标签 -->
              <text v-if="link.label" :x="link.lx" :y="link.ly" class="link-label" font-size="12">{{ link.label }}</text>
            </g>

            <!-- 节点 -->
            <g v-for="node in nodes" :key="node.id" :transform="`translate(${node.x}, ${node.y})`">
              <!-- 形状：菱形为判定，圆形为语句/开始结束 -->
              <polygon v-if="node.type === 'condition'" points="0,-20 40,0 0,20 -40,0" 
                :class="['node-shape', 'decision', { active: isNodeActive(node.id) }]" />
              <rect v-else-if="node.type === 'stmt'" x="-30" y="-15" width="60" height="30" rx="5"
                :class="['node-shape', 'stmt', { active: isNodeActive(node.id) }]" />
              <circle v-else r="20" :class="['node-shape', 'start-end', { active: isNodeActive(node.id) }]" />
              
              <text y="5" text-anchor="middle" class="node-text">{{ node.label }}</text>
              <text y="-25" text-anchor="middle" font-size="10" class="node-id">({{ node.id }})</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 输入状态
const inputA = ref(2)
const inputB = ref(0)
const inputX = ref(4)

// --- 静态定义：控制流图结构 (Nodes & Links) ---
// 坐标系：SVG 400x550
const nodes = [
  { id: 1, label: 'A > 1 ?', x: 200, y: 50, type: 'condition' }, // 复合条件1拆分
  { id: 2, label: 'B == 0 ?', x: 280, y: 120, type: 'condition' }, // 复合条件1拆分
  { id: 3, label: 'X = X / A', x: 280, y: 190, type: 'stmt' }, // 语句
  { id: 4, label: 'A == 2 ?', x: 200, y: 260, type: 'condition' }, // 复合条件2汇聚点 & 拆分
  { id: 5, label: 'X > 1 ?', x: 280, y: 330, type: 'condition' }, // 复合条件2拆分
  { id: 6, label: 'X = X + 1', x: 120, y: 400, type: 'stmt' }, // 语句 (注意：逻辑或，真则执行)
  { id: 7, label: 'Print X', x: 200, y: 480, type: 'end' } // 结束
]

// 连线定义
const links = [
  // if (A > 1 && B == 0)
  { id: '1-2', from: 1, to: 2, d: 'M200 70 L280 100', label: 'T', lx: 250, ly: 80 },
  { id: '1-4', from: 1, to: 4, d: 'M200 70 L200 240', label: 'F', lx: 190, ly: 150 }, // A<=1, 短路，直接去判定2
  { id: '2-3', from: 2, to: 3, d: 'M280 140 L280 175', label: 'T', lx: 290, ly: 160 },
  { id: '2-4', from: 2, to: 4, d: 'M280 140 L240 240', label: 'F', lx: 270, ly: 200 },
  { id: '3-4', from: 3, to: 4, d: 'M280 205 L220 245', label: '', lx: 0, ly: 0 },

  // if (A == 2 || X > 1) -> 逻辑或，只要有一个T就去6
  { id: '4-6', from: 4, to: 6, d: 'M200 280 L140 385', label: 'T', lx: 160, ly: 320 }, // A==2 True -> 动作
  { id: '4-5', from: 4, to: 5, d: 'M200 280 L280 310', label: 'F', lx: 250, ly: 290 }, // A!=2 -> 查X>1
  { id: '5-6', from: 5, to: 6, d: 'M280 350 L160 390', label: 'T', lx: 220, ly: 380 }, // X>1 True -> 动作
  { id: '5-7', from: 5, to: 7, d: 'M280 350 L220 460', label: 'F', lx: 260, ly: 420 }, // X<=1 -> 结束
  { id: '6-7', from: 6, to: 7, d: 'M120 415 L180 465', label: '', lx: 0, ly: 0 },
]

// --- 动态逻辑：计算执行路径 ---
const executionResult = computed(() => {
  let A = inputA.value
  let B = inputB.value
  let X = inputX.value
  let path = [] // 记录经过的节点 ID
  let lines = [1] // 记录经过的代码行号 (大致对应)

  // Node 1: A > 1
  path.push(1); lines.push(2)
  if (A > 1) {
    // Node 2: B == 0
    path.push(2)
    if (B === 0) {
      // Node 3: X = X / A
      path.push(3); lines.push(3)
      // 避免除以0，虽然A>1保证了不为0，但在JS里安全点
      if (A !== 0) X = Math.floor(X / A) 
    }
  }

  // Node 4: A == 2
  path.push(4); lines.push(4)
  let executeStmt4 = false
  
  if (A === 2) {
    executeStmt4 = true
  } else {
    // Node 5: X > 1
    path.push(5)
    if (X > 1) {
      executeStmt4 = true
    }
  }

  if (executeStmt4) {
    // Node 6: X = X + 1
    path.push(6); lines.push(5)
    X = X + 1
  }

  // Node 7: End
  path.push(7); lines.push(6, 7)

  return {
    finalX: X,
    pathIDs: path,
    pathStr: path.join(' -> '),
    codeLines: lines
  }
})

// 辅助函数：判断节点是否激活
const isNodeActive = (id) => executionResult.value.pathIDs.includes(id)
const activeLines = computed(() => executionResult.value.codeLines)

// 辅助函数：判断连线是否激活 (检查是否连续出现在路径中)
const isLinkActive = (from, to) => {
  const p = executionResult.value.pathIDs
  const idxFrom = p.indexOf(from)
  // 如果 from 存在，且下一个节点正好是 to
  // 注意：路径中可能存在回环（虽此例无），严谨写法是遍历
  for (let i = 0; i < p.length - 1; i++) {
    if (p[i] === from && p[i+1] === to) return true
  }
  return false
}

</script>

<style scoped>
.demo-wrapper {
  font-family: 'Segoe UI', sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
.title { 
  text-align: center; 
  color: var(--vp-c-text-1); 
  margin-bottom: 30px; 
}
.main-layout { 
  display: flex; 
  gap: 30px; 
  align-items: flex-start; 
  flex-wrap: wrap; 
}
.left-panel { 
  flex: 1; 
  min-width: 300px; 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
}
.right-panel { 
  flex: 1; 
  min-width: 300px; 
  background: var(--vp-c-bg-soft); 
  border-radius: 8px; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
  padding: 10px; 
  border: 1px solid var(--vp-c-divider);
}
.dark .right-panel {
  background: var(--vp-c-bg-alt);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

/* 代码块样式 */
.code-block { 
  background: #282c34; 
  color: #abb2bf; 
  padding: 15px; 
  border-radius: 6px; 
  font-family: 'Consolas', 'Monaco', monospace; 
}
.dark .code-block {
  background: #1e293b;
  color: #e2e8f0;
}
.code-header { 
  color: #61afef; 
  font-weight: bold; 
  margin-bottom: 10px; 
  border-bottom: 1px solid #3e4451; 
  padding-bottom: 5px; 
}
.dark .code-header {
  color: #7dd3fc;
  border-bottom-color: #334155;
}
.code-block pre span { 
  display: block; 
  padding: 2px 5px; 
  opacity: 0.6; 
  transition: all 0.3s; 
}
.code-block pre span.active { 
  opacity: 1; 
  background: rgba(97, 175, 239, 0.2); 
  border-left: 3px solid #61afef; 
  color: #fff; 
}
.dark .code-block pre span.active {
  background: rgba(125, 211, 252, 0.3);
  border-left-color: #7dd3fc;
}
.comment { 
  color: #5c6370; 
  font-style: italic; 
}
.dark .comment {
  color: #64748b;
}

/* 控制台样式 */
.controls, .theory-box { 
  background: var(--vp-c-bg-soft); 
  padding: 15px; 
  border-radius: 6px; 
  border: 1px solid var(--vp-c-divider); 
}
.dark .controls,
.dark .theory-box {
  background: var(--vp-c-bg-alt);
}
.controls h4,
.theory-box h4 {
  color: var(--vp-c-text-1);
  margin-top: 0;
  margin-bottom: 10px;
}
.input-group { 
  display: flex; 
  gap: 10px; 
  margin-bottom: 15px; 
  flex-wrap: wrap;
}
.input-group label { 
  font-weight: bold; 
  display: flex; 
  align-items: center; 
  gap: 5px; 
  color: var(--vp-c-text-1);
}
input[type="number"] { 
  width: 60px; 
  padding: 5px; 
  border: 1px solid var(--vp-c-divider); 
  border-radius: 4px; 
  text-align: center; 
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
input[type="number"]:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.result-box { 
  background: var(--vp-custom-block-tip-bg); 
  padding: 10px; 
  border-radius: 4px; 
  border-left: 4px solid var(--vp-c-brand-1); 
}
.result-box p {
  margin: 5px 0;
  color: var(--vp-c-text-1);
}
.path-text { 
  font-family: 'Consolas', 'Monaco', monospace; 
  color: var(--vp-c-brand-1); 
  font-weight: bold; 
}
.theory-box ul { 
  padding-left: 20px; 
  margin: 5px 0; 
  color: var(--vp-c-text-1);
}
.theory-box li {
  margin: 8px 0;
}
.theory-box small {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}
.theory-box strong {
  color: var(--vp-c-brand-1);
}

/* SVG 样式 */
.cfg-container { 
  text-align: center; 
}
.cfg-svg {
  width: 100%;
  height: auto;
  min-height: 550px;
}
.node-shape { 
  fill: var(--vp-c-bg); 
  stroke: var(--vp-c-text-1); 
  stroke-width: 2px; 
  transition: all 0.4s ease; 
}
.dark .node-shape {
  fill: var(--vp-c-bg-soft);
  stroke: var(--vp-c-text-2);
}
.node-shape.decision { 
  fill: var(--vp-c-bg); 
}
.dark .node-shape.decision {
  fill: var(--vp-c-bg-soft);
}
.node-shape.stmt { 
  fill: var(--vp-c-bg-soft); 
}
.dark .node-shape.stmt {
  fill: var(--vp-c-bg-alt);
}
.node-shape.start-end { 
  fill: var(--vp-c-bg-soft); 
}
.dark .node-shape.start-end {
  fill: var(--vp-c-bg-alt);
}

.node-shape.active { 
  fill: #ffecb3; 
  stroke: #e74c3c; 
  stroke-width: 3px; 
  filter: drop-shadow(0 0 5px rgba(231, 76, 60, 0.5)); 
}
.dark .node-shape.active {
  fill: #fbbf24;
  stroke: #f97316;
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6));
}
.node-text { 
  font-size: 12px; 
  font-weight: bold; 
  pointer-events: none; 
  fill: var(--vp-c-text-1);
}
.dark .node-text {
  fill: var(--vp-c-text-2);
}
.node-id {
  fill: var(--vp-c-text-2);
  pointer-events: none;
}
.dark .node-id {
  fill: var(--vp-c-text-3);
}

.link { 
  stroke: var(--vp-c-divider); 
  stroke-width: 2px; 
  fill: none; 
  transition: all 0.4s ease; 
}
.link.active { 
  stroke: #e74c3c; 
  stroke-width: 3px; 
  stroke-dasharray: 5; 
  animation: dash 1s linear infinite; 
}
.dark .link.active {
  stroke: #f97316;
}
.link-label {
  fill: var(--vp-c-text-2);
  pointer-events: none;
}
.dark .link-label {
  fill: var(--vp-c-text-3);
}

@keyframes dash {
  to { stroke-dashoffset: -10; }
}
</style>

