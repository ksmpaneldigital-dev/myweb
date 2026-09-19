import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Users,
  Eye,
  Activity,
  X,
  ExternalLink,
  Terminal,
  FileText,
  Code2,
  Sparkles,
  MapPin,
  Volume2,
  VolumeX,
  History,
  CheckCircle2,
  ChevronRight,
  Minimize2,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';
import {
  visitorActivityService,
  LiveActivityItem,
} from '../services/visitorActivityService';

interface LiveActivityToastProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const LiveActivityToast: React.FC<LiveActivityToastProps> = ({
  onOpenResume,
  onOpenTerminal,
}) => {
  const [currentActivity, setCurrentActivity] = useState<LiveActivityItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSnoozed, setIsSnoozed] = useState(() => visitorActivityService.isSnoozed());
  const [showHistory, setShowHistory] = useState(false);
  const [stats, setStats] = useState(() => visitorActivityService.getVisitorStats());
  const [recentActivities, setRecentActivities] = useState<LiveActivityItem[]>(() =>
    visitorActivityService.getRecentActivities()
  );
  const [progress, setProgress] = useState(100);

  const DISPLAY_DURATION = 6500; // 6.5s visible
  const INTERVAL_BETWEEN = 22000; // 22s between notifications
  const INITIAL_DELAY = 3800; // First toast appears after 3.8s

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync visitor stats
  useEffect(() => {
    const unsub = visitorActivityService.onStatsChange((newStats) => {
      setStats(newStats);
    });
    return unsub;
  }, []);

  // Display lifecycle for toasts
  useEffect(() => {
    if (isSnoozed) {
      setIsVisible(false);
      return;
    }

    const showNext = () => {
      const next = visitorActivityService.getNextActivity();
      setCurrentActivity(next);
      setRecentActivities(visitorActivityService.getRecentActivities());
      setIsVisible(true);
      setProgress(100);

      // Start progress countdown
      const startTime = Date.now();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      progressIntervalRef.current = setInterval(() => {
        if (isPaused) return;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / DISPLAY_DURATION) * 100);
        setProgress(remaining);

        if (remaining <= 0) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setIsVisible(false);
          // Schedule next appearance
          timerRef.current = setTimeout(showNext, INTERVAL_BETWEEN);
        }
      }, 50);
    };

    // Initial timeout trigger
    timerRef.current = setTimeout(showNext, INITIAL_DELAY);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isSnoozed]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Schedule next after delay
    timerRef.current = setTimeout(() => {
      if (!isSnoozed) {
        const next = visitorActivityService.getNextActivity();
        setCurrentActivity(next);
        setRecentActivities(visitorActivityService.getRecentActivities());
        setIsVisible(true);
        setProgress(100);
      }
    }, INTERVAL_BETWEEN);
  };

  const handleSnoozeToggle = () => {
    if (isSnoozed) {
      visitorActivityService.clearSnooze();
      setIsSnoozed(false);
      setIsVisible(true);
    } else {
      visitorActivityService.setSnooze(30);
      setIsSnoozed(true);
      setIsVisible(false);
    }
  };

  const handleAction = (activity: LiveActivityItem) => {
    if (activity.actionType === 'resume') {
      onOpenResume();
    } else if (activity.actionType === 'terminal') {
      onOpenTerminal();
    } else if (activity.actionType === 'scroll' && activity.actionTarget) {
      const el = document.getElementById(activity.actionTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsVisible(false);
  };

  // Helper to render activity-specific icons
  const getActivityIcon = (type: LiveActivityItem['type']) => {
    switch (type) {
      case 'course':
        return <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      case 'project':
        return <Code2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
      case 'resume':
        return <FileText className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'terminal':
        return <Terminal className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />;
      case 'code':
        return <Activity className="w-4 h-4 text-violet-500 dark:text-violet-400" />;
      default:
        return <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
    }
  };

  return (
    <>
      {/* 1. Main Live Toast Notification */}
      <div
        id="live-activity-toast-wrapper"
        className="fixed bottom-5 left-5 z-40 max-w-sm w-[calc(100vw-2.5rem)] sm:w-96 pointer-events-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence>
          {isVisible && currentActivity && (
            <motion.div
              key={currentActivity.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 shadow-2xl backdrop-blur-xl p-4 transition-all"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Live Activity
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {stats.active} online
                  </span>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    type="button"
                    onClick={() => setShowHistory((prev) => !prev)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    title="View Recent Activity Feed"
                    aria-label="View recent activity history"
                  >
                    <History className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    title="Dismiss"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Activity Body */}
              <div className="pt-3 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
                  {getActivityIcon(currentActivity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {currentActivity.title}
                    </span>
                    <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 shrink-0">
                      {currentActivity.timeAgo}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {currentActivity.description}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-2.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate max-w-[130px] font-medium">{currentActivity.location}</span>
                    </div>

                    {currentActivity.actionLabel && (
                      <button
                        type="button"
                        onClick={() => handleAction(currentActivity)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{currentActivity.actionLabel}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Live Progress Countdown Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Persistent Bottom-Left Live Status Pill */}
      {/* Displays visitor counter milestone & active viewers, click to reopen or see live stats */}
      <div className="fixed bottom-5 left-5 z-30">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              if (isSnoozed) {
                handleSnoozeToggle();
              } else {
                setShowHistory((prev) => !prev);
              }
            }}
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl backdrop-blur-md transition-all text-xs font-medium"
            title="Live Portfolio Stats & Activity Feed"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>

            <span className="font-semibold text-slate-900 dark:text-white">
              {stats.active} <span className="font-normal text-slate-600 dark:text-slate-400">online</span>
            </span>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
              {stats.total.toLocaleString()} <span className="font-sans text-slate-500 dark:text-slate-400">visits</span>
            </span>

            <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-bold tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/40 ml-0.5 group-hover:scale-105 transition-transform">
              Live
            </span>
          </button>
        </div>
      </div>

      {/* 3. Recent Activity Log Modal / Popover */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-start p-4 sm:p-6 bg-slate-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:ml-4"
            >
              {/* Popover Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Live Portfolio Activity
                    </h3>
                    <p className="text-xs text-slate-500">
                      Recent interactions & active visitor stream
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHistory(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stats Banner */}
              <div className="grid grid-cols-2 gap-2 p-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80">
                  <span className="text-[11px] text-slate-500 block font-medium">Total Page Visits</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    {stats.total.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80">
                  <span className="text-[11px] text-slate-500 block font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Concurrent Readers
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {stats.active} Active Now
                  </span>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="p-4 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 space-y-3">
                {recentActivities.map((act) => (
                  <div key={act.id} className="pt-3 first:pt-0 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      {getActivityIcon(act.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">
                          {act.title}
                        </span>
                        <span className="text-[10px] text-slate-500">{act.timeAgo}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        {act.description}
                      </p>
                      <div className="flex items-center justify-between gap-2 mt-1.5">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {act.location}
                        </span>
                        {act.actionLabel && (
                          <button
                            type="button"
                            onClick={() => {
                              setShowHistory(false);
                              handleAction(act);
                            }}
                            className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>{act.actionLabel}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popover Footer */}
              <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleSnoozeToggle}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  {isSnoozed ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-amber-500" />
                      <span>Notifications Snoozed (Click to resume)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Mute popups (30m)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowHistory(false)}
                  className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
