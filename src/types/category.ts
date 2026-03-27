import { BaseEntity } from "@/types/base";

export interface Category extends BaseEntity {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    icon?: string;
    parentId?: string;
    parent?: Category;
    children?: Category[];
    level: number;
    featured: boolean;
    active: boolean;
    productsCount: number;
    seoData?: {
      title: string;
      description: string;
      keywords: string[];
    };
  }