"use client";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { getClerkusers } from "@/lib/actions/user.action";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LiveblocksProvider 
        authEndpoint="/api/liveblocks-auth"
        resolveUsers={async({userIds}) => {
          const users = await getClerkusers({userIds});
          return users;
        }}  
      >
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </LiveblocksProvider>
    </div>
  );
};

export default Provider;
