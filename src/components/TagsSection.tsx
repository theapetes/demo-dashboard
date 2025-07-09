import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface TagsSectionProps {
  tags: Array<{ name: string; severity: "mild" | "moderate" | "severe" }>;
}

export const TagsSection = ({ tags }: TagsSectionProps) => {
  const getSeverityColor = (severity: "mild" | "moderate" | "severe") => {
    switch (severity) {
      case "mild": return "bg-tag-mild text-foreground border-tag-mild/50";
      case "moderate": return "bg-tag-moderate text-foreground border-tag-moderate/50";
      case "severe": return "bg-tag-severe text-foreground border-tag-severe/50";
    }
  };

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Current Tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={`${getSeverityColor(tag.severity)} border-2`}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};