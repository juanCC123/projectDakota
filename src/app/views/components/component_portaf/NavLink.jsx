import Link from "next/link";

const NavLink = ({ href, title, newTab }) => {
  return (
    <Link href={href} legacyBehavior>
      <a
        className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : undefined}>
        {title}
      </a>
    </Link>
  );
};

export default NavLink;
