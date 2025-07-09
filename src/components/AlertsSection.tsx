import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export const AlertsSection = () => {
  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground text-center py-4">
          No active alerts
        </div>
      </CardContent>
    </Card>
  );
};