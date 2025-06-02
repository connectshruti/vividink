'use client';

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import { useRouter } from 'next/navigation';

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { setUserSubscription } = useContext(UserSubscriptionContext);
  const { updateCreditUsage } = useContext(UpdateCreditUsageContext);
  const router = useRouter();

  const [maxWords, setMaxWords] = useState(10_000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (!email) return;

    fetchUsageData();
    fetchSubscriptionStatus();
  }, [email]);

  useEffect(() => {
    if (email && updateCreditUsage) {
      fetchUsageData();
    }
  }, [updateCreditUsage, email]);

  async function fetchUsageData() {
    setLoading(true);
    setError(null);
    try {
      // Fetch AI usage data for the user
      const usage: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, email));

      // Sum length of AI responses (assuming length = number of credits used)
      const total = usage.reduce((acc, entry) => acc + (entry.aiResponse?.length || 0), 0);

      setTotalUsage(total);
    } catch (err) {
      console.error('Failed to fetch usage data:', err);
      setError('Failed to load usage data');
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubscriptionStatus() {
    try {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.email, email));

      const isSubscribed = result.length > 0;
      setUserSubscription(isSubscribed);
      setMaxWords(isSubscribed ? 1_000_000 : 10_000);
    } catch (err) {
      console.error('Failed to check subscription status:', err);
    }
  }

  const usagePercent = Math.min((totalUsage / maxWords) * 100, 100);

  return (
    <div className="m-5 bg-background tracking-wider" aria-busy={loading}>
      <div className="bg-primary text-white p-4 rounded-lg">
        <h2 className="font-medium text-lg">Credits</h2>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={maxWords}
          aria-valuenow={totalUsage}
          aria-label="Credit usage progress"
          className="h-2 bg-[#9981f9] w-full rounded-full mt-3 overflow-hidden"
        >
          <div
            className="h-2 bg-white rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${usagePercent}%` }}
          ></div>
        </div>

        <p className="text-sm my-2">
          {loading
            ? 'Loading usage...'
            : error
            ? error
            : `${totalUsage.toLocaleString()} / ${maxWords.toLocaleString()} credits used`}
        </p>
      </div>

      <Button
        variant="secondary"
        className="w-full my-3 text-secondary-foreground"
        onClick={() => router.push('/dashboard/billing')}
      >
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
