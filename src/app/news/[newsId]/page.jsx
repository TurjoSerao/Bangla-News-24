import Image from "next/image";
import MostReads from "@/components/MostReads";

const NewsDetails = async ({ params }) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (res.status === 415) {
    const errorData = await res.json();

    if (errorData.error?.code === "UNSUPPORTED_CONTENT") {
      const message = errorData.error.message;
      const originalUrl = message?.match(/https:\/\/\S+/)?.[0];

      return (
        <main className="mx-auto min-h-screen max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-bold text-gray-900">
            এই সংবাদটির বিস্তারিত এখানে পাওয়া যাচ্ছে না
          </h1>
          <p className="mt-3 text-gray-600">
            {originalUrl
              ? "এটি একটি লাইভ সংবাদ। সম্পূর্ণ সংবাদটি মূল উৎসে পড়ুন।"
              : message || "এই সংবাদটির কোনো নিবন্ধের বিবরণ পাওয়া যায়নি।"}
          </p>
          {originalUrl && (
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-medium text-red-700 hover:underline"
            >
              মূল সংবাদ দেখুন →
            </a>
          )}
        </main>
      );
    }
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch news article (${res.status})`);
  }

  const data = await res.json();
  const news = data.data;

  const publishedDate = new Date(news.firstPublished).toLocaleDateString(
    "bn-BD",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-0 lg:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Article */}
          <article className="min-w-0 lg:col-span-2">
            {/* Category */}
            {news.topics?.length > 0 && (
              <div className="mb-4">
                <span className="inline-block rounded-sm bg-red-700 px-3 py-1 text-sm font-semibold text-white">
                  {news.topics[0].name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              {news.title}
            </h1>

            {/* Description */}
            {news.text && (
              <p className="mt-5 text-lg leading-8 text-gray-600">
                {news.text.split("\n\n")[0]}
              </p>
            )}

            {/* Author + Date */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 pb-5 text-sm text-gray-500">
              {news.byline?.length > 0 && (
                <span>
                  <span className="font-semibold text-gray-700">
                    {news.byline[0].name}
                  </span>
                </span>
              )}

              <span>•</span>

              <span>{publishedDate}</span>

              <span>•</span>

              <span>{news.source}</span>
            </div>

            {/* Hero Image */}
            {(news.imageUrl ||
              news.body?.find((block) => block.type === "image")?.url) && (
              <figure className="mt-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={
                      news.imageUrl ||
                      news.body.find((block) => block.type === "image").url
                    }
                    alt={news.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>

                {news.body?.find((block) => block.type === "image")
                  ?.caption && (
                  <figcaption className="mt-2 text-sm leading-6 text-gray-500">
                    {news.body.find((block) => block.type === "image").caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Article Body */}

            <div className="mt-8">
              {news.body?.slice(1).map((block, index) => {
                if (block.type === "text") {
                  return (
                    <p
                      key={index}
                      className="mb-6 text-lg leading-9 text-gray-800"
                    >
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "subheading") {
                  return (
                    <h2
                      key={index}
                      className="mt-10 mb-5 border-l-4 border-red-700 pl-4 text-2xl font-bold text-gray-900 sm:text-3xl"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "image") {
                  return (
                    <figure key={index} className="my-8">
                      <div className="relative w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={block.url}
                          alt={block.altText || block.caption || news.title}
                          width={block.width}
                          height={block.height}
                          className="h-auto w-full object-cover"
                        />
                      </div>

                      {block.caption && (
                        <figcaption className="mt-2 text-sm leading-6 text-gray-500">
                          {block.caption}
                        </figcaption>
                      )}

                      {block.copyrightHolder && (
                        <p className="mt-1 text-xs text-gray-400">
                          ছবি: {block.copyrightHolder}
                        </p>
                      )}
                    </figure>
                  );
                }

                return null;
              })}
            </div>

            {/* Tags */}
            {news.tags?.length > 0 && (
              <div className="mt-10 border-t border-gray-200 pt-6">
                <h3 className="mb-3 text-sm font-bold text-gray-700">ট্যাগ</h3>

                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Source */}
            {news.sourceUrl && (
              <div className="mt-8 border-t border-gray-200 pt-5">
                <a
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-red-700 hover:underline"
                >
                  মূল সংবাদ দেখুন →
                </a>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-5">
              <MostReads />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default NewsDetails;
