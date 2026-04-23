import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const shipments = await prisma.shipment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(shipments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch shipments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Auto-generate track number
    const uniqueId = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `LGX-2024-${uniqueId}`;

    // Status logic based on priority or default
    const status = 'pending';
    let estimatedDelivery = new Date();
    if (body.priority === 'urgent') estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);
    else if (body.priority === 'express') estimatedDelivery.setDate(estimatedDelivery.getDate() + 4);
    else estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        origin: body.origin,
        destination: body.destination,
        customer: body.customer,
        carrier: body.carrier,
        weight: Number(body.weight) || 0,
        description: body.description || '',
        priority: body.priority,
        status,
        progress: 0,
        estimatedDelivery: estimatedDelivery.toISOString().split('T')[0]
      }
    });

    return NextResponse.json(shipment, { status: 201 });
  } catch (error) {
    console.error('Create shipment error:', error);
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 });
  }
}
