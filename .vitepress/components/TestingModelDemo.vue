<template>
  <div class="demo-wrapper">
    <div class="demo-container">
      <!-- Header -->
      <header class="demo-header">
        <h1 class="demo-title">软件测试过程模型可视化</h1>
        <p class="demo-subtitle">软件质量与评测技术 - 核心考点演示</p>
      </header>

      <!-- Navigation Tabs -->
      <nav class="demo-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="currentTab = tab.id"
          class="demo-tab"
          :class="currentTab === tab.id ? 'demo-tab-active' : 'demo-tab-inactive'"
        >
          {{ tab.name }}
        </button>
      </nav>

      <!-- Content Area -->
      <main class="demo-main">
        <transition name="fade" mode="out-in">
          
          <!-- A: V-Model View -->
          <div v-if="currentTab === 'v-model'" key="v-model" class="demo-content">
            <div class="demo-grid">
              <!-- Visualization -->
              <div class="demo-visualization">
                <h3 class="demo-vis-title">V-Model Visualization</h3>
                
                <div class="v-model-container">
                  <!-- Level 1 -->
                  <div class="v-level" @mouseenter="hoverLevel = 1" @mouseleave="hoverLevel = 0">
                    <div class="v-dev-box" :class="{'v-hover': hoverLevel === 1}">需求分析</div>
                    <div class="v-connector">
                      <span class="v-label">验收依据</span>
                      <div class="v-line" :class="{'v-line-active': hoverLevel === 1}"></div>
                    </div>
                    <div class="v-test-box" :class="{'v-hover': hoverLevel === 1}">验收测试</div>
                  </div>

                  <!-- Level 2 -->
                  <div class="v-level v-level-2" @mouseenter="hoverLevel = 2" @mouseleave="hoverLevel = 0">
                    <div class="v-dev-box" :class="{'v-hover': hoverLevel === 2}">概要设计</div>
                    <div class="v-connector">
                      <div class="v-line" :class="{'v-line-active': hoverLevel === 2}"></div>
                    </div>
                    <div class="v-test-box" :class="{'v-hover': hoverLevel === 2}">系统测试</div>
                  </div>

                  <!-- Level 3 -->
                  <div class="v-level v-level-3" @mouseenter="hoverLevel = 3" @mouseleave="hoverLevel = 0">
                    <div class="v-dev-box" :class="{'v-hover': hoverLevel === 3}">详细设计</div>
                    <div class="v-connector">
                      <div class="v-line" :class="{'v-line-active': hoverLevel === 3}"></div>
                    </div>
                    <div class="v-test-box" :class="{'v-hover': hoverLevel === 3}">集成测试</div>
                  </div>

                  <!-- Level 4 (Bottom) -->
                  <div class="v-level-bottom">
                    <div class="v-dev-box-bottom">编码 / 实现</div>
                  </div>
                </div>
                <p class="demo-hint">提示：鼠标悬停在左侧阶段，查看对应的测试级别</p>
              </div>

              <!-- Theory & Exam Focus -->
              <div class="demo-theory">
                <div class="theory-section">
                  <h3 class="theory-title">核心逻辑</h3>
                  <ul class="theory-list">
                    <li>左边是开发，右边是测试，呈线性对应关系。</li>
                    <li><strong class="highlight">单元测试</strong> ↔ 详细设计/编码</li>
                    <li><strong class="highlight">集成测试</strong> ↔ 概要设计</li>
                    <li><strong class="highlight">系统测试</strong> ↔ 需求分析</li>
                    <li><strong class="highlight">验收测试</strong> ↔ 用户需求</li>
                  </ul>
                </div>

                <div class="warning-box">
                  <h4 class="warning-title">
                    <span class="warning-icon">🚩</span> 考试必考点：致命缺点
                  </h4>
                  <p class="warning-text">
                    <strong>测试介入太晚！</strong> V模型把测试看作编码后的最后一个阶段。如果需求阶段出错，要等到最后验收测试才发现，返工成本极高。它不支持并行。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- B: W-Model View -->
          <div v-else-if="currentTab === 'w-model'" key="w-model" class="demo-content">
            <div class="demo-grid w-wide">
              <!-- Visualization -->
              <div class="demo-visualization">
                <h3 class="demo-vis-title">W-Model (Dual V) Visualization</h3>
                
                <div class="w-visual-wrapper">
                  <svg class="w-visual-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <!-- 双V骨架线 -->
                    <line x1="18" y1="12" x2="50" y2="82" class="w-line" />
                    <line x1="50" y1="82" x2="82" y2="12" class="w-line" />
                  </svg>

                  <!-- 左侧开发阶段（沿左斜线向下） -->
                  <div class="w-node w-dev" style="left:18%; top:10%;">需求分析</div>
                  <div class="w-node w-dev" style="left:28%; top:32%;">概要设计</div>
                  <div class="w-node w-dev" style="left:38%; top:54%;">详细设计</div>
                  <div class="w-node w-dev" style="left:48%; top:76%;">编码实现</div>

                  <!-- 中部提示 -->
                  <div class="w-center-tip">并行 / 对应</div>

                  <!-- 右侧测试阶段（沿右斜线向上） -->
                  <div class="w-node w-test w-tooltip" style="left:82%; top:12%;">
                    <span class="w-item-text">验收/需求测试</span>
                    <span class="w-tooltip-text">审查需求文档!</span>
                  </div>
                  <div class="w-node w-test w-tooltip" style="left:72%; top:34%;">
                    <span class="w-item-text">系统/设计测试</span>
                    <span class="w-tooltip-text">审查设计文档!</span>
                  </div>
                  <div class="w-node w-test" style="left:62%; top:56%;">集成测试</div>
                  <div class="w-node w-test" style="left:52%; top:78%;">单元测试</div>
                </div>
              </div>

              <!-- Theory -->
              <div class="demo-theory">
                <div class="theory-section">
                  <h3 class="theory-title">核心逻辑：双V模型</h3>
                  <ul class="theory-list">
                    <li><strong class="highlight">测试与开发并行</strong>：这是W模型最大的特点。</li>
                    <li><strong class="highlight">对象扩大</strong>：测试的对象不仅仅是程序代码，还包括<strong>需求文档</strong>和<strong>设计文档</strong>。</li>
                    <li><strong class="highlight">尽早介入</strong>：需求分析阶段就开始测试需求（审查），设计阶段就开始测试设计。</li>
                  </ul>
                </div>

                <div class="info-box">
                  <h4 class="info-title">局限性</h4>
                  <p class="info-text">虽然比V模型进步，但仍然视作串行活动，无法完美支持灵活的迭代和变更（还是得等上一步做完）。</p>
                </div>
                
                <div class="warning-box">
                  <h4 class="warning-title">🚩 考试判断题预警</h4>
                  <p class="warning-text">\"软件测试的对象仅仅是程序代码\" —— <strong class="error-mark">❌ 错</strong>。W模型告诉我们要测文档。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- C: H-Model View -->
          <div v-else-if="currentTab === 'h-model'" key="h-model" class="demo-content">
            <div class="demo-content-h">
              <!-- Visualization -->
              <div class="h-model-container">
                <h3 class="demo-vis-title">H-Model：测试是独立的流程</h3>
                
                <!-- Main Flow -->
                <div class="h-flow">
                  
                  <!-- Development Stream -->
                  <div class="h-stream h-stream-other">
                    <div class="h-label">其他流程</div>
                    <div class="h-bar"></div>
                  </div>

                  <!-- Test Stream -->
                  <div class="h-stream h-stream-test">
                    <div class="h-label h-label-test">测试流程</div>
                    
                    <!-- Timeline -->
                    <div class="h-timeline">
                      <!-- Test Prep -->
                      <div class="h-phase h-phase-prep">
                        测试准备
                      </div>
                      
                      <!-- The Point -->
                      <div class="h-point" title="Test Ready Point">
                        就绪点
                      </div>

                      <!-- Test Exec -->
                      <div class="h-phase h-phase-exec">
                        测试执行
                      </div>
                    </div>
                  </div>

                  <!-- Loop / Iteration Indicator -->
                  <div class="h-iteration">
                    <span>微循环/迭代</span>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="h-content-grid">
                <div class="h-card">
                  <h4 class="h-card-title">⭐ 主推模型特点</h4>
                  <ul class="h-card-list">
                    <li><strong>独立性</strong>：测试不仅仅是执行，而是一个完整的、独立的流程。</li>
                    <li><strong>就绪点 (Test Ready Point)</strong>：只要测试准备工作完成（如环境、数据、用例），测试就可以开始，不需要等开发完全结束。</li>
                    <li><strong>灵活性</strong>：支持迭代、并发进行。</li>
                  </ul>
                </div>
                
                <div class="h-card h-card-warning">
                  <h4 class="h-card-title">🚩 易错辨析</h4>
                  <p class="h-card-text">
                    V模型和W模型强调的是阶段的对应关系，而<strong>H模型强调的是"独立流程"和"准备与执行的分离"</strong>。如果题目问哪个模型最能体现测试的独立性，选H模型。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- D: Others View -->
          <div v-else-if="currentTab === 'others'" key="others" class="demo-content">
            <div class="others-grid">
              
              <!-- Process Improvement -->
              <div class="others-card">
                <h3 class="others-card-title">测试过程改进模型</h3>
                <div class="others-list">
                  <div class="others-item">
                    <span class="others-label">CMM</span>
                    <span class="others-desc">能力成熟度模型 (5级) - 针对开发</span>
                  </div>
                  <div class="others-item">
                    <span class="others-label">TMM</span>
                    <span class="others-desc">测试能力成熟度模型 (5级) - 针对测试</span>
                  </div>
                  <div class="others-item">
                    <span class="others-label">TPI</span>
                    <span class="others-desc">测试过程改进 (连续表示)</span>
                  </div>
                  <p class="others-note">逻辑：从无序(1级) -> 可重复 -> 已定义 -> 管理/量化 -> 优化(5级)</p>
                </div>
              </div>

              <!-- Standards -->
              <div class="others-card">
                <h3 class="others-card-title">软件测试标准</h3>
                <ul class="others-standard-list">
                  <li><strong>定义</strong>：公认机构制定的规则/导则（一把尺子）。</li>
                  <li><strong>ISO vs CMM</strong>：
                    <ul class="others-nested-list">
                      <li>ISO 适用于所有制造业（含软件）。</li>
                      <li>CMM 专用于软件行业。</li>
                      <li>企业可以同时拿两个认证。</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <!-- X Model -->
              <div class="others-card others-card-wide">
                <h3 class="others-card-title">X 模型</h3>
                <p class="others-text">特点：针对单独程序片段进行测试，引入了<strong>探索性测试</strong>。优势在于更接近现实开发中的频繁交接和集成。</p>
              </div>

            </div>
          </div>
        </transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentTab = ref('v-model');

