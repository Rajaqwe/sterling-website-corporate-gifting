"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import { bulkImportProducts } from "@/app/(admin)/actions/bulk-import";

export function BulkProductImport() {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ success: number; failed: number } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setResult(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          // Send parsed data to server action
          const res = await bulkImportProducts(results.data);
          if (res.success) {
            const count = res.count || 0;
            const failedCount = res.failedCount || 0;
            setResult({ success: count, failed: failedCount });
            toast.success(`Import complete: ${count} products added.`);
            
            // Reload page to show new products
            if (count > 0) {
              window.location.reload();
            }
          } else {
            toast.error(res.error || "Failed to import products");
          }
        } catch (error) {
          toast.error("An unexpected error occurred during import.");
        } finally {
          setIsUploading(false);
          // Reset file input
          e.target.value = '';
        }
      },
      error: (error) => {
        toast.error(`CSV Parsing error: ${error.message}`);
        setIsUploading(false);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <label className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer transition-colors">
        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
        {isUploading ? "Importing..." : "Bulk Import (CSV)"}
        <input 
          type="file" 
          accept=".csv" 
          className="hidden" 
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </label>

      {result && (
        <span className="text-xs flex items-center text-emerald-600 font-medium">
          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
          {result.success} added {result.failed > 0 && `(${result.failed} failed)`}
        </span>
      )}
    </div>
  );
}
