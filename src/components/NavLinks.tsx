import Link from "next/link";
import React from "react";
const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");
  const data = await res.json();
  const navs = data.data;
  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <div className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
          {navs.map((nav) => (
            <Link
              key={nav.slug}
              href={nav.slug}
              className=" shrink-0 border-b-2 border-transparent px-3 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-red-700 hover:bg-red-50 hover:text-red-700 sm:px-4 sm:py-3.5 sm:text-base "
            >
              {nav.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
