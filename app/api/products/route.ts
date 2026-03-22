// Це бекенд-код! Він працює на сервері.
import { normalizeProduct } from '@/app/lib/helpers/normalize';
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

// Метод GET - отримати всі товари з бази
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// Метод POST - створити новий товар (сюди прийдуть дані від ШІ)
export async function POST(request: Request) {
  const data = await request.json();
  const normalized = normalizeProduct(data);

  // 🔹 Duplicate detection
  const existing = await prisma.product.findFirst({
    where: { name: normalized.name },
  });

  if (existing) {
    return NextResponse.json(
      {
        error: 'Такий товар вже існує',
        existing,
      },
      { status: 409 }, // 409 Conflict
    );
  }

  // 🔹 Якщо не існує — створюємо
  const newProduct = await prisma.product.create({
    data: normalized,
  });

  return NextResponse.json(newProduct);
}
