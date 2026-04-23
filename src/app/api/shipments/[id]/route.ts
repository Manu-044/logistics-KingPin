import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const trackingNumber = params.id;
    const shipment = await prisma.shipment.findUnique({
      where: {
        trackingNumber: trackingNumber
      }
    });

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json(shipment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch shipment' }, { status: 500 });
  }
}
