"use server";

import CollabrativeRoom from "@/components/CollabrativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import "@clerk/themes";
import { redirect } from "next/navigation";

import React, { use } from "react";

// Correct Type for Next.js Route Params
type DocumentProps = {
  params: { id: string };
};

const Document = async({ params }: DocumentProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
   // ✅ Await params
   console.log(params.id);
  const roomId = await params.id;

  if (!roomId) {
    console.error("🚨 Room ID is missing in URL.");
    redirect("/");
  }

  console.log("Room ID from params:", roomId);

  const room = await getDocument({
    roomId,
    userId: user.emailAddresses[0].emailAddress,
  });

  if (!room) {
    console.error("Room not found or access denied.");
    redirect("/");
  }

  return (
    <div>
      <CollabrativeRoom roomId={roomId} roomMetaData={room.metadata} />
    </div>
  );
};

export default Document;
