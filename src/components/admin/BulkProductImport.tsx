"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, CheckCircle2, XCircle, AlertTriangle, FileDown } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import { 
  validateBulkImportProducts, 
  confirmBulkImportProducts,
  type BulkImportValidationResult 
} from "@/app/(admin)/actions/bulk-import";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function BulkProductImport() {
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [validationResult, setValidationResult] = useState<BulkImportValidationResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setValidationResult(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim().toLowerCase(),
      complete: async (results) => {
        try {
          // Send parsed data for validation
          const validation = await validateBulkImportProducts(results.data);
          setValidationResult(validation);
          setShowPreview(true);
        } catch (error) {
          toast.error("An unexpected error occurred during validation.");
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

  const handleConfirmImport = async () => {
    if (!validationResult || validationResult.validRows.length === 0) {
      toast.error("No valid rows to import.");
      return;
    }

    setIsConfirming(true);
    try {
      const res = await confirmBulkImportProducts(validationResult.validRows);
      
      if (res.success) {
        toast.success(`Import complete: ${res.count} products added.`);
        setShowPreview(false);
        setValidationResult(null);
        window.location.reload();
      } else {
        toast.error(res.error || "Failed to import products");
      }
    } catch (error) {
      toast.error("An error occurred while saving products.");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <a
          href="/sample.csv"
          download="sample.csv"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-3.5 py-2 transition-colors text-muted-foreground hover:text-foreground shadow-xs gap-1.5"
          title="Download sample CSV template for bulk product import"
        >
          <FileDown className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Sample CSV</span>
        </a>

        <label className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer transition-colors shadow-xs gap-2">
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isUploading ? "Validating..." : "Bulk Import (CSV)"}
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={isUploading || isConfirming}
          />
        </label>
      </div>

      <Dialog open={showPreview} onOpenChange={(open) => !isConfirming && setShowPreview(open)}>
        <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Bulk Import Preview</DialogTitle>
            <DialogDescription className="flex items-center justify-between gap-2 flex-wrap">
              <span>Review the validation results before confirming the import. Only valid rows will be imported.</span>
              <a
                href="/sample.csv"
                download="sample.csv"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                <FileDown className="w-3.5 h-3.5" /> Download Sample CSV
              </a>
            </DialogDescription>
          </DialogHeader>
          
          {validationResult && (
            <div className="flex-1 overflow-hidden flex flex-col gap-4 mt-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-blue-50/50">
                  <span className="text-2xl font-bold text-blue-700">{validationResult.summary.total}</span>
                  <span className="text-xs font-medium text-blue-600 uppercase">Total Rows</span>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-emerald-50/50">
                  <span className="text-2xl font-bold text-emerald-700">{validationResult.summary.valid}</span>
                  <span className="text-xs font-medium text-emerald-600 uppercase">Valid & Ready</span>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-red-50/50">
                  <span className="text-2xl font-bold text-red-700">{validationResult.summary.invalid}</span>
                  <span className="text-xs font-medium text-red-600 uppercase">Errors Detected</span>
                </div>
              </div>

              {validationResult.invalidRows.length > 0 && (
                <div className="flex-1 flex flex-col min-h-0 border rounded-lg">
                  <div className="bg-red-50 px-4 py-2 border-b flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-sm text-red-800">Review Errors</span>
                    </div>
                    <a
                      href="/sample.csv"
                      download="sample.csv"
                      className="text-xs text-red-700 hover:text-red-900 underline font-medium flex items-center gap-1"
                    >
                      <FileDown className="w-3 h-3" /> Compare with Sample CSV
                    </a>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto max-h-[400px]">
                    <div className="space-y-4">
                      {validationResult.invalidRows.map((invalid, idx) => (
                        <div key={idx} className="text-sm border-b pb-3 last:border-0">
                          <div className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                            Row {invalid.row.sku || 'Unknown SKU'} 
                            <Badge variant="outline" className="text-xs font-normal border-red-200 text-red-700 bg-red-50">
                              {invalid.errors.length} errors
                            </Badge>
                          </div>
                          <ul className="list-disc pl-5 text-red-600 space-y-1">
                            {invalid.errors.map((err, errIdx) => (
                              <li key={errIdx}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)} disabled={isConfirming}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmImport} 
              disabled={isConfirming || (validationResult?.validRows.length === 0)}
              className="gap-2"
            >
              {isConfirming && <Loader2 className="w-4 h-4 animate-spin" />}
              {isConfirming ? "Importing..." : `Confirm & Import ${validationResult?.validRows.length || 0} Products`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
