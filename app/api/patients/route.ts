import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/patients - List patients
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hospitalId = searchParams.get("hospitalId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where = {
      ...(hospitalId && { hospitalId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { abhaId: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        include: {
          admissions: {
            where: { status: "ACTIVE" },
            take: 1,
            orderBy: { admittedAt: "desc" },
          },
          hospital: { select: { name: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: "desc" },
      }),
      prisma.patient.count({ where }),
    ]);

    return NextResponse.json({ patients, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}

// POST /api/patients - Create a patient
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, age, gender, hospitalId, phone, email, bloodGroup, address, emergencyContact, emergencyPhone, abhaId } = body;

    if (!name || !age || !gender || !hospitalId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const patient = await prisma.patient.create({
      data: { name, age, gender, hospitalId, phone, email, bloodGroup, address, emergencyContact, emergencyPhone, abhaId },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error("Failed to create patient:", error);
    return NextResponse.json({ error: "Failed to create patient" }, { status: 500 });
  }
}
