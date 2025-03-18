"use client";
import React from "react";
import InterviewScheduleUI from "./InterviewScheduleUI";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/use-user-role";
import Loader from "@/components/custom/Loader";

const SchedulePage = () => {
  const router = useRouter();
  const { isInterviewer, isLoading } = useUserRole();

  if (isLoading) return <Loader />;
  if (!isInterviewer) return router.push("/");

  return <InterviewScheduleUI />;
};

export default SchedulePage;
