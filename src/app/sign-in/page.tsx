import React from "react";
import Link from "next/link";
const SignInPage = () => {
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
        <form className="flex flex-col gap-4">
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
