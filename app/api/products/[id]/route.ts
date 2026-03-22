import { normalizeProduct } from '@/app/lib/helpers/normalize';
import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Отримати один товар за id
export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  console.log('URL:', request.url);

  const { id } = context.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

// Оновити товар за id
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const data = await request.json();
  const normalized = normalizeProduct(data);

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: normalized,
    });
    return NextResponse.json(updatedProduct);
  } catch {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}

// Видалити товар за id
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ✅ розгортаємо проміс

  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: `Product ${id} deleted` });
  } catch {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}
