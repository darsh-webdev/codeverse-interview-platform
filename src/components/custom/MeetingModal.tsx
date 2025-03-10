import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useMeetingActions from "@/hooks/use-meeting-actions";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  isJoinMeeting,
}: MeetingModalProps) => {
  const [meetingURL, setMeetingURL] = useState("");

  const { createInstantMeeting, joinMeeting } = useMeetingActions();

  const handleStart = () => {
    if (isJoinMeeting) {
      const meetingId = meetingURL.split("/").pop(); // If it's a ful URL extract the meeting ID
      if (meetingId) joinMeeting(meetingId);
    } else {
      createInstantMeeting();
    }

    setMeetingURL("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] min-h-36">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {isJoinMeeting && (
            <Input
              placeholder="Enter meeting link..."
              value={meetingURL}
              onChange={(e) => setMeetingURL(e.target.value)}
            />
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoinMeeting && !meetingURL.trim()}
            >
              {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
