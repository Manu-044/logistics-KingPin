import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, password, company } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const existingEmployee = await db.employee.findUnique({
      where: { email },
    });

    if (existingEmployee) {
      return NextResponse.json({ message: 'Email reserved for employee accounts' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company,
      },
    });

    return NextResponse.json({ message: 'User registered successfully', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}
