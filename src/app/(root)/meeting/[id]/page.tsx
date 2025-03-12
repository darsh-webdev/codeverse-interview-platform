"use client";
import Loader from "@/components/custom/Loader";
import MeetingRoom from "@/components/custom/MeetingRoom";
import MeetingSetup from "@/components/custom/MeetingSetup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetCallById from "@/hooks/use-get-call-by-id";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) {
    return (
      <div className="h-full mt-44 md:mt-60 flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary shadow-inner">
              Meeting Not Found
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Invalid meeting link. Please try again with a valid link.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {isSetupComplete ? (
          <MeetingRoom />
        ) : (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        )}
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;
