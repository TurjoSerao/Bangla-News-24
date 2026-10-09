"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    console.log(user);
    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });
    if (data) {
      toast.success("Sign In successful");
      console.log(data);
    }
    if (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
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
          <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
          <p className="mt-2 text-sm text-base-content/60">
            Welcome back! Sign in to continue.
          </p>
        </div>
        {/* Sign In Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-semibold">
              Email address
            </legend>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              autoComplete="email"
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
              autoComplete="current-password"
              required
            />
          </fieldset>
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-base-content/70 hover:text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="btn btn-neutral mt-2 w-full">
            Sign In
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
        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-base-content/70">
          Don&apos;t have an account?
          <Link
            href="/sign-up"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};
export default SignInPage;
