# deteksi_penyakit_tanaman

Aplikasi web untuk deteksi penyakit tanaman

Rencana Pembuatan WebApp

Stack : Next.js Frontend : React Backend : Typescript API : dari Python

Langkah :

User menekan tombol upload image
Setelah diupload, image dikirim ke python lewat post api
Python memproses image dan prediksi image
GET hasil prediksi dari python untuk ditampilkan di frontend
Untuk Model Python :

Download Dataset (PlantDoc)
Praproses image sesuai kebutuhan model agar akurasi mantap
Gunakan model yang sudah ada (Transfer Learning) atau buat sendiri
Train Model selama beberapa epoch
Prediksi gambar test
