"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

type AddDocumentType = {
  userId: string;
  userEmail: string;
};

const AddDocumentBtn = async ({ userId, userEmail }: AddDocumentType) => {
  const router = useRouter();

  const AddDocumentHandler = async() => {
    try {
      const room = await createDocument({ userId, email: userEmail });
      
      if (room) router.push(`/documents/${room.id}`);
    
    } catch (error) {
        console.log("Error Generated For Creating Document",error);
    }
  };

  return (
    <Button
      type="submit"
      className="bg-gradient-to-t from-blue-500 to-blue-600 hover:cursor-pointer"
      onClick={AddDocumentHandler}
    >
      <Image
        src="/assets/icons/add.svg"
        alt="Add Icon"
        width={30}
        height={30}
      />
      <p className="hidden sm:block">Cretae A New Document</p>
    </Button>
  );
};

export default AddDocumentBtn;
