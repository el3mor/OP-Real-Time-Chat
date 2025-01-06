"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ControlBar,
  
  LiveKitRoom,
  
  VideoConference,
 
} from '@livekit/components-react';
import "@livekit/components-styles";

import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutationState } from "@/app/hooks/useMutationState";

const CallRoom = ({
  audio,
  video,
  handleDisconnect,
  conversationId,
}: {
  audio: boolean;
  video: boolean;
  handleDisconnect: () => void;
  conversationId: string;
}) => {
  const { user } = useUser();
  const [token, setToken] = useState("");

  console.log(user)

  const { mutate: createMessage } = useMutationState(
    api.message.create
  );

  useEffect(() => {
    if (!user?.fullName) return;

    (async () => {
      try {
        const res = await fetch(
          `/api/token?room=${conversationId}&username=${
            user.fullName
          }`
        );
        const data = await res.json();

        setToken(data.token);
      } catch (e) {
        console.log(e)
        toast.error("Could not join the call");
      }
    })();
  }, [user?.fullName, conversationId]);

  if (token === "") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Loader2 className="animate-spin h-16 w-16 text-foreground" />
        <p className="text-sm text-foreground">Joining call...</p>
        <Button
          className="mt-4"
          variant="destructive"
          onClick={handleDisconnect}
        >
          Cancel
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onDisconnected={() => handleDisconnect()}
        onConnected={() => {
          createMessage({
            conversationId,
            type: "call",
            content: [],
          });
        }}
      >
        <VideoConference />
        <ControlBar />
      </LiveKitRoom>
    </div>
  )
}


export default CallRoom
