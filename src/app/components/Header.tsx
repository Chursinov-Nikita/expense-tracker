import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="bg-zinc-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-white text-lg font-semibold">Трекер</h1>
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white">
                Общее
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white">
                Доходы
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-white">
                Расходы
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
