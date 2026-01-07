<template>
  <div class="demo-card">
    <h3>🔀 路径覆盖演示 (逻辑流程图)</h3>
    <div class="controls-top">
      <label><input type="checkbox" v-model="isMember" /> 是会员?</label>
      <label><input type="checkbox" v-model="hasStock" /> 有库存?</label>
    </div>

    <div class="flowchart-container">
      <svg viewBox="0 0 600 300" class="flowchart-svg">
        <!-- 节点定义 -->
        <g transform="translate(50, 130)">
          <circle cx="0" cy="0" r="30" class="node start" />
          <text x="0" y="5" text-anchor="middle" fill="white" font-size="14">开始</text>
        </g>
        
        <!-- 判定节点 1: 会员 -->
        <g transform="translate(200, 130)">
          <polygon points="0,-30 40,0 0,30 -40,0" :class="['node', 'decision', isMember ? 'active' : '']" />
          <text x="0" y="5" text-anchor="middle" class="small-text" fill="black">会员?</text>
        </g>

        <!-- 判定节点 2: 库存 -->
        <g transform="translate(400, 80)">
          <polygon points="0,-30 40,0 0,30 -40,0" :class="['node', 'decision', (isMember && hasStock) ? 'active' : '']" />
          <text x="0" y="5" text-anchor="middle" class="small-text" fill="black">库存?</text>
        </g>

        <!-- 结果节点 -->
        <g transform="translate(550, 30)">
          <rect x="-40" y="-20" width="80" height="40" :class="['node', 'result', (isMember && hasStock) ? 'success' : '']" rx="5" />
          <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">发货</text>
        </g>

        <g transform="translate(550, 130)">
          <rect x="-40" y="-20" width="80" height="40" :class="['node', 'result', (isMember && !hasStock) ? 'fail' : '']" rx="5" />
          <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">缺货</text>
        </g>

        <g transform="translate(400, 230)">
          <rect x="-40" y="-20" width="80" height="40" :class="['node', 'result', (!isMember) ? 'fail' : '']" rx="5" />
          <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">无权</text>
        </g>

        <!-- 连线路径 (动态变色) -->
        <!-- Start -> Member -->
        <line x1="80" y1="130" x2="160" y2="130" class="path active" marker-end="url(#arrow)" />
        
        <!-- Member -> Stock (Yes) -->
        <path d="M200 100 Q250 80 360 80" :class="['path', isMember ? 'active' : 'inactive']" marker-end="url(#arrow)" />
        <text x="280" y="75" fill="#666" font-size="12">是</text>
        
        <!-- Member -> No Auth (No) -->
        <path d="M200 160 Q250 230 360 230" :class="['path', !isMember ? 'active' : 'inactive']" marker-end="url(#arrow)" />
        <text x="280" y="220" fill="#666" font-size="12">否</text>

        <!-- Stock -> Success (Yes) -->
        <path d="M440 80 L510 30" :class="['path', (isMember && hasStock) ? 'active' : 'inactive']" marker-end="url(#arrow)" />
        <text x="470" y="50" fill="#666" font-size="12">是</text>

        <!-- Stock -> Fail (No) -->
        <path d="M440 80 L510 130" :class="['path', (isMember && !hasStock) ? 'active' : 'inactive']" marker-end="url(#arrow)" />
        <text x="470" y="100" fill="#666" font-size="12">否</text>

        <!-- 箭头定义 -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#999" />
          </marker>
        </defs>
      </svg>
    </div>
    <div class="desc">当前路径: <strong>{{ pathDescription }}</strong></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isMember = ref(true)
const hasStock = ref(true)

const pathDescription = computed(() => {
  if (!isMember.value) return "路径 3: 非会员 -> 无权限"
  if (hasStock.value) return "路径 1: 会员 -> 有库存 -> 发货"
  return "路径 2: 会员 -> 无库存 -> 缺货登记"
})
</script>

<style scoped>
.demo-card { 
  border: 1px solid #ddd; 
  padding: 20px; 
  max-width: 800px; 
  margin: 20px auto; 
  border-radius: 8px; 
  text-align: center; 
  background: white;
}
.controls-top { 
  margin-bottom: 20px; 
  display: flex; 
  justify-content: center; 
  gap: 30px; 
}
.controls-top label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}
.flowchart-container { 
  background: #f4f6f8; 
  border-radius: 8px; 
  padding: 20px; 
  overflow-x: auto;
}
.flowchart-svg {
  width: 100%;
  height: auto;
  min-height: 300px;
}
.node { 
  stroke: #333; 
  stroke-width: 2px; 
  fill: #fff; 
  transition: all 0.3s; 
}
.node.start { 
  fill: #333; 
}
.node.decision { 
  fill: #fff; 
}
.node.result { 
  rx: 5; 
  ry: 5; 
}
.node.active { 
  fill: #3498db; 
  stroke: #2980b9; 
}
.node.success { 
  fill: #2ecc71; 
  stroke: #27ae60; 
}
.node.fail { 
  fill: #e74c3c; 
  stroke: #c0392b; 
}
.path { 
  stroke: #ccc; 
  stroke-width: 2px; 
  fill: none; 
  transition: all 0.5s; 
  stroke-dasharray: 10; 
}
.path.active { 
  stroke: #3498db; 
  stroke-width: 4px; 
  stroke-dasharray: 0; 
}
.path.inactive {
  stroke: #ddd;
  stroke-width: 1px;
  opacity: 0.3;
}
.small-text { 
  font-size: 12px; 
}
.desc { 
  margin-top: 15px; 
  font-weight: bold; 
  color: #555; 
  font-size: 16px;
}
input[type=checkbox] { 
  transform: scale(1.5); 
  margin-right: 5px; 
  cursor: pointer;
}
</style>

