import ImagePrediction from '../components/image-prediction'
import PageTransition from '../components/page-transition'

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          <div className="flex flex-col items-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.ibb.co.com/W2j4T55/reversed-removebg-preview-1.png"
              alt="Plant Disease Detection Hero"
              className="w-48 h-48 object-contain mb-6 opacity-90"
            />
            <h1 className="text-4xl font-bold text-center">Prediksi Penyakit Tanaman</h1>
          </div>
          <ImagePrediction />
        </div>
      </div>
    </PageTransition>
  )
}
