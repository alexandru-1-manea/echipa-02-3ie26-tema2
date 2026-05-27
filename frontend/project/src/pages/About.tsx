import { Link } from 'react-router-dom';
import { ArrowRight, Download, MapPin, Calendar, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js / Express', level: 85 },
  { name: 'PostgreSQL / Supabase', level: 80 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'DevOps / CI/CD', level: 75 },
];

const experience = [
  {
    role: 'Senior Frontend Engineer',
    company: 'TechVision Inc.',
    period: '2022 – Present',
    description: 'Leading the frontend architecture for SaaS products used by 200k+ users.',
  },
  {
    role: 'Full-Stack Developer',
    company: 'PixelCraft Studio',
    period: '2020 – 2022',
    description: 'Delivered end-to-end solutions for e-commerce and marketing platforms.',
  },
  {
    role: 'Junior Developer',
    company: 'StartupLab',
    period: '2018 – 2020',
    description: 'Built MVPs and prototypes for early-stage startups across various industries.',
  },
];

export default function About() {
  // Stocăm datele din Strapi
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Funcția care aduce datele
    const fetchAboutData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/about?populate=*');
        const json = await response.json();
        
        // Strapi v4 trimite datele sub forma json.data.attributes (sau json.data direct în funcție de config)
        // Ne asigurăm că preluăm corect obiectul
        if (json.data) {
          setAboutData(json.data);
        }
      } catch (error) {
        console.error('Eroare la preluarea datelor din Strapi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Extragem descrierea din Rich Text-ul de la Strapi
  // Strapi trimite un array de paragrafe pentru "Rich text (Blocks)"
  const renderDescription = () => {
    if (!aboutData?.detailedDescription) return null;
    
    return aboutData.detailedDescription.map((block: any, index: number) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index}>
            {block.children.map((child: any, i: number) => child.text).join('')}
          </p>
        );
      }
      return null;
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:text-white">Se încarcă datele...</div>;
  }

  return (
    <div className="animate-fade-in">
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="section-title">About Me</h1>
            <p className="section-subtitle">Passionate developer, lifelong learner, coffee enthusiast.</p>
          </div>
        </div>
      </section>

      {/* Two-column bio */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image column */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-2xl">
                <img
                  src={
                    aboutData?.profileImage?.url 
                      ? `http://localhost:1337${aboutData.profileImage.url}` // Dacă folosești local provider în Strapi
                      : "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=800"
                  }
                  alt="Developer working"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 md:bottom-8 md:right-0 lg:-right-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white flex-shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm">5+ Years</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">of experience</div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-3xl bg-primary-50 dark:bg-primary-900/20 -z-10" />
            </div>

            {/* Text column */}
            <div>
              {/* Titlul preluat din Strapi, sau fallback dacă nu există */}
              <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
                {aboutData?.title || "Building the web, one component at a time."}
              </h2>

              {/* Descrierea preluată din Strapi */}
              <div className="mt-5 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutData?.detailedDescription ? renderDescription() : (
                  <>
                    <p>
                      Hi, I'm Alex — a full-stack developer based in Bucharest, Romania. I specialize in building scalable, user-centric web applications that look great and perform even better.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-primary-500" />
                  Bucharest, Romania
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-primary-500" />
                  Available from July 2026
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Hire Me <ArrowRight size={18} />
                </Link>
                <button className="btn-outline">
                  <Download size={18} /> Download CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Skills & Expertise</h2>
          <p className="section-subtitle text-center mx-auto mt-3 mb-12">
            Technologies I work with on a daily basis.
          </p>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle mb-12">My professional journey.</p>

          <div className="max-w-3xl space-y-0">
            {experience.map((item, i) => (
              <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-500 mt-1.5 flex-shrink-0 ring-4 ring-primary-100 dark:ring-primary-900/30" />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-2" />
                  )}
                </div>
                <div className="card p-6 flex-1 -mt-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.role}</h3>
                      <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">{item.company}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}