"use client";
import ActionCard from "@/components/custom/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/use-user-role";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/custom/MeetingModal";
import Loader from "@/components/custom/Loader";

export default function Home() {
  const { isInterviewer, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;

      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;

      default:
        router.push(`${title.toLowerCase()}`);
        break;
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto max-w-7xl p-6">
      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-violet-500 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="pt-2 text-muted-foreground">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div>Candidate view goes here...</div>
        </>
      )}
    </div>
  );
}
