
import ClassicTemplate from './classic';
import FloralTemplate from './floral';
import { ComponentType } from 'react';

export interface TemplateConfig {
  component: ComponentType;
  name: string;
  description: string;
}

export const templateRegistry: Record<string, TemplateConfig> = {
  classic: {
    component: ClassicTemplate,
    name: 'Classic Template',
    description: 'Traditional wedding invitation design'
  },
  floral: {
    component: FloralTemplate,
    name: 'Floral Template',
    description: 'Beautiful floral design template'
  },
  // Example: Add more templates easily
  // modern: {
  //   component: ModernTemplate, // import ModernTemplate from './modern';
  //   name: 'Modern Template',
  //   description: 'Contemporary minimalist design'
  // },
};

export function getTemplate(slug: string): TemplateConfig | null {
  return templateRegistry[slug] || null;
}

export function getAllTemplateNames(): string[] {
  return Object.keys(templateRegistry);
}
