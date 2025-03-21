import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import useMeetingActions from "@/hooks/use-meeting-actions";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type Interview = Doc<"interviews">;

const MeetingCard = ({ interview }: { interview: Interview }) => {
  const { joinMeeting } = useMeetingActions();

  const status = getMeetingStatus(interview);
  const formattedDate = format(
    new Date(interview.startTime),
    "EEEE, MMMM d · h:mm a"
  );

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="size-4" />
            {formattedDate}
          </div>
          <Badge
            variant={
              status === "live"
                ? "default"
                : status === "upcoming"
                  ? "secondary"
                  : "outline"
            }
          >
            {status === "live"
              ? "Live Now"
              : status === "upcoming"
                ? "Upcoming"
                : "Completed"}
          </Badge>
        </div>
        <CardTitle>{interview.title}</CardTitle>
        {interview.description && (
          <CardDescription className="line-clamp-2">
            {interview.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {status === "live" && (
          <Button
            className="w-full"
            onClick={() => joinMeeting(interview.streamCallId)}
          >
            Join Meeting
          </Button>
        )}

        {status === "upcoming" && (
          <Button className="w-full" variant="secondary" disabled>
            Waiting to start
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
