import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface LastInteractionCardProps {
  timeAgo: string;
}

export const LastInteractionCard = ({ timeAgo }: LastInteractionCardProps) => {
  return (
    <Card className="border-2 bg-primary/10 border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Last Interaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold text-foreground">{timeAgo}</div>
        <div className="text-xs text-muted-foreground mt-1">
          Companion conversation
        </div>
      </CardContent>
    </Card>
  );
};