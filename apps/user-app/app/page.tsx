"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useState } from "react";

export default function Page(): JSX.Element {
  const session = useSession();
  const [name, setName]=useState();
  return (
   <div>
    <div>
    </div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}
