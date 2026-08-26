import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Platform Settings</h1>
        <p className="mt-2 text-slate-500">Configure global preferences for the Sterling B2B Portal.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Update the primary contact information displayed on invoices and quotes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input defaultValue="Sterling Corporate Gifting" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@sterlinggifting.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input defaultValue="+1 (800) 555-0199" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Settings</CardTitle>
            <CardDescription>Configure default taxes, minimums, and shipping costs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Tax Rate (%)</Label>
              <Input defaultValue="18.0" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Minimum Order Quantity</Label>
              <Input defaultValue="25" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Standard Flat Shipping (₹)</Label>
              <Input defaultValue="500" type="number" />
            </div>
            <Button>Update Order Config</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
