import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/inventory
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hospitalId = searchParams.get("hospitalId");
    const category = searchParams.get("category");
    const lowStock = searchParams.get("lowStock");

    const items = await prisma.inventoryItem.findMany({
      where: {
        ...(hospitalId && { hospitalId }),
        ...(category && { category: category as "MEDICINE" | "CONSUMABLE" | "EQUIPMENT" | "BLOOD" }),
      },
      include: {
        hospital: { select: { name: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}

// POST /api/inventory - Add inventory item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, quantity, unit, hospitalId, expiryDate, minStock, location } = body;

    if (!name || !category || !unit || !hospitalId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const item = await prisma.inventoryItem.create({
      data: {
        name,
        category,
        quantity: quantity || 0,
        unit,
        hospitalId,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        minStock: minStock || 10,
        location,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Failed to create inventory item:", error);
    return NextResponse.json({ error: "Failed to create inventory item" }, { status: 500 });
  }
}
