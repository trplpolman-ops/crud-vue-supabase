<script setup>
// 3. SLOT: induk bebas mengisi bagian dalam komponen ini
defineProps({
  judul: { type: String, default: 'Info' }
})
</script>

<template>
  <div class="kotak">
    <strong>{{ judul }}</strong>
    <div class="isi">
      <!-- Apa pun yang ditulis induk di antara <KotakInfo> ... </KotakInfo>
           akan muncul di sini -->
      <slot>Belum ada isi</slot>
    </div>
  </div>
</template>

<style scoped>
.kotak {
  border-left: 4px solid #2563eb;
  background: #eff6ff;
  padding: 10px 14px;
  margin: 12px 0;
  border-radius: 4px;
}
.isi {
  margin-top: 4px;
}
</style>