import { normalizeProduct } from '@/app/lib/helpers/normalize';
import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = { id: string };

interface Context {
  params: Params | Promise<Params>;
}

export async function GET(request: NextRequest, context: Context) {
  const params = await context.params;
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: 'Product not found' }, { status: 404 });
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
  const { id } = await context.params;

  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: `Product ${id} deleted` });
  } catch {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}
