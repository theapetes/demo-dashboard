import { MetricCard } from "@/components/MetricCard";
import { AlertsSection } from "@/components/AlertsSection";
import { TagsSection } from "@/components/TagsSection";
import { LastInteractionCard } from "@/components/LastInteractionCard";
import { EventCalendar } from "@/components/EventCalendar";
import { Heart, User } from "lucide-react";

const Index = () => {
  // Sample trend data for the past 14 days
  const moodTrendData = [
    { day: "1", value: 7 },
    { day: "2", value: 8 },
    { day: "3", value: 6 },
    { day: "4", value: 9 },
    { day: "5", value: 8 },
    { day: "6", value: 7 },
    { day: "7", value: 8 },
    { day: "8", value: 9 },
    { day: "9", value: 8 },
    { day: "10", value: 7 },
    { day: "11", value: 8 },
    { day: "12", value: 9 },
    { day: "13", value: 8 },
    { day: "14", value: 8 }
  ];

  const sleepTrendData = [
    { day: "1", value: 7 },
    { day: "2", value: 7 },
    { day: "3", value: 6 },
    { day: "4", value: 6 },
    { day: "5", value: 7 },
    { day: "6", value: 6 },
    { day: "7", value: 5 },
    { day: "8", value: 6 },
    { day: "9", value: 5 },
    { day: "10", value: 6 },
    { day: "11", value: 5 },
    { day: "12", value: 5 },
    { day: "13", value: 4 },
    { day: "14", value: 5 }
  ];

  const foodTrendData = [
    { day: "1", value: 8 },
    { day: "2", value: 9 },
    { day: "3", value: 7 },
    { day: "4", value: 8 },
    { day: "5", value: 9 },
    { day: "6", value: 8 },
    { day: "7", value: 8 },
    { day: "8", value: 9 },
    { day: "9", value: 8 },
    { day: "10", value: 8 },
    { day: "11", value: 9 },
    { day: "12", value: 8 },
    { day: "13", value: 9 },
    { day: "14", value: 8 }
  ];

  const sampleTags = [
    { name: "mild confusion", severity: "mild" as const }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Senior Health Dashboard</h1>
              <p className="text-sm text-muted-foreground">Monitoring well-being through companion interactions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="text-sm">Caretaker View</span>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Mood"
            value="Positive"
            status="positive"
            type="mood"
            trendData={moodTrendData}
          />
          <MetricCard
            title="Sleep Quality"
            value="Moderate"
            status="moderate"
            type="sleep"
            trendData={sleepTrendData}
            subtitle="too hot to sleep"
          />
          <MetricCard
            title="Nutrition"
            value="Good"
            status="good"
            type="food"
            trendData={foodTrendData}
            subtitle="ate eggs this morning"
          />
        </div>

        {/* Secondary Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LastInteractionCard timeAgo="2 minutes ago" />
          <AlertsSection />
          <TagsSection tags={sampleTags} />
        </div>

        {/* Summary Note */}
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-2">Today's Summary</h3>
          <p className="text-sm text-muted-foreground">
            Senior reported eating eggs this morning and is showing positive mood indicators. 
            Sleep quality has been declining slightly over the past three days due to temperature concerns. 
            Mild confusion episodes have been noted during recent interactions. Margaret confused Anne Frank with Anne Bolyn when discussing the history of the Tudors.
          </p>
        </div>

        {/* Event Calendar */}
        <EventCalendar />
      </div>
    </div>
  );
};

export default Index;