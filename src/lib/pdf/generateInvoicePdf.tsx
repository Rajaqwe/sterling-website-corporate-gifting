import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToStream } from "@react-pdf/renderer";
import { formatINR } from "@/lib/currency";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#333" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40, borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#0f172a" },
  meta: { textAlign: "right", color: "#64748b" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10, color: "#0f172a" },
  row: { flexDirection: "row", marginBottom: 5 },
  label: { width: 100, fontWeight: "bold" },
  value: { flex: 1 },
  table: { width: "auto", marginTop: 20, borderStyle: "solid", borderWidth: 1, borderColor: "#e2e8f0", borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableColHeader: { width: "25%", borderStyle: "solid", borderBottomWidth: 1, borderLeftWidth: 1, borderColor: "#e2e8f0", backgroundColor: "#f8fafc", padding: 5 },
  tableColHeaderLg: { width: "50%", borderStyle: "solid", borderBottomWidth: 1, borderLeftWidth: 1, borderColor: "#e2e8f0", backgroundColor: "#f8fafc", padding: 5 },
  tableCol: { width: "25%", borderStyle: "solid", borderBottomWidth: 1, borderLeftWidth: 1, borderColor: "#e2e8f0", padding: 5 },
  tableColLg: { width: "50%", borderStyle: "solid", borderBottomWidth: 1, borderLeftWidth: 1, borderColor: "#e2e8f0", padding: 5 },
  tableCellHeader: { fontSize: 10, fontWeight: "bold", color: "#475569" },
  tableCell: { fontSize: 10 },
  totals: { marginTop: 20, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 5, width: 200 },
  totalLabel: { width: 100, textAlign: "right", paddingRight: 10, color: "#64748b" },
  totalValue: { width: 100, textAlign: "right", fontWeight: "bold" },
  totalFinalLabel: { width: 100, textAlign: "right", paddingRight: 10, fontSize: 12, fontWeight: "bold", color: "#0f172a" },
  totalFinalValue: { width: 100, textAlign: "right", fontSize: 12, fontWeight: "bold", color: "#0f172a" },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, textAlign: "center", color: "#94a3b8", fontSize: 8, borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 10 }
});

const InvoiceDocument = ({ order }: { order: any }) => {
  const totalQuantity = order.items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>STERLING</Text>
            <Text style={{ color: "#64748b", marginTop: 4 }}>Premium Corporate Gifting</Text>
          </View>
          <View style={styles.meta}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#0f172a", marginBottom: 4 }}>TAX INVOICE</Text>
            <Text>{order.orderNumber || order.id}</Text>
            <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 30 }}>
          <View style={{ width: "45%" }}>
            <Text style={styles.sectionTitle}>Billed To:</Text>
            <Text style={{ fontWeight: "bold", marginBottom: 2 }}>{order.company?.name || order.user?.companyName || "Sterling Client"}</Text>
            <Text>{order.user?.name || order.user?.email}</Text>
            <Text>{order.billingAddress?.line1}</Text>
            {order.billingAddress?.line2 && <Text>{order.billingAddress?.line2}</Text>}
            <Text>{order.billingAddress?.city}, {order.billingAddress?.state} {order.billingAddress?.postalCode}</Text>
          </View>
          
          <View style={{ width: "45%" }}>
            <Text style={styles.sectionTitle}>Invoice Details:</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Invoice Date:</Text>
              <Text style={styles.value}>{new Date(order.createdAt).toLocaleDateString()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Payment Status:</Text>
              <Text style={styles.value}>{order.payments?.[0]?.status || "PENDING"}</Text>
            </View>
            {order.purchaseOrderNumber && (
              <View style={styles.row}>
                <Text style={styles.label}>PO Number:</Text>
                <Text style={styles.value}>{order.purchaseOrderNumber}</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Line Items</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderLg}><Text style={styles.tableCellHeader}>Product</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Quantity</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Unit Price</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Total</Text></View>
          </View>

          {order.items.map((item: any, i: number) => (
            <View style={styles.tableRow} key={i}>
              <View style={styles.tableColLg}>
                <Text style={styles.tableCell}>{item.productName || item.product?.name}</Text>
                {item.customizationDetails && <Text style={{ fontSize: 8, color: "#64748b", marginTop: 2 }}>{item.customizationDetails}</Text>}
              </View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{item.quantity}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatINR(Number(item.unitPrice))}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatINR(Number(item.totalPrice))}</Text></View>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal ({totalQuantity} items):</Text>
            <Text style={styles.totalValue}>{formatINR(Number(order.subtotal))}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax:</Text>
            <Text style={styles.totalValue}>{formatINR(Number(order.tax))}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping:</Text>
            <Text style={styles.totalValue}>{formatINR(Number(order.shippingCost))}</Text>
          </View>
          {Number(order.discount) > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount:</Text>
              <Text style={[styles.totalValue, { color: "#ef4444" }]}>-{formatINR(Number(order.discount))}</Text>
            </View>
          )}
          <View style={[styles.totalRow, { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#e2e8f0" }]}>
            <Text style={styles.totalFinalLabel}>Total Due:</Text>
            <Text style={styles.totalFinalValue}>{formatINR(Number(order.total))}</Text>
          </View>
        </View>

        {order.notes && (
          <View style={{ marginTop: 40 }}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={{ fontSize: 9, color: "#475569", lineHeight: 1.5 }}>{order.notes}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          Thank you for choosing Sterling Corporate Gifting. For billing inquiries, contact billing@sterling-gifts.com.
        </Text>
      </Page>
    </Document>
  );
};

export const generateInvoicePdfStream = async (order: any) => {
  return await renderToStream(<InvoiceDocument order={order} />);
};
