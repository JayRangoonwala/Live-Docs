import Header from "@/components/Header";
import "../globals.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const ClerkUser = await currentUser();

  if (!ClerkUser) redirect("/sign-in");

  const documents = [];

  return (
    <main className="relative flex flex-col w-full min-h-screen items-center gap-5 sm:gap-10">
      <Header className="sticky left-0 top-0">
        <div className="flex gap-3 items-center lg:gap-4">
          notification
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="bg-white p-2 px-5 text-black rounded-full max-md:p-1 max-md:px-3">
              <SignInButton mode="modal" />
            </div>
          </SignedOut>
        </div>
      </Header>
      {documents.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex w-full justify-center items-center max-w-[730px] flex-col gap-5 bg-[#0e1b32] rounded-lg p-5">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document Image"
            width={35}
            height={35}
          />
          <AddDocumentBtn
            userId={ClerkUser.id}
            userEmail={ClerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
}
