<script setup lang="ts">

const createUrl = 'https://github.com/new?template_name=carbon-starter&template_owner=brenoepics'
</script>

<template>
  <a class="create-repo" :href="createUrl">
    Create Repository
  </a>
</template>

<style scoped>
.create-repo {
  display: none;
  text-decoration: none;
  padding: 4px 12px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  background-color: #00863f;
  border: 1px solid #1A9B57;
  transition: background-color 0.5s;
  margin: 0 10px 0 5px;
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
  background-color: #29903B;
}

@media (min-width: 1060px) {
  .create-repo {
    display: block;
  }
}
</style>
