import Image from "next/image";
import Link from "next/link";
import React from "react";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const Newscard = ({ news }: { news: News }) => {
  return (
    <Link href={`/news/${news.id}`}>
      <article className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={news.imageUrl}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={news.imageAlt}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="mb-1 text-xs font-semibold text-red-700">
            {news.category}
          </p>

          <h2 className="line-clamp-2 text-base font-bold leading-snug text-gray-900">
            {news.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-600">
            {news.description}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default Newscard;