const tabs = [
  { id: 'v-model', name: '🅰️ V 模型 (常考)' },
  { id: 'w-model', name: '🅱️ W 模型 (双V)' },
  { id: 'h-model', name: '🅾️ H 模型 (主推)' },
  { id: 'others', name: '📚 改进/标准/X模型' },
];

const hoverLevel = ref(0);
</script>

<style scoped>
/* Base Styles */
.demo-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 20px auto;
  max-width: 1200px;
}

.demo-container {
  background: var(--vp-c-bg);
}

/* Header */
.demo-header {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 24px;
  text-align: center;
}

.demo-title {
  font-size: 1.875rem;
  font-weight: bold;
  margin: 0;
}

.demo-subtitle {
  margin: 8px 0 0 0;
  opacity: 0.9;
  font-size: 0.875rem;
}

/* Navigation */
.demo-nav {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  background: var(--vp-c-bg-soft);
}

.dark .demo-nav {
  background: var(--vp-c-bg-alt);
}

.demo-tab {
  padding: 16px 24px;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--vp-c-text-2);
  border-bottom: 2px solid transparent;
}

.demo-tab:hover {
  color: var(--vp-c-brand-1);
}

.demo-tab-active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.dark .demo-tab-active {
  background: var(--vp-c-bg-soft);
}

