import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/hospitals - List all hospitals
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const active = searchParams.get("active");

    const hospitals = await prisma.hospital.findMany({
      where: {
        ...(city && { city }),
        ...(active !== null && { isActive: active === "true" }),
      },
      include: {
        _count: {
          select: {
            beds: true,
            patients: true,
            users: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(hospitals);
  } catch (error) {
    console.error("Failed to fetch hospitals:", error);
    return NextResponse.json({ error: "Failed to fetch hospitals" }, { status: 500 });
  }
}

// POST /api/hospitals - Create a new hospital
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, code, address, city, state, pincode, phone, email, totalBeds, license, latitude, longitude } = body;

    if (!name || !code || !address || !city || !state || !pincode || !phone || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.hospital.findUnique({ where: { code } });
    if (existing) {
      return NextResponse.json({ error: "Hospital code already exists" }, { status: 409 });
    }

    const hospital = await prisma.hospital.create({
      data: { name, code, address, city, state, pincode, phone, email, totalBeds: totalBeds || 0, license, latitude, longitude },
    });

    return NextResponse.json(hospital, { status: 201 });
  } catch (error) {
    console.error("Failed to create hospital:", error);
    return NextResponse.json({ error: "Failed to create hospital" }, { status: 500 });
  }
}
