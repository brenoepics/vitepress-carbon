<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const createUrl =
  'https://github.com/new?template_name=carbon-starter&template_owner=brenoepics'
const repoUrl = 'https://github.com/brenoepics/vitepress-carbon'
const stargazersUrl = `${repoUrl}/stargazers`

const stars = ref(99)

const formattedStars = computed(() => {
  return new Intl.NumberFormat('en-US', {
    notation: stars.value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  }).format(stars.value)
})

onMounted(async () => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/brenoepics/vitepress-carbon'
    )

    if (!response.ok) {
      return
    }

    const data = await response.json()

    if (typeof data.stargazers_count === 'number') {
      stars.value = data.stargazers_count
    }
  } catch {
    // keep fallback count
  }
})
</script>

<template>
  <div class="header-actions">
    <a class="create-repo" :href="createUrl">Create Repository</a>

    <div class="github-star">
      <a
        class="star-button"
        :href="repoUrl"
        aria-label="Star brenoepics/vitepress-carbon on GitHub"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path
            d="M8 .25a.75.75 0 0 1 .673.418l1.88 3.81 4.204.611a.75.75 0 0 1 .416 1.279l-3.042 2.965.718 4.187a.75.75 0 0 1-1.088.79L8 12.347 4.24 14.31a.75.75 0 0 1-1.088-.79l.718-4.187L.827 6.368a.75.75 0 0 1 .416-1.279l4.204-.61L7.327.667A.75.75 0 0 1 8 .25Z"
          />
        </svg>
        <span>Star</span>
      </a>

      <a
        class="star-count"
        :href="stargazersUrl"
        :aria-label="`${stars} GitHub stars`"
      >
        {{ formattedStars }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.header-actions {
  display: none;
  align-items: center;
  gap: 10px;
  margin: 0 10px 0 5px;
}

.create-repo {
  text-decoration: none;
  padding: 4px 12px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  background-color: #00863f;
  border: 1px solid #1a9b57;
  transition: background-color 0.5s;
  grid-area: text;
  line-height: 1.42857;
  white-space: nowrap;
  font-family: inherit;
  font-weight: 500;
}

.create-repo:hover {
  background-color: #009044;
}

.create-repo:active {
  background-color: #29903b;
}

.github-star {
  display: flex;
  align-items: stretch;
  border: 1px solid #30363d;
  border-radius: 6px;
  background-color: #161b22;
  overflow: hidden;
  transition:
    border-color 0.2s,
    background-color 0.2s;
}

.star-button,
.star-count {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  border: 0;
  background-color: transparent;
  color: #c9d1d9;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.star-button {
  gap: 6px;
  padding: 0 10px;
  background-image: linear-gradient(
    180deg,
    rgba(240, 246, 252, 0.04),
    rgba(240, 246, 252, 0)
  );
}

.star-count {
  justify-content: center;
  padding: 0 10px;
  min-width: 42px;
  border-left: 1px solid #30363d;
}

.star-button svg {
  color: #e3b341;
}

.github-star:hover {
  border-color: #8b949e;
  background-color: #1c2128;
}

.star-button:hover,
.star-count:hover {
  background-color: transparent;
  border-color: #8b949e;
}

.star-count:hover {
  color: #58a6ff;
}

.github-star:has(.star-button:active),
.github-star:has(.star-count:active) {
  background-color: #0d1117;
}

@media (min-width: 1060px) {
  .header-actions {
    display: flex;
  }
}
</style>
