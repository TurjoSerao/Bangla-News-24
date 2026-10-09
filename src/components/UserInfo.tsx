"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [imageError, setImageError] = useState(false);

  const imageUrl = user?.image;
  const isValidImageUrl = (() => {
    if (!imageUrl) return false;

    try {
      const url = new URL(imageUrl);

      return (
        (url.protocol === "https:" || url.protocol === "http:") &&
        !url.pathname.startsWith("/posts/")
      );
    } catch {
      return false;
    }
  })();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-bold">{user.name}</h2>

          <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
            <Image
              src={
                isValidImageUrl && !imageError
                  ? imageUrl!
                  : "/default-avatar.png"
              }
              alt={`${user.name}'s avatar`}
              width={36}
              height={36}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>

          <button
            onClick={handleSignOut}
            className="text-xs font-bold cursor-pointer text-red-500 hover:text-red-800"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/sign-in"
            className="rounded-md border border-red-700 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
