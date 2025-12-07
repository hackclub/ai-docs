<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Model {
  id: string
  name?: string
  context_length?: number
}

const languageModels = ref<Model[]>([])
const embeddingModels = ref<Model[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchModels() {
  try {
    const [langRes, embRes] = await Promise.all([
      fetch('https://ai.hackclub.com/proxy/v1/models'),
      fetch('https://ai.hackclub.com/proxy/v1/embeddings/models')
    ])

    if (!langRes.ok || !embRes.ok) {
      throw new Error('Failed to fetch models')
    }

    const langData = await langRes.json()
    const embData = await embRes.json()

    languageModels.value = langData.data || []
    embeddingModels.value = embData.data || []
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load models'
  } finally {
    loading.value = false
  }
}

function formatContextLength(length?: number): string {
  if (!length) return '—'
  if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M`
  if (length >= 1000) return `${(length / 1000).toFixed(0)}K`
  return length.toString()
}

function getDisplayName(model: Model): string {
  return model.name || model.id.split('/').pop() || model.id
}

const copiedId = ref<string | null>(null)

async function copyModelId(id: string) {
  await navigator.clipboard.writeText(id)
  copiedId.value = id
  setTimeout(() => {
    if (copiedId.value === id) copiedId.value = null
  }, 2000)
}

onMounted(fetchModels)
</script>

<template>
  <div class="models-list">
    <div v-if="loading" class="loading">Loading models...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
      <h2 id="language-models">Language Models</h2>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Model ID</th>
              <th>Context Length</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="model in languageModels" :key="model.id">
              <td>{{ getDisplayName(model) }}</td>
              <td>
                <code class="copyable" @click="copyModelId(model.id)" :title="copiedId === model.id ? 'Copied!' : 'Click to copy'">
                  {{ model.id }}
                  <span class="copy-icon">{{ copiedId === model.id ? '✓' : '⧉' }}</span>
                </code>
              </td>
              <td>{{ formatContextLength(model.context_length) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="embedding-models">Embedding Models</h2>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Model ID</th>
              <th>Context Length</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="model in embeddingModels" :key="model.id">
              <td>{{ getDisplayName(model) }}</td>
              <td>
                <code class="copyable" @click="copyModelId(model.id)" :title="copiedId === model.id ? 'Copied!' : 'Click to copy'">
                  {{ model.id }}
                  <span class="copy-icon">{{ copiedId === model.id ? '✓' : '⧉' }}</span>
                </code>
              </td>
              <td>{{ formatContextLength(model.context_length) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<style scoped>
.models-list {
  margin-top: 1rem;
}

.loading, .error {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.error {
  color: var(--vp-c-danger-1);
}

.table-wrapper {
  overflow-x: auto;
  margin: 1rem 0 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}

td code {
  font-size: 0.875rem;
  padding: 0.125rem 0.375rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

td code.copyable {
  cursor: pointer;
  transition: background 0.15s;
}

td code.copyable:hover {
  background: var(--vp-c-bg-alt);
}

.copy-icon {
  margin-left: 0.5rem;
  opacity: 0.5;
  font-size: 0.75rem;
}

td code.copyable:hover .copy-icon {
  opacity: 1;
}

tr:hover {
  background: var(--vp-c-bg-soft);
}
</style>
