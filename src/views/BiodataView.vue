<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import BiodataForm from '../components/BiodataForm.vue'
import BiodataTable from '../components/BiodataTable.vue'

const daftarData = ref([])
const editItem = ref(null)
const loading = ref(false)
const pesanError = ref('')
const kataKunci = ref('')
const formRef = ref(null) // referensi ke komponen BiodataForm

// COMPUTED: daftar yang sudah disaring. Otomatis dihitung ulang
// setiap kali daftarData atau kataKunci berubah.
const dataTersaring = computed(() => {
  const kunci = kataKunci.value.trim().toLowerCase()
  if (kunci === '') return daftarData.value

  return daftarData.value.filter(
    (item) =>
      item.nama.toLowerCase().includes(kunci) ||
      item.alamat.toLowerCase().includes(kunci) ||
      item.jenjangPendidikan.toLowerCase().includes(kunci)
  )
})

// Konversi baris database (snake_case) ke bentuk form (camelCase)
function dariDb(row) {
  return {
    id: row.id,
    nama: row.nama,
    alamat: row.alamat,
    noTelpon: row.no_telpon ?? '',
    gender: row.gender ?? '',
    jenjangPendidikan: row.jenjang_pendidikan ?? ''
  }
}

function keDb(data) {
  return {
    nama: data.nama.trim(),
    alamat: data.alamat.trim(),
    no_telpon: data.noTelpon || null,
    gender: data.gender || null,
    jenjang_pendidikan: data.jenjangPendidikan || null
  }
}

// READ
async function ambilData() {
  loading.value = true
  pesanError.value = ''

  const { data, error } = await supabase
    .from('biodata')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    pesanError.value = 'Gagal mengambil data: ' + error.message
  } else {
    daftarData.value = data.map(dariDb)
  }
  loading.value = false
}

// CREATE & UPDATE (dipanggil saat form mengirim event "simpan")
async function simpanData(dataForm) {
  loading.value = true
  pesanError.value = ''

  let error
  if (editItem.value === null) {
    ;({ error } = await supabase.from('biodata').insert(keDb(dataForm)))
  } else {
    ;({ error } = await supabase
      .from('biodata')
      .update(keDb(dataForm))
      .eq('id', editItem.value.id))
  }

  if (error) {
    pesanError.value = 'Gagal menyimpan data: ' + error.message
    loading.value = false
    return
  }

  editItem.value = null
  formRef.value.reset()
  await ambilData()
}

// Dipanggil saat tabel mengirim event "edit"
function mulaiEdit(item) {
  editItem.value = item
}

function batalEdit() {
  editItem.value = null
}

// DELETE (dipanggil saat tabel mengirim event "hapus")
async function hapusData(id) {
  if (!confirm('Yakin ingin menghapus data ini?')) return

  loading.value = true
  pesanError.value = ''

  const { error } = await supabase.from('biodata').delete().eq('id', id)

  if (error) {
    pesanError.value = 'Gagal menghapus data: ' + error.message
    loading.value = false
    return
  }

  if (editItem.value?.id === id) editItem.value = null
  await ambilData()
}

onMounted(ambilData)
</script>

<template>
  <div class="container">
    <p v-if="pesanError" class="error">{{ pesanError }}</p>

    <BiodataForm
      ref="formRef"
      :edit-item="editItem"
      :loading="loading"
      @simpan="simpanData"
      @batal="batalEdit"
    />

    <h3>Data Biodata</h3>

    <input
      v-model="kataKunci"
      class="cari"
      type="search"
      placeholder="Cari nama, alamat, atau jenjang..."
    />
    <p class="info">Menampilkan {{ dataTersaring.length }} dari {{ daftarData.length }} data</p>

    <BiodataTable
      :items="dataTersaring"
      :loading="loading"
      :ada-pencarian="kataKunci.trim() !== ''"
      @edit="mulaiEdit"
      @hapus="hapusData"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  font-family: sans-serif;
}
.error {
  color: red;
  font-size: 0.9em;
}
.cari {
  width: 100%;
  max-width: 400px;
  padding: 8px;
  margin-bottom: 4px;
  box-sizing: border-box;
}
.info {
  margin: 4px 0 12px;
  font-size: 0.85em;
  color: #6b7280;
}
</style>