import { NewsletterSubscriber, NewsletterSubscriptionResult } from '../types';

const STORAGE_KEY = 'portfolio_newsletter_subscribers';
const MY_SUBSCRIPTION_KEY = 'portfolio_newsletter_my_email';
const SYNC_EVENT_NAME = 'newsletter_subscribers_updated';

// Baseline starter subscribers to ensure realistic persistence preview
const DEFAULT_INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: 'sub_seed_1',
    email: 'alexander.chen@devops-lead.org',
    timestamp: '2026-08-15T09:30:00.000Z',
    verified: true,
  },
  {
    id: 'sub_seed_2',
    email: 'sokha.tech@cambodia-code.io',
    timestamp: '2026-09-01T14:15:00.000Z',
    verified: true,
  },
  {
    id: 'sub_seed_3',
    email: 'clara.ux@fullstack-design.com',
    timestamp: '2026-09-10T11:45:00.000Z',
    verified: true,
  },
];

class NewsletterMockService {
  private memoryCache: NewsletterSubscriber[] | null = null;

  /**
   * Safely loads subscribers from localStorage or in-memory cache
   */
  public getSavedSubscribers(): NewsletterSubscriber[] {
    if (typeof window === 'undefined') {
      return DEFAULT_INITIAL_SUBSCRIBERS;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.memoryCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[NewsletterService] Failed to read localStorage, falling back to memory cache', e);
    }

    // If no storage exists yet, seed initial subscribers and persist
    if (!this.memoryCache) {
      this.memoryCache = [...DEFAULT_INITIAL_SUBSCRIBERS];
      this.persistToStorage(this.memoryCache);
    }

    return this.memoryCache;
  }

  /**
   * Persists subscriber list to localStorage and notifies active listeners
   */
  private persistToStorage(subscribers: NewsletterSubscriber[]): void {
    this.memoryCache = subscribers;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
      } catch (err) {
        console.warn('[NewsletterService] localStorage write failed', err);
      }

      // Notify other components or tabs
      window.dispatchEvent(
        new CustomEvent(SYNC_EVENT_NAME, {
          detail: { subscribers },
        })
      );
    }
  }

  /**
   * Gets the email that the current user subscribed with on this browser
   */
  public getMySubscribedEmail(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(MY_SUBSCRIPTION_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Saves the current browser's subscribed email
   */
  public setMySubscribedEmail(email: string): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(MY_SUBSCRIPTION_KEY, email);
      } catch {
        // ignore in private browsing modes
      }
    }
  }

  /**
   * Check if an email is already in the subscriber list
   */
  public isSubscribed(email: string): boolean {
    const list = this.getSavedSubscribers();
    const normalized = email.trim().toLowerCase();
    return list.some((sub) => sub.email.toLowerCase() === normalized);
  }

  /**
   * Mock API: Asynchronously fetch all subscribers with simulated network latency
   */
  public async getSubscribers(): Promise<NewsletterSubscriber[]> {
    // Simulate 150ms network roundtrip
    await new Promise((resolve) => setTimeout(resolve, 150));
    return this.getSavedSubscribers();
  }

  /**
   * Mock API: Asynchronously subscribe an email address to the newsletter
   */
  public async subscribe(email: string): Promise<NewsletterSubscriptionResult> {
    const normalized = email.trim().toLowerCase();

    // Simulate 350ms network latency
    await new Promise((resolve) => setTimeout(resolve, 350));

    // 1. Syntax validation
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!normalized || !EMAIL_REGEX.test(normalized)) {
      return {
        success: false,
        code: 'INVALID_EMAIL',
        message: 'Invalid email format provided.',
        totalSubscribers: this.getSavedSubscribers().length,
      };
    }

    const currentList = this.getSavedSubscribers();

    // 2. Duplicate detection
    const existing = currentList.find((sub) => sub.email.toLowerCase() === normalized);
    if (existing) {
      this.setMySubscribedEmail(normalized);
      return {
        success: false,
        code: 'ALREADY_SUBSCRIBED',
        message: 'This email address is already subscribed.',
        subscriber: existing,
        totalSubscribers: currentList.length,
      };
    }

    // 3. Create new subscriber record
    const newSubscriber: NewsletterSubscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalized,
      timestamp: new Date().toISOString(),
      verified: true,
    };

    const updatedList = [newSubscriber, ...currentList];
    this.persistToStorage(updatedList);
    this.setMySubscribedEmail(normalized);

    // 4. Local logging mechanism
    console.info('📬 [Mock API: /api/v1/newsletter/subscribe] New subscriber persisted:', {
      subscriber: newSubscriber,
      totalCount: updatedList.length,
      storageKey: STORAGE_KEY,
    });

    return {
      success: true,
      code: 'SUCCESS',
      message: 'Successfully subscribed to the developer newsletter.',
      subscriber: newSubscriber,
      totalSubscribers: updatedList.length,
    };
  }

  /**
   * Mock API: Unsubscribe an email
   */
  public async unsubscribe(email: string): Promise<boolean> {
    const normalized = email.trim().toLowerCase();
    const currentList = this.getSavedSubscribers();
    const filtered = currentList.filter((sub) => sub.email.toLowerCase() !== normalized);

    if (filtered.length !== currentList.length) {
      this.persistToStorage(filtered);
      if (this.getMySubscribedEmail() === normalized) {
        localStorage.removeItem(MY_SUBSCRIPTION_KEY);
      }
      return true;
    }
    return false;
  }

  /**
   * Listen to real-time updates across tabs and within the window
   */
  public onSubscribersChange(
    callback: (subscribers: NewsletterSubscriber[]) => void
  ): () => void {
    if (typeof window === 'undefined') return () => {};

    // 1. Same-window custom event handler
    const handleCustomSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ subscribers: NewsletterSubscriber[] }>;
      if (customEvent.detail && Array.isArray(customEvent.detail.subscribers)) {
        callback(customEvent.detail.subscribers);
      } else {
        callback(this.getSavedSubscribers());
      }
    };

    // 2. Cross-tab storage event handler
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        callback(this.getSavedSubscribers());
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleCustomSync);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleCustomSync);
      window.removeEventListener('storage', handleStorageChange);
    };
  }
}

export const newsletterService = new NewsletterMockService();