.demo-tab-inactive {
  color: var(--vp-c-text-2);
}

/* Main Content */
.demo-main {
  padding: 24px;
}

.demo-content {
  min-height: 400px;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.w-wide {
  grid-template-columns: 2fr 1fr;
}

@media (max-width: 1024px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

/* Visualization Area */
.demo-visualization {
  background: var(--vp-c-bg-soft);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dark .demo-visualization {
  background: var(--vp-c-bg-alt);
}

.demo-vis-title {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.demo-hint {
  margin-top: 24px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  text-align: center;
}

/* Theory Area */
.demo-theory {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.theory-section {
  color: var(--vp-c-text-1);
}

.theory-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.theory-list {
  list-style: disc;
  padding-left: 20px;
  margin: 0;
  line-height: 1.8;
}

.theory-list li {
  margin: 4px 0;
}

.highlight {
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

/* Warning Box */
.warning-box {
  background: var(--vp-custom-block-warning-bg);
  border-left: 4px solid var(--vp-custom-block-warning-border);
  padding: 16px;
  border-radius: 4px;
}

.warning-title {
  color: var(--vp-custom-block-warning-text);
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.warning-icon {
  font-size: 1.25rem;
  margin-right: 8px;
}

.warning-text {
  color: var(--vp-custom-block-warning-text);
  margin: 0;
  line-height: 1.6;
}

.error-mark {
  font-size: 1.25rem;
}

/* Info Box */
.info-box {
  background: var(--vp-custom-block-tip-bg);
  border-left: 4px solid var(--vp-custom-block-tip-border);
  padding: 16px;
  border-radius: 4px;
}

.info-title {
  color: var(--vp-custom-block-tip-text);
  font-weight: bold;
  margin-bottom: 8px;
}

.info-text {
  color: var(--vp-custom-block-tip-text);
  margin: 0;
  line-height: 1.6;
}

/* V-Model Styles */
.v-model-container {
  width: 100%;
  max-width: 28rem;
  position: relative;
  margin-top: 40px;
}

.v-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.v-level-2 {
  padding: 0 32px;
}

.v-level-3 {
  padding: 0 64px;
}

.v-level-bottom {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.v-dev-box, .v-test-box {
  width: 128px;
  padding: 12px;
  border: 2px solid;
  border-radius: 4px;
  text-align: center;
  cursor: default;
  transition: all 0.3s;
  font-size: 0.875rem;
}

.v-dev-box {
  background: var(--vp-c-brand-lighter);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.dark .v-dev-box {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-light);
}

.v-test-box {
  background: var(--vp-custom-block-tip-bg);
  border-color: var(--vp-custom-block-tip-border);
  color: var(--vp-c-text-1);
}

.v-hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 3px var(--vp-c-brand-1);
  opacity: 0.8;
}

.v-connector {
  flex: 1;
  height: 2px;
  background: var(--vp-c-divider);
  margin: 0 8px;
  position: relative;
}

.v-label {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.v-line {
  position: absolute;
  inset: 0;
  background: var(--vp-c-brand-1);
  transition: width 0.3s;
  width: 0;
}

.v-line-active {
  width: 100%;
}

.v-dev-box-bottom {
  width: 160px;
  padding: 16px;
  background: var(--vp-c-brand-lighter);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  animation: pulse 2s infinite;
}

.dark .v-dev-box-bottom {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-light);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* W-Model Styles */
.w-model-container {
  position: relative;
  width: 100%;
  min-height: 420px;
  margin-top: 24px;
}

.w-visual-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.w-visual-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.w-line {
  stroke: var(--vp-c-brand-1);
  stroke-width: 2;
  stroke-dasharray: 4 4;
  opacity: 0.6;
}

.w-node {
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  min-width: 120px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  border: 2px solid transparent;
}

.w-dev {
  background: var(--vp-c-brand-lighter);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.dark .w-dev {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-light);
}

.w-test {
  background: var(--vp-custom-block-tip-bg);
  border-color: var(--vp-custom-block-tip-border);
  color: var(--vp-c-text-1);
}

.w-center-tip {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.w-tooltip {
  position: relative;
}

.w-item-text {
  font-weight: bold;
}

.w-tooltip-text {
  position: absolute;
  top: -32px;
  left: 0;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  white-space: nowrap;
}

.w-tooltip:hover .w-tooltip-text {
  opacity: 1;
}

/* H-Model Styles */
.demo-content-h {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.h-model-container {
  background: var(--vp-c-bg-soft);
  padding: 32px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  position: relative;
  overflow: hidden;
}

.dark .h-model-container {
  background: var(--vp-c-bg-alt);
}

.h-flow {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  position: relative;
}

.h-stream {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
}

.h-stream-other {
  opacity: 0.5;
}

.h-label {
  width: 96px;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.h-label-test {
  color: var(--vp-c-brand-1);
}

.h-bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
}

.h-timeline {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  gap: 0;
}

.h-phase {
  flex: 1;
  border: 2px solid;
  padding: 14px 12px;
  border-radius: 4px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: bold;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.h-phase-prep {
  background: var(--vp-custom-block-warning-bg);
  border-color: var(--vp-custom-block-warning-border);
  color: var(--vp-custom-block-warning-text);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.h-phase-exec {
  background: var(--vp-custom-block-tip-bg);
  border-color: var(--vp-custom-block-tip-border);
  color: var(--vp-custom-block-tip-text);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.h-point {
  width: 48px;
  height: 48px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 10;
  animation: bounce 2s infinite;
  cursor: help;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.h-iteration {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
}

.h-iteration span {
  font-size: 0.75rem;
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.h-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.h-card {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid var(--vp-c-divider);
}

.h-card-warning {
  background: var(--vp-custom-block-warning-bg);
  border-color: var(--vp-custom-block-warning-border);
}

.h-card-title {
  font-weight: bold;
  font-size: 1.125rem;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.h-card-list {
  list-style: disc;
  padding-left: 20px;
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  margin: 0;
}

.h-card-list li {
  margin: 8px 0;
}

.h-card-text {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin: 0;
}

/* Others Styles */
.others-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.others-card {
  background: var(--vp-c-bg);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid var(--vp-c-divider);
}

.others-card-wide {
  grid-column: 1 / -1;
}

.others-card-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--vp-c-brand-1);
}

.others-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.875rem;
}

.others-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.others-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.others-desc {
  color: var(--vp-c-text-2);
}

.others-note {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}

.others-standard-list {
  list-style: disc;
  padding-left: 20px;
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  margin: 0;
}

.others-standard-list li {
  margin: 8px 0;
}

.others-nested-list {
  list-style: circle;
  padding-left: 20px;
  margin-top: 4px;
  color: var(--vp-c-text-2);
}

.others-text {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin: 0;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

