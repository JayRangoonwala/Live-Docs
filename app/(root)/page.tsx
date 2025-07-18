import Header from "@/components/Header";
import "../globals.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";

interface Document {
  id:string,
  metadata:{
    title:string,
  },
  createdAt:string,
}

export default async function Home() {
  const ClerkUser = await currentUser();

  if (!ClerkUser) redirect("/sign-in");

  const roomDocuments = await getDocuments(ClerkUser.emailAddresses[0].emailAddress);
  // console.log(roomDocuments);
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
      {roomDocuments.data.length > 0 ? (
        <div className="flex flex-col items-center mb-10 w-full gap-10 px-5">
          <div className="max-w-[730px] items-end flex w-full justify-between">
            <h3 className="font-semibold text-2xl">All Documents</h3>
            <AddDocumentBtn
              userId={ClerkUser.id}
              userEmail={ClerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="flex w-full max-w-[730px] flex-col gap-5">
            {
              roomDocuments.data.map((document:Document) => (
                <li key={document.id} className="flex items-center justify-between gap-4 rounded-lg bg-[url(/assets/images/doc.png)] bg-cover p-5 shadow-xl">
                  <Link href={`/documents/${document.id}`} className="flex flex-1 items-center gap-4">
                    <div className="hidden rounded-md p-2 bg-[#2E3D5B] sm:block">
                      <Image 
                        src="/assets/icons/doc.svg"
                        alt="Document Logo"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg">
                        {document.metadata.title}
                      </p>
                      <p className="font-light text-blue-200 text-sm">
                        Created About {dateConverter(document.createdAt)}
                      </p>
                    </div>
                  </Link>

                </li>
              ))
            }
          </ul>
        </div>
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
