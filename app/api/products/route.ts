import { normalizeProduct } from '@/app/lib/helpers/normalize';
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const data = await request.json();
  const normalized = normalizeProduct(data);

  const existing = await prisma.product.findFirst({
    where: { name: normalized.name },
  });

  if (existing) {
    return NextResponse.json(
      {
        error: 'Такий товар вже існує',
        existing,
      },
      { status: 409 },
    );
  }

  const newProduct = await prisma.product.create({
    data: normalized,
  });

  return NextResponse.json(newProduct);
}
