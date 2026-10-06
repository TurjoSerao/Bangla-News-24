import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import MostReads from "@/components/MostReads";
import Newscard from "@/components/Newscard";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");

  const data = await res.json();
  const sections = data.data;

  const mainNews = sections[0].articles;
  const otherSections: IOtherSection[] = sections.slice(1);

  return (
    <main>
      {/* Breaking News */}
      <Marquee />

      {/* Main Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3 lg:px-0">
        {/* News Content */}
        <section className="lg:col-span-2">
          <MainNews news={mainNews} />

          {/* Other News Sections */}
          <div className="mt-8 space-y-10">
            {otherSections.map((section) => (
              <section key={section.curationId}>
                {/* Section Heading */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-7 w-1 rounded-full bg-red-700" />

                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {section.title}
                  </h2>
                </div>

                {/* Section Articles */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.articles.map((news) => (
                    <Newscard key={news.id} news={news} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-5">
            <div className="border-t-4 border-red-700 bg-white p-4 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">সর্বাধিক পঠিত</h2>

              <div className="mt-4">
                <MostReads />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
