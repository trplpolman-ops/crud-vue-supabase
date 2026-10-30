<script setup>
// 1. PROPS: data yang DITERIMA dari induk
defineProps({
  nama: { type: String, required: true },
  umur: { type: Number, default: 0 },
  kota: { type: String, default: '-' }
})
</script>

<template>
  <div class="kartu">
    <h3>{{ nama }}</h3>
    <p>Umur: {{ umur }} tahun</p>
    <p>Kota: {{ kota }}</p>
  </div>
</template>

<style scoped>
.kartu {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  width: 180px;
}
h3 {
  margin: 0 0 8px;
}
p {
  margin: 4px 0;
}
</style>