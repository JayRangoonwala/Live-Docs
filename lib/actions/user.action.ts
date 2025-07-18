'use server';

import { clerkClient } from "@clerk/clerk-sdk-node";
import { parseStringify } from "../utils";

export const getClerkusers = async({userIds} : {userIds : string[]}) => {
    try {
        // console.log("userids",userIds);
        const { data } = await clerkClient.users.getUserList({
            emailAddress: userIds
        })
        // console.log("data:",data);

        const users = data.map((user) => ({
            id: user.id,
            name:`${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            avatar : user.imageUrl
        }))

        const sortedUsers = userIds.map((email) => users.find((user) => user.email == email));

        return parseStringify(sortedUsers);
    } catch (error) {
        console.log(`Error in Fetching Users ${error}`)
    }
}