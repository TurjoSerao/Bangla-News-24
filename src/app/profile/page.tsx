"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setImage(user?.image || "");
    setImageError(false);
  }, [user?.name, user?.image]);

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (image.trim()) {
      try {
        const url = new URL(image.trim());

        if (url.protocol !== "https:" && url.protocol !== "http:") {
          setErrorMessage("Please enter a valid image URL.");
          return;
        }
      } catch {
        setErrorMessage("Please enter a valid image URL.");
        return;
      }
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        setErrorMessage(error.message || "Failed to update your profile.");
        return;
      }

      setMessage("Your profile has been updated successfully.");
      setImageError(false);
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setErrorMessage(error.message || "Failed to sign out.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="rounded-full bg-base-200 p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-base-content/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a8.25 8.25 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75 17.9 17.9 0 0 1 4.5 20.1Z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p className="max-w-md text-base-content/60">
          Please sign in to view and manage your Bangla News 24 profile.
        </p>

        <Link href="/sign-in" className="btn btn-primary">
          Sign In
        </Link>
      </main>
    );
  }

  const avatarSrc =
    !imageError && (image.trim() || user.image)
      ? image.trim() || user.image || "/default-avatar.png"
      : "/default-avatar.png";

  return (
    <main className="min-h-screen bg-base-200 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Bangla News 24
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">My Profile</h1>
          <p className="mt-2 text-base-content/60">
            Manage your account and personal information.
          </p>
        </div>

        {/* Feedback Messages */}
        {message && (
          <div role="status" className="alert alert-success mb-6">
            <span>{message}</span>
          </div>
        )}

        {errorMessage && (
          <div role="alert" className="alert alert-error mb-6">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Profile Overview */}
        <section className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <div className="h-28 bg-primary sm:h-36" />

          <div className="px-5 pb-7 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4 sm:-mt-14">
              <div className="avatar">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-base-100 bg-base-200 sm:h-28 sm:w-28">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={`${user.name || "User"}'s profile picture`}
                    fill
                    sizes="112px"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="btn btn-outline btn-error btn-sm sm:btn-md"
              >
                {isSigningOut ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  "Sign Out"
                )}
              </button>
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-bold sm:text-3xl">
                {user.name || "News Reader"}
              </h2>
              <p className="mt-1 break-all text-sm text-base-content/60">
                {user.email}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
                <span className="text-sm font-medium text-base-content/70">
                  Account active
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Account Information */}
        <section className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
          <div className="mb-5 border-b border-base-300 pb-4">
            <h3 className="text-xl font-bold">Account Information</h3>
            <p className="mt-1 text-sm text-base-content/60">
              Your current account details.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-base-200 p-4">
              <p className="text-sm text-base-content/60">Full Name</p>
              <p className="mt-2 break-words font-semibold">
                {user.name || "Not provided"}
              </p>
            </div>

            <div className="rounded-xl bg-base-200 p-4">
              <p className="text-sm text-base-content/60">Email Address</p>
              <p className="mt-2 break-all font-semibold">
                {user.email || "Not provided"}
              </p>
              <p className="mt-1 text-xs text-base-content/50">
                Email changes are not available here.
              </p>
            </div>
          </div>
        </section>

        {/* Update Profile Form */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <div className="border-b border-base-300 px-5 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.77a4.5 4.5 0 0 1-1.897 1.13l-2.685.805.805-2.685a4.5 4.5 0 0 1 1.13-1.897l8.927-8.927Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21h-9.5A2.25 2.25 0 0 1 4 18.75v-9.5A2.25 2.25 0 0 1 6.25 7H11"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-xl font-bold">Update Profile</h3>
                <p className="mt-1 text-sm text-base-content/60">
                  Edit your display name and profile picture.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-5 p-5 sm:p-8">
            {/* Avatar Preview */}
            <div className="flex flex-col gap-4 rounded-xl bg-base-200 p-4 sm:flex-row sm:items-center">
              <div className="avatar">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-base-300 bg-base-100">
                  <Image
                    src={avatarSrc}
                    alt="Profile picture preview"
                    fill
                    sizes="80px"
                    className="object-cover"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                </div>
              </div>

              <div className="min-w-0">
                <h4 className="font-semibold">Profile Picture</h4>
                <p className="mt-1 text-sm text-base-content/60">
                  Paste a direct image URL below to change your picture.
                </p>
                <p className="mt-1 text-xs text-base-content/50">
                  Leave the URL empty to use the default avatar.
                </p>
              </div>
            </div>

            {/* Name Field */}
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                maxLength={100}
                required
                className="input input-bordered w-full focus:border-primary focus:outline-none"
              />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                value={user.email || ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
              <p className="mt-2 text-xs text-base-content/50">
                Your email address cannot be changed through this form.
              </p>
            </div>

            {/* Image URL Field */}
            <div className="form-control">
              <label htmlFor="image" className="label">
                <span className="label-text font-semibold">
                  Profile Image URL
                </span>
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImageError(false);
                  setMessage("");
                  setErrorMessage("");
                }}
                placeholder="https://example.com/profile.jpg"
                className="input input-bordered w-full focus:border-primary focus:outline-none"
              />
              <p className="mt-2 text-xs text-base-content/50">
                Use a direct image link, not a webpage URL.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-base-300 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setName(user.name || "");
                  setImage(user.image || "");
                  setImageError(false);
                  setMessage("");
                  setErrorMessage("");
                }}
                disabled={isSaving}
                className="btn btn-ghost"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary min-w-36"
              >
                {isSaving ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Back to Home */}
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="link link-hover text-sm text-base-content/70"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
