import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Layers, Zap, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

const skills = [
  {
    icon: <Layers size={24} />,
    title: 'Full-Stack Development',
    description: 'End-to-end application development with modern frameworks and cloud infrastructure.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Performance Optimization',
    description: 'Crafting blazing-fast experiences through code splitting, caching, and smart architecture.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Secure by Design',
    description: 'Security-first approach with RLS, input validation, and industry best practices.',
  },
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        // Folosim același endpoint testat anterior
        const response = await fetch('http://localhost:1337/api/articles?populate=*');
        const json = await response.json();

        if (json.data) {
          const formattedProjects = json.data.map((item: any) => {
            const attrs = item.attributes || item; 
            
            // Extragem Categoria
            let categoryName = 'Uncategorized';
            if (typeof attrs.category === 'string') {
              categoryName = attrs.category;
            } else if (attrs.category?.name) {
              categoryName = attrs.category.name;
            } else if (attrs.category?.data?.attributes?.name) {
              categoryName = attrs.category.data.attributes.name;
            }

            // Extragem Tag-urile
            let tagsArray: string[] = [];
            if (typeof attrs.tags === 'string') {
              tagsArray = attrs.tags.split(',').map((t: string) => t.trim());
            } else if (Array.isArray(attrs.tags)) {
              tagsArray = attrs.tags.map((t: any) => t.name || t.attributes?.name).filter(Boolean);
            }

            // Extragem Imaginea
            let imageUrl = 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800';
            const imgData = attrs.coverImage || attrs.coverimage || attrs.image || attrs.COVERIMAGE;
            
            if (imgData?.url) {
              imageUrl = `http://localhost:1337${imgData.url}`;
            } else if (imgData?.data?.attributes?.url) {
              imageUrl = `http://localhost:1337${imgData.data.attributes.url}`;
            }

            return {
              id: item.id || item.documentId,
              title: attrs.title || attrs.Title || 'Fără Titlu',
              description: attrs.description || attrs.Description || 'Fără descriere',
              category: categoryName,
              tags: tagsArray,
              image: imageUrl,
              // O culoare aleatorie pentru gradientul overlay dacă e nevoie
              color: 'from-blue-500 to-cyan-500', 
            };
          });

          // Păstrăm doar primele 3 proiecte pentru secțiunea Featured de pe Home
          setFeaturedProjects(formattedProjects.slice(0, 3));
        }
      } catch (error) {
        console.error('Eroare la preluarea proiectelor pe Home:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-50 dark:bg-primary-950 opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-50 dark:bg-accent-950 opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              Available for new projects
            </span>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              I build{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                digital
              </span>
              <br />
              experiences
            </h1>

            <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
              Full-stack developer passionate about crafting clean, performant, and beautiful web applications that solve real problems.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/portfolio" className="btn-primary text-base">
                View My Work <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-outline text-base">
                Get In Touch
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-8">
              {[
                { value: '50+', label: 'Projects' },
                { value: '5+', label: 'Years Exp.' },
                { value: '30+', label: 'Happy Clients' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills strip */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map(skill => (
              <div key={skill.title} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors duration-200">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">A selection of work I'm proud of.</p>
            </div>
            <Link to="/portfolio" className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:gap-2 transition-all duration-200 whitespace-nowrap">
              All projects <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
             <div className="text-center py-10 dark:text-white">Se încarcă proiectele...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map(project => (
                <article key={project.id} className="card group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
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
                        <Github size={15} /> Code
                      </a>
                      <a href="#" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <ExternalLink size={15} /> Live Demo
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {featuredProjects.length === 0 && !loading && (
            <div className="text-center py-10 text-gray-500">Nu există proiecte de afișat.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-primary-100 text-lg">
            Let's work together to bring your idea to life.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
            Start a Conversation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}