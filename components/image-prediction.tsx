'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { predictImage } from '../app/actions/predict-image'

interface Prediction {
  class: string;
  confidence: number;
}

export default function ImagePrediction() {
  const [image, setImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageFile) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', imageFile)
      
      const result = await predictImage(formData)
      console.log('Prediction result:', result); // Debug log
      
      if (!result || !result[0]) {
        throw new Error('No prediction available');
      }
      
      setPrediction(result[0])
      
      // Store data in sessionStorage
      sessionStorage.setItem('plantImage', image!)
      sessionStorage.setItem('prediction', JSON.stringify(result[0]))
      router.push('/results')
    } catch (error) {
      console.error('Error during prediction:', error);
      setPrediction(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="image-upload" className="text-foreground">Unggah Gambar Tanaman</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 bg-input text-input-foreground"
            />
          </div>
          {image && (
            <div className="mt-4">
              <Image
                src={image}
                alt="Uploaded image"
                width={300}
                height={300}
                className="rounded-lg object-cover mx-auto"
              />
            </div>
          )}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={!image || isLoading}
              className="w-64 h-16 text-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? 'Memproses...' : 'Deteksi'}
            </Button>
          </div>
        </form>
        {prediction && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-foreground">Hasil Prediksi:</h2>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-lg">
                <span className="font-medium">Penyakit: </span>
                {prediction.class.replace(/_/g, ' ')}
              </p>
              <p className="text-lg mt-2">
                <span className="font-medium">Tingkat Keyakinan: </span>
                {(prediction.confidence * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
