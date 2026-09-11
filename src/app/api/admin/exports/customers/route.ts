import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { hasPermission } from "@/lib/auth/permissions";
import { getAuthUser } from "@/lib/auth/server";

export async function GET(req: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth || !auth.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowed = await hasPermission(auth.user.id, 'customers.read');
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const customers = await prisma.user.findMany({
      include: {
        companyInvitations: {
          include: { company: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const headers = ["ID", "Joined Date", "Full Name", "Email", "Role", "Is Verified", "Company Associations"];
    
    const rows = customers.map(customer => {
      const companies = customer.companyInvitations
        .filter(inv => inv.status === 'ACCEPTED')
        .map(inv => inv.company.name)
        .join('; ')
        .replace(/,/g, '');

      return [
        customer.id,
        new Date(customer.createdAt).toISOString(),
        (customer.fullName || '').replace(/,/g, ''),
        customer.email,
        customer.role,
        customer.emailVerified ? "Yes" : "No",
        companies || "None"
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="customers_export_${new Date().getTime()}.csv"`
      }
    });

  } catch (error) {
    console.error("Customers export failed:", error);
    return new NextResponse("Failed to generate export", { status: 500 });
  }
}
