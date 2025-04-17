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

const Document = async({ params:{id} }: DocumentProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
   // ✅ Await params
  //  const roomId = params?.id;
  //  console.log(params?.id);

  if (!id) {
    console.error("🚨 Room ID is missing in URL.");
    redirect("/");
  }

  console.log("Room ID from params:", id);

  const room = await getDocument({
    roomId:id,
    userId: user.emailAddresses[0].emailAddress,
  });

  if (!room) {
    console.error("Room not found or access denied.");
    redirect("/");
  }

  return (
    <div>
      <CollabrativeRoom roomId={id} roomMetaData={room.metadata} />
    </div>
  );
};

export default Document;
