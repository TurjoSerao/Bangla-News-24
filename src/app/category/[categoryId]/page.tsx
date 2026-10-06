import MostReads from "@/components/MostReads";
import Newscard from "@/components/Newscard";

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
  );

  const data = await res.json();
  const categoryNews = data.data;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-0">
        {/* Page Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Category News */}
          <section className="lg:col-span-2">
            {/* Category Heading */}
            <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="h-8 w-1 rounded-full bg-red-700" />

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {data.title}
              </h1>
            </div>

            {/* News Grid */}
            {categoryNews.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {categoryNews.map((news) => (
                  <Newscard key={news.id} news={news} />
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 bg-white p-10 text-center">
                <p className="text-gray-500">
                  এই বিভাগে বর্তমানে কোনো সংবাদ পাওয়া যায়নি।
                </p>
              </div>
            )}
          </section>

          {/* Most Read Sidebar */}
          <aside className="lg:block">
            <div className="lg:sticky lg:top-5">
              <MostReads />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CategoryNews;
