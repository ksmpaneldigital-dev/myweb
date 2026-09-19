/**
 * Visitor & Recent Activity Service
 * Manages dynamic visitor counts, live concurrent reader estimation,
 * and realistic portfolio interaction notifications.
 */

export interface LiveActivityItem {
  id: string;
  type: 'visitor' | 'project' | 'course' | 'resume' | 'terminal' | 'code' | 'inquiry';
  title: string;
  description: string;
  location: string;
  countryCode: string;
  timeAgo: string;
  badge: string;
  actionLabel?: string;
  actionType?: 'scroll' | 'resume' | 'terminal' | 'external';
  actionTarget?: string;
  highlightText?: string;
}

const SEED_ACTIVITIES: Omit<LiveActivityItem, 'id' | 'timeAgo'>[] = [
  {
    type: 'visitor',
    title: 'New Portfolio Visit',
    description: 'Software engineer from San Francisco, CA just landed on the portfolio.',
    location: 'San Francisco, US',
    countryCode: 'US',
    badge: 'LIVE VISITOR',
    actionLabel: 'Say Hello',
    actionType: 'scroll',
    actionTarget: 'contact',
    highlightText: 'San Francisco, CA',
  },
  {
    type: 'course',
    title: 'Masterclass Preview',
    description: 'Someone from Singapore started watching the "BUILD SOFTWARE WITH AI" demo.',
    location: 'Singapore, SG',
    countryCode: 'SG',
    badge: 'AI COURSE',
    actionLabel: 'Watch Demo',
    actionType: 'scroll',
    actionTarget: 'education',
    highlightText: 'BUILD SOFTWARE WITH AI',
  },
  {
    type: 'project',
    title: 'Project Deep-Dive',
    description: 'Senior engineer from London, UK inspected Distributed Event Streaming Engine.',
    location: 'London, UK',
    countryCode: 'GB',
    badge: 'ARCHITECTURE',
    actionLabel: 'View System',
    actionType: 'scroll',
    actionTarget: 'projects',
    highlightText: 'Distributed Event Engine',
  },
  {
    type: 'resume',
    title: 'Resume Download',
    description: 'Technical recruiter from Zurich, Switzerland downloaded KIMSAN\'s Senior Backend CV.',
    location: 'Zurich, CH',
    countryCode: 'CH',
    badge: 'RECRUITER ACTION',
    actionLabel: 'View Resume',
    actionType: 'resume',
    highlightText: 'Senior Backend CV',
  },
  {
    type: 'terminal',
    title: 'DevTerminal CLI',
    description: 'Visitor from Tokyo, Japan executed "skills --all" in the interactive terminal.',
    location: 'Tokyo, JP',
    countryCode: 'JP',
    badge: 'INTERACTIVE CLI',
    actionLabel: 'Open Terminal',
    actionType: 'terminal',
    highlightText: 'skills --all',
  },
  {
    type: 'code',
    title: 'Code Architecture Audit',
    description: 'Architect from Berlin, Germany explored the Go High-Throughput Worker Pool implementation.',
    location: 'Berlin, DE',
    countryCode: 'DE',
    badge: 'SOURCE CODE',
    actionLabel: 'Inspect Code',
    actionType: 'scroll',
    actionTarget: 'code',
    highlightText: 'Go Worker Pool',
  },
  {
    type: 'project',
    title: 'Full-Stack Showcase',
    description: 'Tech Lead from Toronto, Canada viewed Cloud-Native Multi-Tenant SaaS platform.',
    location: 'Toronto, CA',
    countryCode: 'CA',
    badge: 'SHOWCASE',
    actionLabel: 'View Project',
    actionType: 'scroll',
    actionTarget: 'projects',
    highlightText: 'Multi-Tenant SaaS',
  },
  {
    type: 'inquiry',
    title: 'Consultation Inquiry',
    description: 'Engineering manager from Sydney, Australia reviewed enterprise backend availability.',
    location: 'Sydney, AU',
    countryCode: 'AU',
    badge: 'COLLABORATION',
    actionLabel: 'Work Together',
    actionType: 'scroll',
    actionTarget: 'contact',
    highlightText: 'Backend Availability',
  },
];

const STORAGE_KEYS = {
  TOTAL_VISITORS: 'proservers_visitor_total_count',
  SESSION_LOGGED: 'proservers_session_visit_logged',
  SNOOZE_UNTIL: 'proservers_live_toast_snoozed',
  DISMISSED_COUNT: 'proservers_live_toast_dismiss_count',
};

