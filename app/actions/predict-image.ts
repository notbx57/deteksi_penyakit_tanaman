'use server'

interface PredictionResponse {
  class: string;
  confidence: number;
}

export async function predictImage(formData: FormData): Promise<PredictionResponse[]> {
  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to get prediction from API');
    }

    const result = await response.json();
    console.log('Prediction API response:', result); // Debug log
    
    // Ensure we're returning the result in the expected format
    if (!result.class || !result.confidence) {
      throw new Error('Invalid prediction response format');
    }
    
    // Convert single prediction object to array format
    return [{
      class: result.class,
      confidence: result.confidence
    }];
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error('Failed to analyze image');
  }
}
