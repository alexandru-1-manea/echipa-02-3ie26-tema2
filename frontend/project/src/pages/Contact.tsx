import { useState } from 'react';
import { Send, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const contactInfo = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'hello@portofoliu.ro',
    href: 'mailto:hello@portofoliu.ro',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: 'Bucharest, Romania',
    href: null,
  },
  {
    icon: <Clock size={20} />,
    label: 'Availability',
    value: 'Mon–Fri, 9am–6pm EET',
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    
    try {
      // ATENȚIE: Înlocuiește URL-ul de mai jos cu Endpoint-ul tău de la Formspree (ex: https://formspree.io/f/xqk...)
      // Sau poți schimba către endpoint-ul tău de Strapi: http://localhost:1337/api/messages
      const response = await fetch('https://formspree.io/f/mjgzjole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('Eroare la trimitere');
      }
    } catch (error) {
      console.error('Eroare formular:', error);
      alert('A apărut o problemă la trimiterea mesajului. Te rog încearcă din nou.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title">Contact</h1>
          <p className="section-subtitle">Have a project or idea? I'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Let's work together
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                  Whether you have a project in mind, need a consultation, or just want to say hello — my inbox is always open.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-200 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-500 animate-pulse flex-shrink-0" />
                <p className="text-sm text-accent-700 dark:text-accent-300 font-medium">
                  Typically responds within 24 hours
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="card p-10 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="card p-8 space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      className={`input-field resize-none ${errors.message ? 'border-red-400 focus:ring-red-400' : ''}`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}