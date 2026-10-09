import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const MainNews = ({ news }: { news: News[] }) => {
  const [firstNews, ...otherNews] = news;

  if (!firstNews) return null;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* Main Story */}
      <Link href={`/news/${firstNews.id}`} className="group block">
        <article className="overflow-hidden border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={firstNews.imageUrl}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={firstNews.imageAlt}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="p-4 sm:p-5">
            <p className="mb-2 text-sm font-semibold text-red-700">
              {firstNews.category}
            </p>

            <h1 className="text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-700 sm:text-2xl">
              {firstNews.title}
            </h1>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
              {firstNews.description}
            </p>
          </div>
        </article>
      </Link>

      {/* Secondary Stories */}
      <div className="divide-y divide-gray-200 border border-gray-200 bg-white">
        {otherNews.slice(0, 4).map((other) => (
          <Link
            key={other.id}
            href={`/news/${other.id}`}
            className="group block p-4 transition-colors duration-200 hover:bg-red-50"
          >
            <p className="mb-1 text-xs font-semibold text-red-700">
              {other.category}
            </p>

            <h2 className="text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-700 sm:text-lg">
              {other.title}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MainNews;
