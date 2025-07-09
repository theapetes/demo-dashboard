import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface MetricCardProps {
  title: string;
  value: string;
  status: "good" | "moderate" | "poor" | "positive" | "neutral" | "negative";
  type: "mood" | "sleep" | "food";
  trendData: Array<{ day: string; value: number }>;
  subtitle?: string;
}

export const MetricCard = ({ title, value, status, type, trendData, subtitle }: MetricCardProps) => {
  const getStatusColor = () => {
    if (type === "mood") {
      switch (status) {
        case "positive": return "bg-mood-positive border-mood-positive/50";
        case "neutral": return "bg-mood-neutral border-mood-neutral/50";
        case "negative": return "bg-mood-negative border-mood-negative/50";
      }
    } else {
      switch (status) {
        case "good": return `bg-${type}-good border-${type}-good/50`;
        case "moderate": return `bg-${type}-moderate border-${type}-moderate/50`;
        case "poor": return `bg-${type}-poor border-${type}-poor/50`;
      }
    }
  };

  const getStatusIcon = () => {
    if (type === "mood") {
      switch (status) {
        case "positive": return "😊";
        case "neutral": return "😐";
        case "negative": return "😞";
      }
    } else if (type === "sleep") {
      switch (status) {
        case "good": return "😴";
        case "moderate": return "🌙";
        case "poor": return "😪";
      }
    } else if (type === "food") {
      switch (status) {
        case "good": return "🍽️";
        case "moderate": return "🥄";
        case "poor": return "🫗";
      }
    }
  };

  return (
    <Card className={`${getStatusColor()} border-2 transition-all duration-200 hover:shadow-md`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="text-lg">{getStatusIcon()}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {subtitle && (
            <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
          )}
        </div>
        <div className="h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--chart-line))"
                strokeWidth={2}
                dot={false}
                fill="hsl(var(--chart-fill))"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};