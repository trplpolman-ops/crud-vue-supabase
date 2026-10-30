<script setup>
// PROPS: data yang akan ditampilkan
defineProps({
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  adaPencarian: { type: Boolean, default: false } // untuk pesan saat hasil kosong
})

// EMIT: tombol Edit dan Hapus memberi kabar ke induk
const emit = defineEmits(['edit', 'hapus'])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Alamat</th>
        <th>No Telpon</th>
        <th>Gender</th>
        <th>Jenjang Pendidikan</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading && items.length === 0">
        <td colspan="7" class="kosong">Memuat data...</td>
      </tr>
      <tr v-else-if="items.length === 0">
        <td colspan="7" class="kosong">
          {{ adaPencarian ? 'Tidak ada data yang cocok' : 'Belum ada data' }}
        </td>
      </tr>
      <tr v-for="(item, index) in items" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.nama }}</td>
        <td>{{ item.alamat }}</td>
        <td>{{ item.noTelpon }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.jenjangPendidikan }}</td>
        <td>
          <button class="btn btn-edit" :disabled="loading" @click="emit('edit', item)">Edit</button>
          <button class="btn btn-delete" :disabled="loading" @click="emit('hapus', item.id)">Hapus</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background: #f3f4f6;
}
.kosong {
  text-align: center;
  color: #888;
}
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-edit { background: #f59e0b; margin-right: 4px; }
.btn-delete { background: #dc2626; }
</style>