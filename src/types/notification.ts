import { BaseEntity } from "@/types/base";
import { User } from "@/types/user";
import { NotificationType } from "@/utils/constants";
import { Company } from "@/types/company";


export interface Notification extends BaseEntity {
  userId: string;
  user?: User;
  
  type: NotificationType;
  title: string;
  message: string;
  
  // Actions
  actionUrl?: string;
  actionText?: string;
  
  // Status
  isRead: boolean;
  readAt?: string;
  
  // Related entities
  relatedEntityType?: 'order' | 'product' | 'user' | 'company';
  relatedEntityId?: string;
  
  // Delivery
  channels: ('app' | 'email' | 'sms' | 'whatsapp')[];
  deliveryStatus?: {
    [K in 'app' | 'email' | 'sms' | 'whatsapp']?: {
      sent: boolean;
      sentAt?: string;
      delivered?: boolean;
      deliveredAt?: string;
      error?: string;
    };
  };
  
  // Metadata
  metadata?: Record<string, any>;
}

export interface ChatConversation extends BaseEntity {
  participants: {
    userId: string;
    user?: User;
    role: 'client' | 'company_admin' | 'support';
    joinedAt: string;
    leftAt?: string;
  }[];
  
  companyId?: string;
  company?: Company;
  
  title?: string;
  type: 'direct' | 'support' | 'group';
  status: 'active' | 'closed' | 'archived';
  
  lastMessage?: ChatMessage;
  lastActivity: string;
  
  // Metadata
  tags?: string[];
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  metadata?: Record<string, any>;
}

export interface ChatMessage extends BaseEntity {
  conversationId: string;
  conversation?: ChatConversation;
  
  senderId: string;
  sender?: User;
  
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  
  // Attachments
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
    size?: number;
  }[];
  
  // Status
  isRead: boolean;
  readBy?: {
    userId: string;
    readAt: string;
  }[];
  
  // Editing
  isEdited: boolean;
  editedAt?: string;
  originalContent?: string;
  
  // Replies
  replyToId?: string;
  replyTo?: ChatMessage;
  
  // Metadata
  metadata?: Record<string, any>;
}
