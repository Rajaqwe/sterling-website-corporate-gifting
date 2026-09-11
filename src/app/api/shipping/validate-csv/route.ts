import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { getAuthUser } from "@/lib/auth/server";
import { z } from 'zod';

const shippingRowSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  address1: z.string().min(1, "Address is required").max(150, "Address is too long"),
  address2: z.string().max(100, "Address 2 is too long").optional().default(""),
  city: z.string().min(1, "City is required").max(100, "City is too long"),
  state: z.string().min(1, "State is required").max(50, "State is too long"),
  postalcode: z.string().min(1, "Postal code is required").max(20, "Postal code is too long"),
  phone: z.string().max(20, "Phone is too long").optional().default(""),
});

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth || !auth.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No CSV file uploaded." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 });
    }

    const text = await file.text();
    
    const parsed = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase()
    });

    if (parsed.errors.length > 0) {
      return NextResponse.json({ error: "Invalid CSV format.", details: parsed.errors }, { status: 400 });
    }

    const data = parsed.data as Record<string, string>[];

    if (data.length === 0) {
      return NextResponse.json({ error: "CSV file is empty or missing headers." }, { status: 400 });
    }

    if (data.length > 500) {
      return NextResponse.json({ error: "Too many rows. Maximum allowed is 500." }, { status: 400 });
    }

    const requiredHeaders = ['name', 'address1', 'city', 'state', 'postalcode'];
    const actualHeaders = parsed.meta.fields || [];
    
    for (const req of requiredHeaders) {
      if (!actualHeaders.includes(req)) {
        return NextResponse.json({ error: `Missing required column: ${req}` }, { status: 400 });
      }
    }

    const validAddresses = [];
    const errors = [];
    const seenHashes = new Set<string>();

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const trimmedRow: Record<string, string> = {};
      
      for (const [k, v] of Object.entries(row)) {
        trimmedRow[k] = String(v).trim();
      }

      const result = shippingRowSchema.safeParse(trimmedRow);
      
      if (!result.success) {
        const errorMessages = result.error.issues.map(e => e.message).join(', ');
        errors.push(`Row ${i + 2}: ${errorMessages}`);
      } else {
        const validated = result.data;
        const rowHash = `${validated.name}|${validated.address1}|${validated.city}|${validated.state}|${validated.postalcode}`.toLowerCase();
        
        if (seenHashes.has(rowHash)) {
          errors.push(`Row ${i + 2}: Duplicate address detected.`);
        } else {
          seenHashes.add(rowHash);
          validAddresses.push(validated);
        }
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors, totalParsed: validAddresses.length });
    }

    return NextResponse.json({ 
      success: true, 
      message: "CSV validated successfully.", 
      validAddressesCount: validAddresses.length,
      sample: validAddresses.slice(0, 2)
    });

  } catch (error) {
    console.error("CSV Validation error:", error);
    return NextResponse.json({ error: "Failed to process CSV." }, { status: 500 });
  }
}
