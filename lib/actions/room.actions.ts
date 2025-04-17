'use server';

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { RoomAccesses } from "@liveblocks/node";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { redirect } from "next/navigation";
import { stringify } from "querystring";

type CreateDocumentParams = {
    userId: string;
    email: string;
};

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
    const roomId = nanoid();

    try {
        const metadata = {
            creatorId: userId,
            email,
            title: "untitled"
        }

        const usersAccesses: RoomAccesses = {
            [email]: ['room:write']
        }

        const room = await liveblocks.createRoom(roomId, {
            metadata: metadata,
            usersAccesses: usersAccesses,
            defaultAccesses: ['room:write'],
        });

        if (!room) {
            throw new Error("Error Generated While Creating room");
        }
        console.log("Room created :", room);
        revalidatePath('/');

        return parseStringify(room);

    } catch (error) {
        console.log("Error Generate while Creating Room", error);
    }
}

export const getDocument = async ({ roomId, userId }: { roomId: string, userId: string }) => {
    try {
        console.log("roomId,userid:", roomId, userId)
        const room = await liveblocks.getRoom(roomId);

        if (!room) {
            throw new Error("No Room in getDocumeent");
        }
        console.log("Fetching room", room);

        // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

        // if (!hasAccess) {
        //     throw new Error("You Have No Access to the room");
        // }
        return parseStringify(room);
    } catch (error) {
        console.log("Error Happened while getting Room", error);
    }
}

export const updateDocument = async (roomId: string, title: string) => {
    try {
        const updatedDocument = await liveblocks.updateRoom(roomId, {
            metadata: {
                title
            }
        })
        revalidatePath(`/documents/${roomId}`);
        return parseStringify(updatedDocument);
    } catch (err) {
        console.log("Error While Updating Doc", err);
    }
}