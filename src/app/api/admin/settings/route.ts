import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const settings = await prisma.adminSetting.findMany();
    
    if (settings.length === 0) {
      const defaults = [
        { label: 'Email Notifications', enabled: true },
        { label: 'SMS Alerts', enabled: false },
        { label: 'Auto Route Optimization', enabled: true },
        { label: 'Maintenance Mode', enabled: false },
        { label: 'API Access', enabled: true },
      ];
      
      for (const setting of defaults) {
        await prisma.adminSetting.create({
          data: setting
        });
      }
      
      const newSettings = await prisma.adminSetting.findMany();
      return NextResponse.json(newSettings);
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const setting = await prisma.adminSetting.update({
      where: { label: body.label },
      data: { enabled: body.enabled }
    });
    return NextResponse.json(setting);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
  }
}
