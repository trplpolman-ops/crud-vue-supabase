<script setup>
// 2. EMIT: kabar yang DIKIRIM ke induk
const emit = defineEmits(['tambah', 'reset'])
</script>

<template>
  <div class="tombol-group">
    <!-- Saat diklik, komponen ini TIDAK mengubah angka sendiri.
         Ia hanya memberi kabar ke induk. -->
    <button @click="emit('tambah', 1)">+1</button>
    <button @click="emit('tambah', 5)">+5</button>
    <button class="reset" @click="emit('reset')">Reset</button>
  </div>
</template>

<style scoped>
.tombol-group {
  display: flex;
  gap: 8px;
}
button {
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
}
.reset {
  background: #6b7280;
}
</style>