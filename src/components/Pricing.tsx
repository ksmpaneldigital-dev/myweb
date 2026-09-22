import React, { useState } from 'react';
import { motion } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import {
  CheckCircle2,
  Sparkles,
  Clock,
  Send,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Rocket,
  Check,
  CreditCard,
  ExternalLink,
  QrCode,
  X,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { TranslationDictionary } from '../data/translations';
import { PricingPlan } from '../types';

interface PricingProps {
  t: TranslationDictionary;
}

export const Pricing: React.FC<PricingProps> = ({ t }) => {
  const { pricingPlans, personal } = portfolio;
  const [currency, setCurrency] = useState<'USD' | 'KHR'>('USD');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('professional');
  const [checkoutPlan, setCheckoutPlan] = useState<PricingPlan | null>(null);

  const KHR_RATE = 4000; // Exchange rate approx 4,000 KHR / 1 USD

  const formatPrice = (usdAmount: number) => {
    if (currency === 'KHR') {
      const khrAmount = (usdAmount * KHR_RATE).toLocaleString();
      return `${khrAmount} ៛`;
    }
    return `$${usdAmount}`;
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlanId(plan.id);

    // Open PayWay checkout or open directly if link exists
    if (plan.paymentUrl) {
      setCheckoutPlan(plan);
    } else {
      // Fallback: Dispatch custom event so the Contact form auto-populates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('select-pricing-plan', {
            detail: {
              planName: plan.name,
              planPrice: plan.priceDisplay,
              planBudget: `${plan.name.split(' ')[0]} Plan (${plan.priceDisplay})`,
            },
          })
        );
      }

      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDirectPay = (plan: PricingPlan) => {
    if (plan.paymentUrl) {
      window.open(plan.paymentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleTelegramInquiry = (plan: PricingPlan) => {
    const text = `Hello Kim San! I visited your portfolio and I am interested in getting started with the ${plan.name} (${plan.priceDisplay}) for my project.`;
    const url = `https://t.me/kim_san145?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getPlanIcon = (id: string) => {
    switch (id) {
      case 'starter':
        return <Rocket className="w-5 h-5 text-emerald-500" />;
      case 'professional':
        return <Zap className="w-5 h-5 text-indigo-500" />;
      case 'enterprise':
        return <Layers className="w-5 h-5 text-purple-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section
      id="pricing"
      className="py-20 lg:py-28 relative bg-slate-50/70 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20"
    >
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.pricing?.badge || 'Transparent Investment'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.pricing?.title || 'Project Pricing & Development Plans'}
          </h2>

          <p className="mt-3.5 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.pricing?.subtitle ||
              'Milestone-based pricing engineered for predictability, transparent deliverables, and zero hidden fees.'}
          </p>

          {/* Currency Toggle & Milestone Badge */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs font-medium">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currency === 'USD'
                    ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('KHR')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currency === 'KHR'
                    ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                KHR (៛)
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full Source Code & Git Handover Included</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPlans.map((plan, index) => {
            const isPopular = plan.popular;
            const isSelected = selectedPlanId === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="h-full"
              >
                <Tilt
                  tiltMaxAngleX={isPopular ? 8 : 6}
                  tiltMaxAngleY={isPopular ? 8 : 6}
                  perspective={1200}
                  scale={isPopular ? 1.025 : 1.01}
                  transitionSpeed={800}
                  glareEnable={true}
                  glareMaxOpacity={isPopular ? 0.12 : 0.06}
                  glareColor="#818cf8"
                  glarePosition="all"
                  glareBorderRadius="20px"
                  className="h-full rounded-2xl"
                >
                  <div
                    className={`relative rounded-2xl flex flex-col justify-between h-full transition-all duration-300 p-6 sm:p-8 ${
                      isPopular
                        ? 'bg-white dark:bg-slate-900 border-2 border-indigo-500 shadow-xl shadow-indigo-500/15 ring-2 ring-indigo-500/20'
                        : 'bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400/40 hover:shadow-xl'
                    }`}
                  >
                    {/* Top Floating Badge for Most Popular or Quick Launch */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-md shadow-indigo-500/30 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>{t.pricing?.popularBadge || 'Most Popular'}</span>
                      </div>
                    )}

                    {/* Card Body */}
                    <div>
                      {/* Plan Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            {getPlanIcon(plan.id)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                              {plan.name}
                            </h3>
                            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                              {plan.badge}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price Display */}
                      <div className="my-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                            {formatPrice(plan.price)}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {t.pricing?.perProject || '/ project'}
                          </span>
                        </div>

                        {/* Timeline Turnaround */}
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>
                            <strong className="text-slate-900 dark:text-white">
                              {t.pricing?.deliveryTime || 'Turnaround:'}
                            </strong>{' '}
                            {plan.timeline}
                          </span>
                        </div>

                        <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      {/* Deliverables Checklist */}
                      <div className="space-y-3 mb-6">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {t.pricing?.whatsIncluded || "What's Included:"}
                        </div>
                        <ul className="space-y-2.5">
                          {plan.features.map((feature, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                            >
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isPopular
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : 'text-emerald-500'
                                }`}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {plan.paymentUrl ? (
                        <a
                          href={plan.paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                            isPopular
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
                              : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>{t.pricing?.choosePlan || 'Select Plan & Inquire'}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectPlan(plan)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                            isPopular
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
                              : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white'
                          }`}
                        >
                          <span>{t.pricing?.choosePlan || 'Select Plan & Inquire'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}

                      <div className="flex items-center gap-2">
                        {plan.paymentUrl && (
                          <button
                            type="button"
                            onClick={() => setCheckoutPlan(plan)}
                            className="flex-1 py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-800/60 transition-colors cursor-pointer"
                            title="Preview ABA PayWay QR / Details"
                          >
                            <QrCode className="w-3.5 h-3.5 text-indigo-500" />
                            <span>PayWay / QR</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleTelegramInquiry(plan)}
                          className="flex-1 py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Direct chat on Telegram"
                        >
                          <Send className="w-3.5 h-3.5 -rotate-12" />
                          <span>Telegram</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        {/* Milestone Guarantee Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {t.pricing?.fixedMilestoneNote ||
                  'All plans include clean source code, Git repository handover, and dedicated warranty.'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Accepted Payment Methods: ABA PayWay, Bakong KHQR, ABA Mobile, Wing, USD Wire, and Stripe.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap"
            >
              {t.pricing?.customPlanCta || 'Request Custom Proposal'}
            </a>
          </div>
        </div>

        {/* ABA PayWay Checkout Modal */}
        {checkoutPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setCheckoutPlan(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {checkoutPlan.name}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    ABA PayWay Secure Checkout
                  </p>
                </div>
              </div>

              {/* Plan Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 mb-6 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Total Investment:</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {formatPrice(checkoutPlan.price)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Turnaround Timeline:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {checkoutPlan.timeline}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Merchant / Account:</span>
                  <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    KIM SAN (002292898)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={checkoutPlan.paymentUrl || 'https://link.payway.com.kh/aba?id=18E2ED0EE307&code=461423&acc=002292898&dynamic=true'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Open ABA PayWay / KHQR Link</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setCheckoutPlan(null);
                    handleTelegramInquiry(checkoutPlan);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Details with Kim San on Telegram</span>
                </button>
              </div>

              {/* Security Footnote */}
              <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Protected by ABA Bank PayWay & Bakong National QR standard</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
