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
  width: 137px;
  height: 32px;
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  text-align: center;
  border-radius: 5px;
  background-color: #29903B;
  border: 1px solid #1A9B57;
  transition: background-color 0.5s;
  margin: 0 10px 0 5px;
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
