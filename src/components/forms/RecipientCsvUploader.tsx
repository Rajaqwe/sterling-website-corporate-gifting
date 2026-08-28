"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, X } from "lucide-react";

interface CsvRow {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export function RecipientCsvUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setIsProcessing(true);
    setErrors([]);
    setRows([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processCsv(text);
    };
    reader.onerror = () => {
      setErrors(["Failed to read file. Please try again."]);
      setIsProcessing(false);
    };
    reader.readAsText(selectedFile);
  };

  const processCsv = (text: string) => {
    try {
      const lines = text.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        setErrors(["File appears to be empty or missing data rows."]);
        setIsProcessing(false);
        return;
      }

      // Basic manual parsing (MVP)
      const parsedRows: CsvRow[] = [];
      const rowErrors: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        // Handle basic commas, ignoring quoted commas (very rudimentary parse)
        const cols = lines[i].split(',').map(col => col.trim());
        
        if (cols.length < 5) {
          rowErrors.push(`Row ${i}: Missing required columns.`);
          continue;
        }

        const row: CsvRow = {
          name: cols[0],
          address: cols[1],
          city: cols[2],
          state: cols[3],
          postalCode: cols[4]
        };

        if (!row.name || !row.address || !row.postalCode) {
          rowErrors.push(`Row ${i}: Name, Address, and Postal Code are required.`);
        } else {
          parsedRows.push(row);
        }
      }

      setRows(parsedRows);
      if (rowErrors.length > 0) {
        setErrors(rowErrors.slice(0, 5).concat(rowErrors.length > 5 ? [`...and ${rowErrors.length - 5} more errors`] : []));
      }
    } catch (e) {
      setErrors(["Error parsing CSV format. Please ensure it matches the template."]);
    }
    setIsProcessing(false);
  };

  const clearFile = () => {
    setFile(null);
    setRows([]);
    setErrors([]);
  };

  const downloadTemplate = () => {
    const header = "Name,Address,City,State,Postal Code\n";
    const example = "John Doe,123 Business Pkwy,Mumbai,MH,400001\n";
    const blob = new Blob([header + example], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "sterling_recipients_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 border border-border/60 rounded-xl p-5 bg-background">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-primary">Multi-Recipient Addresses</h3>
          <p className="text-xs text-muted-foreground mt-1">Upload a CSV for direct-to-employee shipping.</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={downloadTemplate}>
          <FileText className="h-4 w-4 mr-2" /> Template
        </Button>
      </div>

      {!file ? (
        <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-accent hover:bg-accent/5 transition-colors rounded-lg p-8">
          <UploadCloud className="h-8 w-8 text-muted-foreground mb-3" />
          <span className="text-sm font-semibold">Click to upload CSV</span>
          <span className="text-xs text-muted-foreground mt-1">Max 500 recipients per file</span>
          <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
        </label>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-accent" />
              <div>
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground block">{rows.length} valid rows found</span>
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={clearFile} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {errors.length > 0 && (
            <div className="p-3 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-900/50 text-xs">
              <div className="flex items-center gap-2 font-bold mb-2">
                <AlertTriangle className="h-4 w-4" /> Validation Errors Found
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {rows.length > 0 && errors.length === 0 && (
            <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-900/50 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <strong>Perfect!</strong> All rows parsed successfully.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
