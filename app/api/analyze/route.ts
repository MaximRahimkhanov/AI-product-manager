import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const aiPrompt = `
Ти — асистент менеджера складу.
Поверни тільки JSON без пояснень:

{
"name": "назва",
"quantity": число,
"category": "категорія",
"description": "опис"
}
`;

    const result = await model.generateContent([
      { text: aiPrompt },
      {
        inlineData: {
          data: image,
          mimeType: 'image/jpeg',
        },
      },
    ]);

    const responseText = result.response.text();
    const cleanJson = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const aiResult = JSON.parse(cleanJson);

    return Response.json(aiResult);
  } catch (error) {
    console.error('AI error:', error);

    return Response.json({
      name: 'Тестовий товар',
      quantity: 5,
      category: 'Тестова категорія',
      description: 'Це опис для тесту — fallback заглушка',
    });
  }
}
