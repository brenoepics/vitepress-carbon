<script setup lang="ts">
import { computed } from 'vue'
import data from '../data/contributors.json'

interface Contributor {
  login: string
  avatar: string
  url: string
  total: number
  commits: number
  pullRequests: number
  issues: number
  reviews: number
  comments: number
}

const contributors = computed(() => data.contributors as Contributor[])

const LABELS: [keyof Contributor, string, string][] = [
  ['commits', 'commit', 'commits'],
  ['pullRequests', 'pull request', 'pull requests'],
  ['issues', 'issue', 'issues'],
  ['reviews', 'review', 'reviews'],
  ['comments', 'comment', 'comments']
]

/** "271 commits, 30 pull requests, 33 comments" — zero counts omitted. */
function summarise(person: Contributor) {
  return LABELS.filter(([key]) => (person[key] as number) > 0)
    .map(([key, one, many]) => {
      const n = person[key] as number
      return `${n} ${n === 1 ? one : many}`
    })
    .join(', ')
}
</script>

<template>
  <div class="ContributorWall">
    <ul class="wall" role="list">
      <li v-for="person in contributors" :key="person.login">
        <a
          class="person"
          :href="person.url"
          target="_blank"
          rel="noopener noreferrer"
          :title="`${person.login} — ${summarise(person)}`"
        >
          <img
            class="avatar"
            :src="person.avatar"
            :alt="`${person.login} on GitHub`"
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
          />
          <span class="login">{{ person.login }}</span>
          <span class="detail">{{ summarise(person) }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.person {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 12px;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.person:hover {
  border-color: var(--vp-home-card-border-hover-color);
  background-color: var(--vp-c-bg-soft);
}

.avatar {
  grid-row: 1 / 3;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
}

.login {
  align-self: end;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail {
  align-self: start;
  font-size: 12px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .person {
    transition: none;
  }
}
</style>
