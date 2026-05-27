import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/articles?populate=*');
        const json = await response.json();

        if (json.data) {
          const formattedProjects = json.data.map((item: any) => {
            // Strapi poate împacheta datele în "attributes" în funcție de versiune
            const attrs = item.attributes || item; 
            
            // 1. Extragem Categoria în siguranță
            let categoryName = 'Uncategorized';
            if (typeof attrs.category === 'string') {
              categoryName = attrs.category; // Dacă e text simplu
            } else if (attrs.category?.name) {
              categoryName = attrs.category.name; // Dacă e Relație (Strapi v5)
            } else if (attrs.category?.data?.attributes?.name) {
              categoryName = attrs.category.data.attributes.name; // Dacă e Relație (Strapi v4)
            }

            // 2. Extragem Tag-urile în siguranță
            let tagsArray: string[] = [];
            if (typeof attrs.tags === 'string') {
              tagsArray = attrs.tags.split(',').map((t: string) => t.trim());
            } else if (Array.isArray(attrs.tags)) {
              tagsArray = attrs.tags.map((t: any) => t.name || t.attributes?.name).filter(Boolean);
            }

            // 3. Extragem Imaginea (folosind denumirea ta de coverImage)
            let imageUrl = 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800';
            const imgData = attrs.coverImage || attrs.coverimage || attrs.image || attrs.COVERIMAGE;
            
            if (imgData?.url) {
              imageUrl = `http://localhost:1337${imgData.url}`; // Strapi v5
            } else if (imgData?.data?.attributes?.url) {
              imageUrl = `http://localhost:1337${imgData.data.attributes.url}`; // Strapi v4
            }

            return {
              id: item.id || item.documentId,
              title: attrs.title || attrs.Title || 'Fără Titlu',
              description: attrs.description || attrs.Description || 'Fără descriere',
              category: categoryName,
              tags: tagsArray,
              image: imageUrl,
              featured: attrs.featured || false,
            };
          });

          setProjects(formattedProjects);

          // Generăm categoriile pentru butoanele de sus pe baza numelor sigure
          const uniqueCategories = ['All', ...new Set(formattedProjects.map((p: any) => p.category))];
          setCategories(uniqueCategories as string[]);
        }
      } catch (error) {
        console.error('Eroare la preluarea portofoliului:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:text-white">Se încarcă proiectele...</div>;
  }

  return (
    <div className="animate-fade-in">
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title">Portfolio</h1>
          <p className="section-subtitle">
            A curated collection of projects I've designed, built, and shipped.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-16 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? 'bg-primary-600 text-white shadow-sm shadow-primary-200 dark:shadow-primary-900/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <article key={project.id} className="card group overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-primary-600 text-white text-xs font-semibold">
                      Featured
                    </span>
                  )}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <a href="#" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <Github size={15} /> Source
                    </a>
                    <a href="#" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 dark:text-gray-500">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}