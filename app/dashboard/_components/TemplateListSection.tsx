import { templates } from "@/lib/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import { ComponentType, SVGProps } from "react";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplateListSection({ userSearchInput }: { userSearchInput: string }) {
  const [templateList, setTemplateList] = useState(templates);

  useEffect(() => {
    if (userSearchInput) {
      const filterData = templates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(templates);
    }
  }, [userSearchInput]);

  return (
    <div
      aria-label="Templates list"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8 md:p-10 bg-background text-foreground"
    >
      {templateList.map((item: TEMPLATE) => (
        <TemplateCard item={item} key={item.slug} {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
