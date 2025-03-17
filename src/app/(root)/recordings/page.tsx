"use client";
import Loader from "@/components/custom/Loader";
import RecordingsCard from "@/components/custom/RecordingsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "@/hooks/use-get-calls";
import { CallRecording } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const RecordingsPage = () => {
  const { calls, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!calls) return;

      try {
        // Get recordings for each call
        const callData = await Promise.all(
          calls.map((call) => call.queryRecordings())
        );
        const allRecordings = callData.flatMap((call) => call.recordings);

        setRecordings(allRecordings);
      } catch (error) {
        console.error("🚀 ~ fetchRecordings ~ error:", error);
      }
    };

    fetchRecordings();
  }, [calls]);

  if (isLoading) return <Loader />;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* HEADER SECTION */}
      <h1 className="text-3xl font-bold">Recordings</h1>
      <p className="text-muted-foreground">
        {recordings.length}{" "}
        {recordings.length === 1 ? "recording" : "recordings"} available
      </p>

      {/* RECORDINGS GRID SECTION */}
      <ScrollArea className="h-[calc(100vh-12rem)] mt-3">
        {recordings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
            {recordings.map((recording) => (
              <RecordingsCard key={recording.end_time} recording={recording} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] gap-4">
            <p className="text-xl font-medium text-muted-foreground">
              No recordings available.
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default RecordingsPage;
