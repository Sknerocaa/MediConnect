import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/beds - List beds with filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hospitalId = searchParams.get("hospitalId");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const ward = searchParams.get("ward");

    const beds = await prisma.bed.findMany({
      where: {
        ...(hospitalId && { hospitalId }),
        ...(type && { type: type as "GENERAL" | "ICU" | "VENTILATOR" | "NICU" | "PICU" | "ISOLATION" | "EMERGENCY" }),
        ...(status && { status: status as "AVAILABLE" | "OCCUPIED" | "RESERVED" | "MAINTENANCE" }),
        ...(ward && { ward }),
      },
      include: {
        hospital: { select: { name: true } },
        admissions: {
          where: { status: "ACTIVE" },
          include: { patient: { select: { name: true, id: true } } },
          take: 1,
        },
      },
      orderBy: [{ ward: "asc" }, { number: "asc" }],
    });

    return NextResponse.json(beds);
  } catch (error) {
    console.error("Failed to fetch beds:", error);
    return NextResponse.json({ error: "Failed to fetch beds" }, { status: 500 });
  }
}

// PATCH /api/beds - Update bed status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { bedId, status } = body;

    if (!bedId || !status) {
      return NextResponse.json({ error: "bedId and status required" }, { status: 400 });
    }

    const bed = await prisma.bed.update({
      where: { id: bedId },
      data: { status },
    });

    return NextResponse.json(bed);
  } catch (error) {
    console.error("Failed to update bed:", error);
    return NextResponse.json({ error: "Failed to update bed" }, { status: 500 });
  }
}
