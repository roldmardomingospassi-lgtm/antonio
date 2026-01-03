
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { DetailedRecipe, Recipe } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

export async function fetchRecipeDetails(recipe: Recipe): Promise<DetailedRecipe> {
  const ai = getGeminiClient();
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Forneça detalhes completos da receita africana: ${recipe.name} de ${recipe.origin}. 
    Inclua ingredientes, modo de preparo passo a passo e um parágrafo sobre a história cultural do prato. 
    Sugira também o termo exato para pesquisar no YouTube para ver este prato sendo feito.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
          history: { type: Type.STRING },
          youtubeQuery: { type: Type.STRING }
        },
        required: ["ingredients", "instructions", "history", "youtubeQuery"]
      }
    }
  });

  const data = JSON.parse(response.text);
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || "Fonte",
    uri: chunk.web?.uri || ""
  })) || [];

  return {
    ...recipe,
    ...data,
    googleSources: sources
  };
}

export async function generateHeroImage(prompt: string): Promise<string> {
  const ai = getGeminiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-end, professional culinary photograph of ${prompt}, vibrant colors, traditional African pottery, appetizing presentation, soft natural lighting.` }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (e) {
    console.error("Image generation failed", e);
  }
  return "https://picsum.photos/1200/600";
}
