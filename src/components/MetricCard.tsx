import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";

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
        case "positive": return "border-mood-positive/50";
        case "neutral": return "border-mood-neutral/50";
        case "negative": return "border-mood-negative/50";
      }
    } else {
      switch (status) {
        case "good": return `border-${type}-good/50`;
        case "moderate": return `border-${type}-moderate/50`;
        case "poor": return `border-${type}-poor/50`;
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
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis hide domain={[1, 10]} />
              <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" opacity={0.3} />
              <ReferenceLine 
                y={7.5} 
                stroke="hsl(var(--chart-good))" 
                strokeDasharray="4 4" 
                opacity={0.7}
              />
              <ReferenceLine 
                y={5} 
                stroke="hsl(var(--chart-moderate))" 
                strokeDasharray="4 4" 
                opacity={0.7}
              />
              <ReferenceLine 
                y={2.5} 
                stroke="hsl(var(--chart-poor))" 
                strokeDasharray="4 4" 
                opacity={0.7}
              />
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-line))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-line))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--chart-line))"
                strokeWidth={2}
                dot={false}
                fill="url(#chartGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};