"use client";

import { useState, useTransition } from "react";
import { Camera, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { createProjectGalleryItem, deleteProjectGalleryItem, updateProjectGalleryItem, ProjectGalleryPayload } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Item = ProjectGalleryPayload & { id: string; createdAt: string; updatedAt: string };

const EMPTY: ProjectGalleryPayload = {
  title: "",
  description: "",
  imageUrl: "",
  altText: "",
  projectType: "",
  clientName: "",
  quantityLabel: "",
  deliveryLabel: "",
  isPublished: false,
  sortOrder: 0,
};

export function ProjectGalleryManager({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState<ProjectGalleryPayload>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = editingId
        ? await updateProjectGalleryItem(editingId, draft)
        : await createProjectGalleryItem(draft);

      if (!result.success) {
        setMessage(result.error || "Could not save this project.");
        return;
      }

      window.location.reload();
    });
  };

  const edit = (item: Item) => {
    setEditingId(item.id);
    setDraft({ ...item });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = (id: string) => {
    if (!window.confirm("Delete this project gallery item?")) return;
    startTransition(async () => {
      const result = await deleteProjectGalleryItem(id);
      if (!result.success) {
        setMessage(result.error || "Could not delete this project.");
        return;
      }
      setItems((current) => current.filter((item) => item.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setDraft(EMPTY);
      }
    });
  };

  const field = (key: keyof ProjectGalleryPayload) => ({
    value: String(draft[key] ?? ""),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft((current) => ({ ...current, [key]: e.target.value })),
  });

  return (
    <div className="space-y-6">
      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Camera className="h-5 w-5 text-accent" />
            {editingId ? "Edit project" : "Add real project"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground">Title *</label>
            <Input className="mt-2" placeholder="e.g. Employee welcome kit rollout" {...field("title")} />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground">Public image URL *</label>
            <Input className="mt-2" placeholder="https://..." {...field("imageUrl")} />
            <p className="mt-1 text-xs text-muted-foreground">Use the actual project photo or approved delivery image. Do not upload stock/AI imagery here.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Project type</label>
            <Input className="mt-2" placeholder="Employee gifting / Event / Client gifting" {...field("projectType")} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Approved client label</label>
            <Input className="mt-2" placeholder="Optional — only if approved" {...field("clientName")} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Quantity</label>
            <Input className="mt-2" placeholder="e.g. 500 kits" {...field("quantityLabel")} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Delivery context</label>
            <Input className="mt-2" placeholder="e.g. Pan-India" {...field("deliveryLabel")} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea className="mt-2" placeholder="What was produced, branded or delivered?" {...field("description")} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground">Alt text</label>
            <Input className="mt-2" placeholder="Describe the actual photo for accessibility" {...field("altText")} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Display order</label>
            <Input className="mt-2" type="number" min="0" value={draft.sortOrder} onChange={(e) => setDraft((current) => ({ ...current, sortOrder: Number(e.target.value) || 0 }))} />
          </div>
          <label className="flex items-center gap-3 rounded-xl border border-border/70 bg-card/60 p-4">
            <Checkbox checked={draft.isPublished} onCheckedChange={(checked) => setDraft((current) => ({ ...current, isPublished: Boolean(checked) }))} />
            <span>
              <span className="block text-sm font-semibold text-foreground">Publish publicly</span>
              <span className="block text-xs text-muted-foreground">Only publish approved real project content.</span>
            </span>
          </label>

          {message && <p className="md:col-span-2 text-sm font-medium text-red-600 dark:text-red-400">{message}</p>}

          <div className="md:col-span-2 flex flex-wrap gap-3">
            <Button onClick={save} disabled={pending || !draft.title || !draft.imageUrl} className="btn-primary">
              {pending ? "Saving..." : editingId ? <><Save className="mr-2 h-4 w-4" /> Save changes</> : <><Plus className="mr-2 h-4 w-4" /> Add project</>}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={() => { setEditingId(null); setDraft(EMPTY); }} disabled={pending}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.length === 0 ? (
          <Card className="border-dashed border-border/70 md:col-span-2 xl:col-span-3">
            <CardContent className="flex flex-col items-center justify-center py-14 text-center">
              <Camera className="h-10 w-10 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">No project photos yet</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Add your actual production, packaging or delivery photos above. Nothing is shown on the customer-facing site until it is published.
              </p>
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="overflow-hidden border-border/70">
              <div className="aspect-[4/3] bg-muted">
                <img src={item.imageUrl} alt={item.altText || item.title} className="h-full w-full object-cover" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.projectType || "Project"}</p>
                  </div>
                  <span className={item.isPublished ? "rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300" : "rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"}>
                    {item.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => edit(item)} disabled={pending}>
                    <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(item.id)} disabled={pending} className="text-red-600 hover:text-red-700">
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
