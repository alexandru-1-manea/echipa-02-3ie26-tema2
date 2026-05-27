import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Search, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch('');
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white font-display font-bold text-xl hover:opacity-80 transition-opacity">
              <Code2 size={22} className="text-primary-400" />
              <span>DevPortfolio</span>
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Crafting digital experiences with clean code and thoughtful design.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="GitHub" className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-200">
                <Github size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-200">
                <Linkedin size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-200">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Search</h3>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DevPortfolio. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
