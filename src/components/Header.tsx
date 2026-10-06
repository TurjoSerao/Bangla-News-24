import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-0">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-red-700 bg-red-50">
            <Image
              src="/logo.webp"
              width={48}
              height={48}
              alt="Bangla News 24 Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-red-700 sm:text-2xl">
              Bangla News 24
            </h1>

            <p className="mt-0.5 text-sm font-medium text-gray-500">{date}</p>
          </div>
        </div>

        {/* Authentication */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="rounded-md border border-red-700 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition duration-200 hover:bg-red-50">
            সাইন ইন
          </button>

          <button className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-red-800 hover:shadow-md">
            সাইন আপ
          </button>
        </div>
      </div>
      <NavLinks />
    </header>
  );
};

export default Header;
