import React from 'react';
import { motion } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import {
  Globe,
  Layers,
  LayoutDashboard,
  Network,
  Sparkles,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { TranslationDictionary } from '../data/translations';

interface ServicesProps {
  t: TranslationDictionary;
}

const renderServiceIcon = (iconName: string) => {
  const iconProps = { className: 'w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform' };
  switch (iconName) {
    case 'Globe':
      return <Globe {...iconProps} />;
    case 'Layers':
      return <Layers {...iconProps} />;
    case 'LayoutDashboard':
      return <LayoutDashboard {...iconProps} />;
    case 'Network':
      return <Network {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Cpu':
      return <Cpu {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

export const Services: React.FC<ServicesProps> = ({ t }) => {
  const { services } = portfolio;

  const handleContactClick = (serviceTitle: string) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-20 lg:py-28 relative bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="h-full"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1000}
                gyroscope={true}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#818cf8"
                glarePosition="all"
                glareBorderRadius="16px"
                className="h-full rounded-2xl"
              >
                <div className="group p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      {renderServiceIcon(service.icon)}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                      {(service.deliverables || []).map((deliverable: string, dIdx: number) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inquiry Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleContactClick(service.title)}
                      className="w-full flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors py-1 cursor-pointer"
                    >
                      <span>{t.services.inquireNow}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Link to Pricing Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <span>Looking for transparent, fixed-price milestone packages?</span>
            <a
              href="#pricing"
              className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-4 decoration-indigo-400/50 hover:decoration-indigo-500"
            >
              <span>Explore Plan Pricing ($250 / $520 / $760)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
