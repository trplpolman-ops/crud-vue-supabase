<script setup>
import { reactive, ref, watch } from 'vue'

// PROPS: data yang diterima dari induk (BiodataView)
const props = defineProps({
  editItem: { type: Object, default: null }, // null = mode tambah
  loading: { type: Boolean, default: false }
})

// EMIT: kabar yang dikirim ke induk
const emit = defineEmits(['simpan', 'batal'])

const form = reactive({
  nama: '',
  alamat: '',
  noTelpon: '',
  gender: '',
  jenjangPendidikan: ''
})
const errors = ref({})

function reset() {
  form.nama = ''
  form.alamat = ''
  form.noTelpon = ''
  form.gender = ''
  form.jenjangPendidikan = ''
  errors.value = {}
}

// Saat induk memilih data untuk diedit, isi form dengan data itu
watch(
  () => props.editItem,
  (item) => {
    if (item) {
      form.nama = item.nama
      form.alamat = item.alamat
      form.noTelpon = item.noTelpon
      form.gender = item.gender
      form.jenjangPendidikan = item.jenjangPendidikan
      errors.value = {}
    } else {
      reset()
    }
  }
)

function validasi() {
  const baru = {}
  if (form.nama.trim() === '') baru.nama = 'Nama wajib diisi'
  if (form.alamat.trim() === '') baru.alamat = 'Alamat wajib diisi'
  errors.value = baru
  return Object.keys(baru).length === 0
}

function kirim() {
  if (!validasi()) return
  // Kirim salinan data ke induk. Induk yang mengurus penyimpanan ke Supabase.
  emit('simpan', { ...form })
}

// Supaya induk bisa mengosongkan form setelah berhasil menyimpan
defineExpose({ reset })
</script>

<template>
  <div class="form-container">
    <h2>{{ editItem ? 'Edit Biodata' : 'Form Biodata' }}</h2>

    <div class="field">
      <label>Nama</label>
      <input v-model="form.nama" type="text" placeholder="Masukkan Nama" />
      <span v-if="errors.nama" class="error">{{ errors.nama }}</span>
    </div>

    <div class="field">
      <label>Alamat</label>
      <input v-model="form.alamat" type="text" placeholder="Masukkan Alamat" />
      <span v-if="errors.alamat" class="error">{{ errors.alamat }}</span>
    </div>

    <div class="field">
      <label>No Telpon</label>
      <input v-model="form.noTelpon" type="tel" placeholder="Masukkan No Telpon" />
    </div>

    <div class="field">
      <label>Gender</label>
      <div class="radio-group">
        <label><input type="radio" value="Laki-Laki" v-model="form.gender" /> Laki-Laki</label>
        <label><input type="radio" value="Perempuan" v-model="form.gender" /> Perempuan</label>
      </div>
    </div>

    <div class="field">
      <label>Jenjang Pendidikan</label>
      <select v-model="form.jenjangPendidikan">
        <option value="" disabled>-- Pilih --</option>
        <option value="SD">SD</option>
        <option value="SMP">SMP</option>
        <option value="SMA">SMA</option>
        <option value="S1">S1</option>
        <option value="S2">S2</option>
        <option value="S3">S3</option>
      </select>
    </div>

    <div class="actions">
      <button class="btn btn-primary" :disabled="loading" @click="kirim">
        {{ editItem ? 'Update Data' : 'Simpan Data' }}
      </button>
      <button v-if="editItem" class="btn btn-secondary" @click="emit('batal')">
        Batal
      </button>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin-bottom: 30px;
}
.field {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.field > label {
  font-weight: bold;
}
.radio-group {
  display: flex;
  gap: 16px;
}
input,
select {
  padding: 6px;
}
.error {
  color: red;
  font-size: 0.85em;
}
.actions {
  display: flex;
  gap: 8px;
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
.btn-primary { background: #2563eb; }
.btn-secondary { background: #6b7280; }
</style>