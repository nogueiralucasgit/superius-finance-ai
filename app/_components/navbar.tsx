"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
const NavBar = () => {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex justify-between">
        <div className="item-center flex gap-10 border-solid px-8 py-4">
          <Image src="logo.svg" alt="Logotipo" height={39} width={173} />
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transações
          </Link>
          <Link
            href="/subscriptions"
            className={
              pathname === "/subscriptions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Assinatura
          </Link>
        </div>
        <div className="item-center flex gap-10 border-solid px-8 py-4">
          <UserButton showName />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
