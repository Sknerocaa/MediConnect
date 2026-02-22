import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/emergency - List emergency alerts
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hospitalId = searchParams.get("hospitalId");
    const status = searchParams.get("status");
    const severity = searchParams.get("severity");

    const alerts = await prisma.emergencyAlert.findMany({
      where: {
        ...(hospitalId && { hospitalId }),
        ...(status && { status: status as "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED" | "EXPIRED" }),
        ...(severity && { severity: severity as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" }),
      },
      include: {
        hospital: { select: { name: true, city: true } },
      },
      orderBy: [{ severity: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 });
  }
}

// POST /api/emergency - Create an emergency alert
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hospitalId, type, severity, title, description } = body;

    if (!hospitalId || !type || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const alert = await prisma.emergencyAlert.create({
      data: {
        hospitalId,
        type,
        severity: severity || "MEDIUM",
        title,
        description,
      },
    });

    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error("Failed to create alert:", error);
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 });
  }
}
