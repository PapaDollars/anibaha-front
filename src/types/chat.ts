import { BaseEntity } from "@/types/base";
import { User } from "@/types/user";

export interface ChatMessage extends BaseEntity {
    chatId: string;
    senderId: string;
    sender: User;
    receiverId: string;
    receiver: User;
    message: string;
    messageType: 'text' | 'image' | 'file' | 'order' | 'product';
    attachments?: string[];
    read: boolean;
    readAt?: string;
    edited: boolean;
    editedAt?: string;
    replyTo?: string;
  }
  
  export interface Chat extends BaseEntity {
    participants: string[];
    participantDetails: User[];
    lastMessage?: ChatMessage;
    orderId?: string;
    productId?: string;
    type: 'support' | 'order' | 'general';
    status: 'active' | 'closed' | 'archived';
    unreadCount: Record<string, number>;
  }
  