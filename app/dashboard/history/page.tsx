import { templates } from '@/lib/Templates';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import React from 'react';
import { TEMPLATE } from '../_components/TemplateListSection';
import CopyButton from './_components/CopyButton';

export interface HISTORY {
  id: number;
  formData: string | null;
  aiResponse: string | null;
  templateSlug: string | null;
  createdBy: string | null;
  createdAt: string | null;
}

function formatDate(dateStr: string) {
  try {
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

async function History() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const historyList: HISTORY[] = email
    ? await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, email))
        .orderBy(desc(AIOutput.id))
    : [];

  const getTemplate = (slug: string): TEMPLATE | undefined =>
    templates.find((item) => item.slug === slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Your AI Content History
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Browse and copy your previously generated outputs.
        </p>
      </div>

      {historyList.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg">🕵️ No history found yet.</p>
          <p className="text-sm mt-2">Start generating content to view your history here.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {historyList.map((item) => {
            const template = getTemplate(item.templateSlug ?? '');

            return (
              <div
                key={item.id}
                className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template?.name || '🧩 Unknown Template'}
                  </h3>
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(item.createdAt ?? '')}
                  </time>
                </div>

                <div
                  className="prose prose-sm dark:prose-invert max-h-40 overflow-y-auto mb-4 whitespace-pre-wrap
                  scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-thumb-rounded transition-all duration-300"
                >
                  {item.aiResponse?.slice(0, 300)}
                  {item.aiResponse && item.aiResponse.length > 300 ? '...' : ''}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{(item.aiResponse?.length ?? 0).toLocaleString()} characters</span>
                  <CopyButton aiResponse={item.aiResponse ?? ''} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
