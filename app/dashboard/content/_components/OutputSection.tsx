'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const [copied, setCopied] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: 'Your result will appear here',
    editable: false,
  });

  useEffect(() => {
    if (editor && aiOutput) {
      editor.commands.setContent(aiOutput.trim());
    }
  }, [aiOutput, editor]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(aiOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  }, [aiOutput]);

  if (!editor) return null;

  return (
    <section className="bg-white dark:bg-background text-foreground shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-5 border-b dark:border-gray-600">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Result</h2>
        <Button
          variant="outline"
          className="flex gap-2 text-sm"
          onClick={handleCopy}
          aria-label="Copy result to clipboard"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>

      <div role="region" aria-live="polite" aria-label="AI generated result">
        <EditorContent
          editor={editor}
          className="p-5 prose dark:prose-invert max-w-none text-sm leading-relaxed"
        />
      </div>
    </section>
  );
}

export default OutputSection;
