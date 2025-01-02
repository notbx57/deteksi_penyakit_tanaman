# deteksi_penyakit_tanaman

Aplikasi web untuk deteksi penyakit tanaman

Cara Pakai :
1. clone github ini
2. install dependensinya (nextjs maupun python)
3. jalankan python_api/main.py
4. jalankan command npm run dev



Rencana Pembuatan WebApp

Stack : Next.js 

Frontend : React 

Backend : Typescript 

API : dari Python

Langkah :

1. User menekan tombol upload image
2. Setelah diupload, image dikirim ke python lewat post api
3. Python memproses image dan prediksi image
4. GET hasil prediksi dari python untuk ditampilkan di frontend

Untuk Model Python :

1. Download Dataset (PlantVillage)
2. Praproses image sesuai kebutuhan model agar akurasi mantap
3. Gunakan model yang sudah ada (Transfer Learning) atau buat sendiri
4. Train Model selama beberapa epoch
5. Save Model

6. Pake model di program terpisah
7. Buat server di python untuk kirim hasil prediksi lewat API
8. Serve program prediksi


