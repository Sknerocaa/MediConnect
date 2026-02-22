import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/transfers - List transfers
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hospitalId = searchParams.get("hospitalId");
    const status = searchParams.get("status");
    const direction = searchParams.get("direction"); // "in" | "out" | "all"

    const where = {
      ...(status && { status: status as "PENDING" | "ACCEPTED" | "IN_TRANSIT" | "COMPLETED" | "REJECTED" | "CANCELLED" }),
      ...(hospitalId && direction === "in" && { toHospitalId: hospitalId }),
      ...(hospitalId && direction === "out" && { fromHospitalId: hospitalId }),
      ...(hospitalId && (!direction || direction === "all") && {
        OR: [{ fromHospitalId: hospitalId }, { toHospitalId: hospitalId }],
      }),
    };

    const transfers = await prisma.transfer.findMany({
      where,
      include: {
        patient: { select: { name: true, id: true, age: true, gender: true } },
        fromHospital: { select: { name: true, city: true } },
        toHospital: { select: { name: true, city: true } },
      },
      orderBy: { requestedAt: "desc" },
    });

    return NextResponse.json(transfers);
  } catch (error) {
    console.error("Failed to fetch transfers:", error);
    return NextResponse.json({ error: "Failed to fetch transfers" }, { status: 500 });
  }
}

// POST /api/transfers - Create transfer request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientId, fromHospitalId, toHospitalId, urgency, reason, notes } = body;

    if (!patientId || !fromHospitalId || !toHospitalId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transfer = await prisma.transfer.create({
      data: { patientId, fromHospitalId, toHospitalId, urgency: urgency || "NORMAL", reason, notes },
      include: {
        patient: { select: { name: true } },
        fromHospital: { select: { name: true } },
        toHospital: { select: { name: true } },
      },
    });

    return NextResponse.json(transfer, { status: 201 });
  } catch (error) {
    console.error("Failed to create transfer:", error);
    return NextResponse.json({ error: "Failed to create transfer" }, { status: 500 });
  }
}

// PATCH /api/transfers - Update transfer status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { transferId, status, ambulanceETA } = body;

    if (!transferId || !status) {
      return NextResponse.json({ error: "transferId and status required" }, { status: 400 });
    }

    const data: Record<string, unknown> = { status };
    if (status === "ACCEPTED") data.acceptedAt = new Date();
    if (status === "COMPLETED") data.completedAt = new Date();
    if (ambulanceETA !== undefined) data.ambulanceETA = ambulanceETA;

    const transfer = await prisma.transfer.update({
      where: { id: transferId },
      data,
      include: {
        patient: { select: { name: true } },
        fromHospital: { select: { name: true } },
        toHospital: { select: { name: true } },
      },
    });

    return NextResponse.json(transfer);
  } catch (error) {
    console.error("Failed to update transfer:", error);
    return NextResponse.json({ error: "Failed to update transfer" }, { status: 500 });
  }
}
