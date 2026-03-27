export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SoftDeleteEntity extends BaseEntity {
    deletedAt?: string | null;
    isDeleted?: boolean;
  }