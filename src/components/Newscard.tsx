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
    <Link
      href={`/news/${news.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt || news.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-red-700">{news.category}</p>

        <h3 className="mt-1 line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-red-700">
          {news.title}
        </h3>

        {news.description && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {news.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Newscard;
