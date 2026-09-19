import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Code,
  Share2,
  Check,
  Award,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { TranslationDictionary } from '../data/translations';
import { useToast } from './Toast';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary;
}

type ResumeTab = 'overview' | 'experience' | 'skills' | 'education' | 'full';

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, t }) => {
  const [activeTab, setActiveTab] = useState<ResumeTab>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Resume link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownload = () => {
    const content = `
================================================================================
${portfolio.personal.name.toUpperCase()}
${portfolio.personal.title} — ${portfolio.personal.role}
================================================================================
Email: ${portfolio.personal.email}
Phone: ${portfolio.personal.phone}
Location: ${portfolio.personal.location}
Website: https://pro-servers.dev
GitHub: ${portfolio.social.github}
LinkedIn: ${portfolio.social.linkedin}

--------------------------------------------------------------------------------
EXECUTIVE SUMMARY
--------------------------------------------------------------------------------
${portfolio.about.introduction}

${portfolio.about.background}

Philosophy: ${portfolio.about.philosophy}
Goals: ${portfolio.about.careerGoals}

--------------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------------------
${portfolio.experience
  .map(
    (exp) => `
[${exp.period}] ${exp.position}
Company: ${exp.company} (${exp.location}) | Type: ${exp.type}
Technologies: ${exp.technologies.join(', ')}
Key Accomplishments:
${exp.description.map((d) => `  • ${d}`).join('\n')}
`
  )
  .join('\n')}

--------------------------------------------------------------------------------
EDUCATION & ACCREDITATIONS
--------------------------------------------------------------------------------
${portfolio.education
  .map(
    (edu) => `
${edu.degree} — ${edu.field}
Institution: ${edu.institution} (${edu.period})
${edu.honors ? `Honors: ${edu.honors}\n` : ''}${edu.description}
`
  )
  .join('\n')}

--------------------------------------------------------------------------------
CORE TECHNICAL COMPETENCIES
--------------------------------------------------------------------------------
${portfolio.skills.map((s) => `${s.name} [${s.level}] (${s.experienceYears})`).join('\n')}
================================================================================
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${portfolio.personal.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Resume downloaded successfully!');
  };

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="resume-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              {t.resumeModal.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              id="resume-print-btn"
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              title="Print Curriculum Vitae"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.resumeModal.print}</span>
            </button>
            <button
              id="resume-download-btn"
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
              title="Download TXT Format"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.resumeModal.download}</span>
            </button>
            <button
              id="resume-modal-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/50 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.resumeModal.tabOverview}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'experience'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.resumeModal.tabExperience}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'skills'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.resumeModal.tabSkills}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'education'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.resumeModal.tabEducation}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('full')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'full'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Full Document View
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div id="printable-resume-area" className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header Identity Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {portfolio.personal.name}
              </h1>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {portfolio.personal.title} — {portfolio.personal.role}
              </p>
            </div>

            <div className="flex flex-col text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>{portfolio.personal.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>{portfolio.personal.phone}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{portfolio.personal.location}</span>
              </span>
            </div>
          </div>

          {/* Overview Tab Content */}
          {(activeTab === 'overview' || activeTab === 'full') && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Executive Profile Summary
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {portfolio.about.introduction}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {portfolio.about.background}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    Development Philosophy
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {portfolio.about.philosophy}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    Career Direction
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {portfolio.about.careerGoals}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab Content */}
          {(activeTab === 'experience' || activeTab === 'full') && (
            <div className="space-y-6 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Work Experience & Achievements</span>
              </h2>

              <div className="space-y-6">
                {portfolio.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 w-fit">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {exp.company} • {exp.location} ({exp.type})
                    </p>

                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300 pt-1">
                      {exp.description.map((d, i) => (
                        <li key={i} className="leading-relaxed">
                          {d}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab Content */}
          {(activeTab === 'skills' || activeTab === 'full') && (
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                <span>Core Competencies & Tooling</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {portfolio.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {skill.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {skill.experienceYears}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab Content */}
          {(activeTab === 'education' || activeTab === 'full') && (
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education & Certifications</span>
              </h2>

              <div className="space-y-4">
                {portfolio.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {edu.degree} — {edu.field}
                      </h4>
                      <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                      {edu.institution}
                    </p>
                    {edu.honors && (
                      <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        <Award className="w-3.5 h-3.5" />
                        <span>{edu.honors}</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 text-xs text-slate-500">
          <span>PRO SERVERS Verified Resume</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            {t.resumeModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