const BASE_VISITOR_COUNT = 1488;

class VisitorActivityService {
  private totalVisitors: number = BASE_VISITOR_COUNT;
  private currentActiveViewers: number = 4;
  private activityHistory: LiveActivityItem[] = [];
  private listeners: Set<(activity: LiveActivityItem) => void> = new Set();
  private statsListeners: Set<(stats: { total: number; active: number }) => void> = new Set();
  private timer: any = null;
  private currentIndex: number = 0;

  constructor() {
    this.initVisitorCounts();
    this.initHistory();
  }

  private initVisitorCounts() {
    if (typeof window === 'undefined') return;

    try {
      const savedCount = localStorage.getItem(STORAGE_KEYS.TOTAL_VISITORS);
      let count = savedCount ? parseInt(savedCount, 10) : BASE_VISITOR_COUNT;
      if (isNaN(count) || count < BASE_VISITOR_COUNT) {
        count = BASE_VISITOR_COUNT;
      }

      // If user hasn't logged this tab session, increment
      const sessionLogged = sessionStorage.getItem(STORAGE_KEYS.SESSION_LOGGED);
      if (!sessionLogged) {
        count += 1;
        sessionStorage.setItem(STORAGE_KEYS.SESSION_LOGGED, 'true');
        localStorage.setItem(STORAGE_KEYS.TOTAL_VISITORS, count.toString());
      }

      this.totalVisitors = count;

      // Realistic active viewer count based on time of day + small variance
      const hour = new Date().getHours();
      const baseActive = (hour >= 8 && hour <= 22) ? 4 : 2;
      this.currentActiveViewers = baseActive + Math.floor(Math.random() * 3);
    } catch {
      this.totalVisitors = BASE_VISITOR_COUNT;
      this.currentActiveViewers = 4;
    }
  }

  private initHistory() {
    // Generate initial history items with varied timestamps
    const times = ['Just now', '1m ago', '3m ago', '6m ago', '12m ago', '19m ago', '35m ago'];
    this.activityHistory = SEED_ACTIVITIES.slice(0, 5).map((act, idx) => ({
      ...act,
      id: `act-init-${idx}`,
      timeAgo: times[idx] || `${idx * 4}m ago`,
    }));
  }

  public getVisitorStats(): { total: number; active: number } {
    return {
      total: this.totalVisitors,
      active: this.currentActiveViewers,
    };
  }

  public getRecentActivities(): LiveActivityItem[] {
    return [...this.activityHistory];
  }

  public getNextActivity(): LiveActivityItem {
    const raw = SEED_ACTIVITIES[this.currentIndex % SEED_ACTIVITIES.length];
    this.currentIndex += 1;

    // Slightly fluctuate active viewers naturally between 3 and 7
    const delta = Math.random() > 0.5 ? 1 : -1;
    this.currentActiveViewers = Math.max(3, Math.min(7, this.currentActiveViewers + delta));
    this.notifyStatsListeners();

    const activity: LiveActivityItem = {
      ...raw,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timeAgo: 'Just now',
    };

    // Prepend to history, keep top 10
    this.activityHistory = [activity, ...this.activityHistory.slice(0, 9)];

    return activity;
  }

  public isSnoozed(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const snoozeUntil = localStorage.getItem(STORAGE_KEYS.SNOOZE_UNTIL);
      if (!snoozeUntil) return false;
      const expire = parseInt(snoozeUntil, 10);
      return Date.now() < expire;
    } catch {
      return false;
    }
  }

  public setSnooze(minutes: number = 30) {
    if (typeof window === 'undefined') return;
    try {
      const expire = Date.now() + minutes * 60 * 1000;
      localStorage.setItem(STORAGE_KEYS.SNOOZE_UNTIL, expire.toString());
    } catch {
      // ignore
    }
  }

  public clearSnooze() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEYS.SNOOZE_UNTIL);
    } catch {
      // ignore
    }
  }

  public onStatsChange(listener: (stats: { total: number; active: number }) => void): () => void {
    this.statsListeners.add(listener);
    listener({ total: this.totalVisitors, active: this.currentActiveViewers });
    return () => this.statsListeners.delete(listener);
  }

  private notifyStatsListeners() {
    const stats = this.getVisitorStats();
    this.statsListeners.forEach((l) => l(stats));
  }
}

export const visitorActivityService = new VisitorActivityService();
