import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface HeadLines {
  id: string;
  title: string;
}

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  const data = await res.json();
  const headLines: HeadLines[] = data.data;
  return (
    <section className="border-b border-gray-200 bg-red-50">
      <div className="mx-auto flex max-w-7xl items-center overflow-hidden px-4 lg:px-0">
        {/* Breaking News Label */}
        <div className="relative z-10 shrink-0 bg-red-700 px-3 py-2 text-sm font-bold text-white sm:px-4 sm:text-base">
          <span className="hidden sm:inline">ব্রেকিং নিউজ</span>
          <span className="sm:hidden">ব্রেকিং</span>
        </div>
        {/* Headlines */}
        <div className="min-w-0 flex-1 overflow-hidden py-2">
          <MarqueeText direction="right" duration={15}>
            {headLines.map((headline) => (
              <span
                key={headline.id}
                className="inline-flex items-center text-sm font-medium text-gray-700 sm:text-base"
              >
                {headline.title}
                <span className="mx-4 text-red-700">●</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </section>
  );
};
export default Marquee;
