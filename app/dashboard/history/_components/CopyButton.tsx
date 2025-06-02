'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

interface CopyButtonProps {
  aiResponse: string;
}

function CopyButton({ aiResponse }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!aiResponse) return;

    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      className="text-primary px-3 flex items-center space-x-1 transition-all duration-200 min-w-[90px]"
      onClick={handleCopy}
      disabled={!aiResponse || copied}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </>
      )}
    </Button>
  );
}

export default CopyButton;
