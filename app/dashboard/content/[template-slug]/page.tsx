'use client';

import React, { useContext, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import { templates } from '@/lib/Templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModal';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { useRouter } from 'next/navigation';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import { useUser } from '@clerk/nextjs';

interface Props {
  params: {
    'template-slug': string;
  };
}

const FREE_USER_LIMIT = 10_000;

function CreateNewContent({ params }: Props) {
  const selectedTemplate: TEMPLATE | undefined = templates.find(
    (t) => t.slug === params['template-slug']
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');

  const { user } = useUser();
  const router = useRouter();

  const { totalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  const handleGenerateContent = async (formData: Record<string, string>) => {
    if (!userSubscription && totalUsage >= FREE_USER_LIMIT) {
      router.push('/dashboard/billing');
      return;
    }

    setLoading(true);
    setAiOutput('');

    try {
      const prompt = `${JSON.stringify(formData)}, ${selectedTemplate?.aiPrompt}`;
      const result = await chatSession.sendMessage(prompt);
      const content = result?.response.text()?.trim();

      if (!content) {
        throw new Error('AI did not return valid content');
      }

      setAiOutput(content);
      await saveOutputToDb(formData, selectedTemplate?.slug, content);
      setUpdateCreditUsage(Date.now());
    } catch (error) {
      console.error('Error generating AI content:', error);
      setAiOutput('⚠️ Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveOutputToDb = async (
    formData: Record<string, string>,
    slug: string | undefined,
    content: string
  ) => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    await db.insert(AIOutput).values({
      formData: JSON.stringify(formData),
      templateSlug: slug,
      aiResponse: content,
      createdBy: email,
      createdAt: moment().format('DD/MM/yyyy'),
    });
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Template not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-white dark:bg-background text-gray-900 dark:text-gray-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="bg-background dark:bg-gray-900 p-5 rounded-xl shadow-md border dark:border-gray-800">
            <FormSection
              selectedTemplate={selectedTemplate}
              userFormInput={handleGenerateContent}
              loading={loading}
            />
          </div>

          {/* Right: Output */}
          <div className="lg:col-span-2">
            <OutputSection aiOutput={aiOutput} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
