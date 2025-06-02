'use client';

import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { db } from '@/utils/db'; // Check if this is client-safe
import { UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';

function Billing() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);

  const CreateSubscription = () => {
    setLoading(true);
    axios.post('/api/create-subscription', {})
      .then(resp => OnPayment(resp.data.id))
      .catch(() => setLoading(false));
  };

  const loadScript = (src: string) =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const OnPayment = async (subId: string) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay failed to load!');
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: 'Tubeguruji AI Apps',
      description: 'Monthly Subscription',
      handler: async (resp: any) => {
        if (resp) {
          await SaveSubscription(resp.razorpay_payment_id);
        }
        setLoading(false);
      },
      // Add prefill, theme etc if needed
    };

    try {
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error('Razorpay init error', e);
      setLoading(false);
    }
  };

  const SaveSubscription = async (paymentId: string) => {
    try {
      // Prefer calling an API route here instead of direct DB access
      const result = await db.insert(UserSubscription).values({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        active: true,
        paymentId,
        joinDate: moment().format('DD/MM/YYYY'), // Fixed format
      });

      if (result) {
        // Reload or better: update context state
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to save subscription', error);
      alert('Failed to save subscription. Please contact support.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center font-extrabold text-4xl mb-12">Upgrade to Monthly Plan</h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Free Plan */}
          <PlanCard
            title="Free"
            price="0"
            features={[
              '10,000 Words/Month',
              '50+ Content Templates',
              'Unlimited Download & Copy',
              '1 Month of History',
            ]}
            active={!userSubscription}
          />

          {/* Paid Plan */}
          <PlanCard
            title="Monthly"
            price="9.99"
            features={[
              '100,000 Words/Month',
              '50+ Template Access',
              'Unlimited Download & Copy',
              '1 Year of History',
            ]}
            active={!!userSubscription}
            button={
              <Button
                disabled={loading || !!userSubscription}
                onClick={CreateSubscription}
                className="w-full mt-6"
                variant={userSubscription ? 'secondary' : 'default'}
                aria-live="polite"
              >
                {loading && <Loader2Icon className="animate-spin mr-2 h-5 w-5" aria-hidden="true" />}
                {userSubscription ? 'Current Plan' : 'Get Started'}
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Billing;

function PlanCard({
  title,
  price,
  features,
  active = false,
  button,
}: {
  title: string;
  price: string;
  features: string[];
  active?: boolean;
  button?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-7 shadow-md bg-white dark:bg-background dark:border-gray-700
        transition-transform hover:scale-[1.03] hover:shadow-lg cursor-pointer ${
          active ? 'border-indigo-600 dark:border-indigo-400' : 'border-gray-300 dark:border-gray-600'
        }`}
      role="region"
      aria-label={`${title} plan`}
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-3 text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          ${price}
          <span className="ml-1 text-lg font-medium text-gray-600 dark:text-gray-400">/month</span>
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Billed monthly</p>
      </div>

      <ul className="mt-8 space-y-4 text-gray-700 dark:text-gray-300 text-base">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      {active && !button && (
        <p className="mt-8 text-center text-indigo-600 dark:text-indigo-400 font-semibold">
          Currently Active Plan
        </p>
      )}

      {button && <div className="mt-8">{button}</div>}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-6 h-6 text-indigo-700 dark:text-indigo-400 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
