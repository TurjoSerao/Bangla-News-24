import Link from "next/link";
import React from "react";

interface MostReadNews {
  id: string;
  title: string;
  category: string;
  link: string;
  rank: number;
}

const MostReads = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");

  const data = await res.json();
  const mostReadsNews: MostReadNews[] = data.data;

  return (
    <aside className="border border-gray-200 bg-white">
      {/* Heading */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-7 w-1 rounded-full bg-red-700" />

          <h2 className="text-xl font-bold text-gray-900">সর্বাধিক পঠিত</h2>
        </div>
      </div>

      {/* News List */}
      <div className="divide-y divide-gray-200">
        {mostReadsNews.slice(0, 6).map((news, index) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="group flex gap-4 p-4 transition-colors duration-200 hover:bg-red-50"
          >
            {/* Number */}
            <div className="w-10 shrink-0">
              <span className="text-2xl font-bold leading-none text-gray-300 transition-colors group-hover:text-red-700">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="min-w-0">
              <p className="mb-1 text-xs font-semibold text-red-700">
                {news.category}
              </p>

              <h3 className="line-clamp-3 text-sm font-semibold leading-5 text-gray-800 transition-colors group-hover:text-red-700">
                {news.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* View More */}
      <div className="border-t border-gray-200 p-3">
        <Link
          href="/most-read"
          className="block text-center text-sm font-semibold text-red-700 transition-colors hover:text-red-800"
        >
          সবগুলো দেখুন →
        </Link>
      </div>
    </aside>
  );
};

export default MostReads;
