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

const CollabrativeRoom = () => {
  return (
    <div>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<Loader />}>
          <Header>
            <p className="text-white">Untitled</p>
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
          </Header>
          <Editor />
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  );
};

export default CollabrativeRoom;
