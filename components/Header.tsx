import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  children: React.ReactNode;
  className ?: string;
};

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div
      className={cn("flex items-center justify-between py-3 px-6 w-full", className)}
    >
      <Link href="/">
        <Image
          src={"/assets/icons/logo.svg"}
          alt="Logo"
          width={130}
          height={55}
          className="hidden md:block"
        />
        <Image
          src={"/assets/icons/logo-icon.svg"}
          alt="Logo"
          width={35}
          height={55}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
