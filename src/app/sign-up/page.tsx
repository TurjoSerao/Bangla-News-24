"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image?: string;
      password: string;
    };

    const payload = {
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password,
      ...(user.image?.trim() ? { image: user.image.trim() } : {}),
      callbackURL: "/",
    };

    const { data, error } = await authClient.signUp.email(payload);
    if (data) {
      console.log(data);
      router.push("/");
      return;
    }
    if (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl sm:p-8">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-base-content/60">
            Welcome! Enter your details to get started.
          </p>
        </div>

        {/* Sign Up Form */}
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-semibold">
              Name
            </legend>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your name"
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-semibold">
              Image URL (optional)
            </legend>
            <input
              type="url"
              name="image"
              className="input input-bordered w-full"
              placeholder="https://example.com/avatar.jpg"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-semibold">
              Email address
            </legend>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-semibold">
              Password
            </legend>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />
            <p className="mt-1 text-xs text-base-content/50">
              Choose a strong password to keep your account secure.
            </p>
          </fieldset>

          <button type="submit" className="btn btn-neutral mt-3 w-full">
            Create Account
          </button>
        </form>
        <div className="flex justify-between gap-4 my-5">
          <button onClick={handleGoogleSignIn} className="btn ">
            🌐 Google
          </button>
          <button onClick={handleGithubSignIn} className="btn ">
            🤖 Github
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
