import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No CSV file uploaded." }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');

    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV file is empty or missing headers." }, { status: 400 });
    }

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    const requiredHeaders = ['name', 'address1', 'city', 'state', 'postalcode', 'phone'];
    
    for (const req of requiredHeaders) {
      if (!headers.includes(req)) {
        return NextResponse.json({ error: `Missing required column: ${req}` }, { status: 400 });
      }
    }

    const validAddresses = [];
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      if (!row['name'] || !row['address1'] || !row['city'] || !row['postalcode']) {
        errors.push(`Row ${i + 1}: Missing required fields.`);
      } else {
        validAddresses.push(row);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors, totalParsed: validAddresses.length });
    }

    // In a full implementation, you would store this grouping in the DB or session
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
