'use client';

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import Loader from "./Loader";
import ActiveCollabrator from "./ActiveCollabrator";

const CollabrativeRoom = ({roomId,roomMetaData}:{roomId:string,roomMetaData:string}) => {
  return (
    <div>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loader />}>
          <Header>
            <p className="text-white">Untitled</p>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollabrator />
            <div className="flex gap-2">
              <SignedOut>
                <div className="bg-white cursor-pointer p-2 px-5 text-black rounded-full">
                  <SignInButton mode="modal" />
                </div>
                <div className="bg-white cursor-pointer p-2 px-5 text-black rounded-full">
                  <SignUpButton mode="modal" />
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            </div>
          </Header>
          <Editor />
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  );
};

export default CollabrativeRoom;
