import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { title: "প্রচ্ছদ", href: "/" },
    { title: "জাতীয়", href: "/category/national" },
    { title: "আন্তর্জাতিক", href: "/category/international" },
    { title: "রাজনীতি", href: "/category/politics" },
    { title: "খেলাধুলা", href: "/category/sports" },
  ];

  const usefulLinks = [
    { title: "আমাদের সম্পর্কে", href: "/about" },
    { title: "যোগাযোগ", href: "/contact" },
    { title: "গোপনীয়তা নীতি", href: "/privacy-policy" },
    { title: "শর্তাবলি", href: "/terms" },
  ];

  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-0">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-red-700">
                <Image
                  src="/logo.webp"
                  width={48}
                  height={48}
                  alt="Bangla News 24 Logo"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">Bangla News 24</h2>

                <p className="text-xs text-gray-400">সত্যের সাথে প্রতিদিন</p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              দেশ ও বিশ্বের সর্বশেষ সংবাদ, রাজনীতি, খেলাধুলা, বিনোদনসহ
              গুরুত্বপূর্ণ সব খবর জানতে আমাদের সাথেই থাকুন।
            </p>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-2">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-bold transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white"
              >
                f
              </Link>

              <Link
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-bold transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white"
              >
                ▶
              </Link>

              <Link
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-bold transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white"
              >
                X
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-bold transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white"
              >
                ◎
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">দ্রুত লিংক</h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-red-500"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              গুরুত্বপূর্ণ লিংক
            </h3>

            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-red-500"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">যোগাযোগ</h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>
                <span className="font-semibold text-gray-300">ঠিকানা:</span>
                <br />
                ঢাকা, বাংলাদেশ
              </p>

              <p>
                <span className="font-semibold text-gray-300">ইমেইল:</span>
                <br />
                info@banglanews24.com
              </p>

              <p>
                <span className="font-semibold text-gray-300">ফোন:</span>
                <br />
                +880 1XXX-XXXXXX
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-center text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-0">
          <p>
            © {new Date().getFullYear()} Bangla News 24. সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p>সত্য ও নির্ভুল সংবাদের সাথে</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
