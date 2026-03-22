// const sendToAI = async () => {
//   if (!base64Image) return;

//   const res = await fetch('/api/ai', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       image: base64Image.replace(/^data:image\/\w+;base64,/, ''), // чистимо префікс
//       prompt: 'Опиши товар',
//     }),
//   });

//   const data = await res.json();
//   console.log(data);
// };
