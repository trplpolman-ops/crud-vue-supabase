<template>
  <nav class="menu">
    <RouterLink to="/">Beranda</RouterLink>
    <RouterLink to="/biodata">Biodata</RouterLink>
  </nav>

  <RouterView />
</template>

<style>
.menu {
  display: flex;
  gap: 16px;
  padding: 12px 20px;
  background: #1f2937;
  font-family: sans-serif;
}
.menu a {
  color: #d1d5db;
  text-decoration: none;
}
.menu a.router-link-exact-active {
  color: #fff;
  font-weight: bold;
  border-bottom: 2px solid #2563eb;
}
</style>
