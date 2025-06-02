'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { TEMPLATE } from '../../_components/TemplateListSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (formData: Record<string, string>) => void;
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectedTemplate?.form) {
      const initData: Record<string, string> = {};
      selectedTemplate.form.forEach((field) => {
        initData[field.name] = '';
      });
      setFormData(initData);
    } else {
      setFormData({});
    }
  }, [selectedTemplate]);

  // Focus first input after formData is set
  useEffect(() => {
    if (selectedTemplate?.form?.length && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [ selectedTemplate]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <section
      className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-md sm:shadow-xl p-6 sm:p-10 transition-all duration-300"
      aria-busy={loading}
    >
      <div aria-live="polite" className="sr-only">
        {loading ? 'Loading, please wait...' : ''}
      </div>

      {selectedTemplate?.icon && (
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 shadow">
          <selectedTemplate.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-200">
          {selectedTemplate?.name}
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {selectedTemplate?.desc}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        {selectedTemplate?.form?.map((field, idx) => {
          const isTextarea = field.field === 'textarea';
          const inputId = field.name;
          const noteId = `${inputId}-note`;

          return (
            <div key={idx} className="space-y-2">
              <label
                htmlFor={inputId}
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.field === 'input' && (
                <Input
                  ref={idx === 0 ? firstInputRef : undefined}
                  id={inputId}
                  name={field.name}
                  required={field.required}
                  onChange={handleInputChange}
                  value={formData[field.name] || ''}
                  className="bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                />
              )}

              {isTextarea && (
                <>
                  <Textarea
                    id={inputId}
                    name={field.name}
                    required={field.required}
                    rows={5}
                    maxLength={2000}
                    onChange={handleInputChange}
                    value={formData[field.name] || ''}
                    aria-describedby={noteId}
                    className="bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                  />
                  <p
                    id={noteId}
                    className="text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    Max 2000 characters
                  </p>
                </>
              )}
            </div>
          );
        })}

        <Button
          type="submit"
          className="w-full py-5 text-base font-semibold rounded-xl transition-all duration-200 hover:bg-indigo-600 hover:dark:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading && (
            <Loader2Icon className="animate-spin mr-2 h-5 w-5" aria-hidden="true" />
          )}
          Generate Content
        </Button>
      </form>
    </section>
  );
}

export default FormSection;
