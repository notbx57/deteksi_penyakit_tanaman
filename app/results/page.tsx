'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import PageTransition from '@/components/page-transition'

interface Prediction {
  class: string;
  confidence: number;
}

export default function ResultsPage() {
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const storedPrediction = sessionStorage.getItem('prediction')
    const storedImage = sessionStorage.getItem('plantImage')
    
    if (storedPrediction) {
      setPrediction(JSON.parse(storedPrediction))
    }
    if (storedImage) {
      setImageUrl(storedImage)
    }
  }, [])

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-2xl bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Hasil Deteksi Penyakit Tanaman</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {imageUrl && (
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Uploaded plant" className="rounded-lg max-h-64 object-cover" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold mb-2">Prediksi Penyakit</h2>
              {prediction ? (
                <div className="space-y-2">
                  <p className="text-lg"><span className="font-medium">Kelas:</span> {prediction.class.replace(/_/g, ' ')}</p>
                  <p className="text-lg"><span className="font-medium">Confidence Rate:</span> {(prediction.confidence).toFixed(2)}%</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Tidak ada prediksi yang tersedia.</p>
              )}
            </div>
            <div className="flex justify-center">
              <Link href="/">
                <Button variant="default">
                  Kembali ke Halaman Utama
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
