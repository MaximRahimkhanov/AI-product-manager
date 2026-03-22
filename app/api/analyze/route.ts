// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { prisma } from '@/app/lib/prisma';

// export async function POST(req: Request) {
//   try {
//     const { image, prompt } = await req.json();
//     console.log(image, prompt);

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

//     const aiPrompt = `
// Ти — асистент менеджера складу.
// Поверни тільки JSON без пояснень:

// {
// "name": "назва",
// "quantity": число,
// "category": "категорія",
// "description": "опис"
// }
// `;

//     const result = await model.generateContent([
//       { text: aiPrompt },
//       {
//         inlineData: {
//           data: image,
//           mimeType: 'image/jpeg',
//         },
//       },
//     ]);

//     const responseText = result.response.text();

//     const cleanJson = responseText
//       .replace(/```json/g, '')
//       .replace(/```/g, '')
//       .trim();

//     let aiResult;

//     try {
//       aiResult = JSON.parse(cleanJson);
//     } catch {
//       throw new Error('AI повернув невалідний JSON');
//     }

//     const savedInDb = await prisma.product.create({
//       data: {
//         name: aiResult.name || 'Без назви',
//         quantity: Number(aiResult.quantity) || 1,
//         category: aiResult.category || null,
//         description: aiResult.description || null,
//       },
//     });

//     return Response.json(savedInDb);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('ERROR:', error);
//       return Response.json({ error: error.message }, { status: 500 });
//     }
//     return Response.json({ error: String(error) }, { status: 500 });
//   }
// }
// import { GoogleGenerativeAI } from '@google/generative-ai';

// export async function POST(req: Request) {
//   try {
//     const { image } = await req.json();

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

//     const aiPrompt = `
// Ти — асистент менеджера складу.
// Поверни тільки JSON без пояснень:

// {
// "name": "назва",
// "quantity": число,
// "category": "категорія",
// "description": "опис"
// }
// `;

//     const result = await model.generateContent([
//       { text: aiPrompt },
//       {
//         inlineData: {
//           data: image,
//           mimeType: 'image/jpeg',
//         },
//       },
//     ]);

//     const responseText = result.response.text();
//     const cleanJson = responseText
//       .replace(/```json/g, '')
//       .replace(/```/g, '')
//       .trim();

//     const aiResult = JSON.parse(cleanJson);

//     console.log('resultAI', aiResult);

//     return Response.json(aiResult);
//   } catch (error) {
//     return Response.json({ error: 'AI parsing error' }, { status: 500 });
//   }
// }
export async function POST(req: Request) {
  const { image } = await req.json();

  // тут можна або викликати AI, або повернути mock JSON
  return Response.json({
    name: 'Тестовий товар',
    quantity: 5,
    category: 'Тестова категорія',
    description: 'Це опис для тесту новий товар із мок',
  });
}
