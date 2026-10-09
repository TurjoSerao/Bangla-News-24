"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-base-100 px-4 py-16">
      {/* Background Decorations */}{" "}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />{" "}
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      ```
      <section className="relative mx-auto w-full max-w-2xl text-center">
        {/* News Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-9a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 5.25v13.5A2.25 2.25 0 0 0 6.75 21h10.5a2.25 2.25 0 0 0 2.25-2.25v-4.5ZM8 7.5h7m-7 4h8m-8 4h5"
            />
          </svg>
        </div>

        {/* 404 Number */}
        <div className="relative">
          <h1 className="select-none text-8xl font-black leading-none tracking-tighter text-primary sm:text-[10rem]">
            404
          </h1>
          <span className="absolute -right-1 top-0 -rotate-12 rounded-lg bg-error px-3 py-1 text-xs font-bold uppercase tracking-widest text-error-content shadow-sm sm:right-12">
            Not Found
          </span>
        </div>

        {/* Message */}
        <div className="mt-8 space-y-3">
          <h2 className="text-2xl font-bold sm:text-3xl">
            খবরটি খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="mx-auto max-w-md text-base leading-7 text-base-content/60 sm:text-lg">
            দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন করা
            হয়েছে, অথবা এই মুহূর্তে পাওয়া যাচ্ছে না।
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary px-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955a1.125 1.125 0 0 1 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
              />
            </svg>
            হোম পেজে ফিরে যান
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-outline border-base-300 px-7"
          >
            আগের পেজে ফিরে যান
          </button>
        </div>

        {/* Brand Footer */}
        <div className="mt-12 border-t border-base-300 pt-6">
          <p className="text-sm font-bold tracking-wide">
            BANGLA NEWS <span className="text-primary">24</span>
          </p>
          <p className="mt-1 text-xs text-base-content/50">
            সত্যের সন্ধানে, প্রতিদিন।
          </p>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
