import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faPaperPlane,
    faSmile,
    faPaperclip,
    faTimes,
    faCheck,
    faCheckDouble,
    faArrowLeft,
    faInfoCircle,
    faStar,
    faClock,
    faSearch,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import {
    faWhatsapp,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';

// Types
interface ChatContact {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    lastSeen?: string;
    isTyping: boolean;
    unreadCount: number;
    companyInfo: {
        name: string;
        rating: number;
        responseTime: number;
        isVerified: boolean;
        category: string;
        phone: string;
    };
}

interface ChatMessage {
    id: string;
    senderId: string;
    content: string;
    type: 'text' | 'image' | 'file' | 'audio' | 'location' | 'product';
    timestamp: string;
    status: 'sending' | 'sent' | 'delivered' | 'read';
    replyTo?: string;
    metadata?: {
        fileName?: string;
        fileSize?: number;
        productId?: string;
        latitude?: number;
        longitude?: number;
    };
}

interface ProductMessage {
    id: string;
    name: string;
    price: number;
    image: string;
    company: string;
    inStock: boolean;
    description?: string;
}

interface StoredChatData {
    contacts: ChatContact[];
    messages: { [contactId: string]: ChatMessage[] };
    lastUpdate: string;
}

const WhatsAppChatSystem: React.FC = () => {
    // States
    const [isOpen, setIsOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [contacts, setContacts] = useState<ChatContact[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [allMessages, setAllMessages] = useState<{ [contactId: string]: ChatMessage[] }>({});
    const [showContactInfo, setShowContactInfo] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

    // Données initiales des entreprises
    const initialContacts: ChatContact[] = [
        {
            id: 'company-1',
            name: 'TechCorp Cameroun',
            avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
            isOnline: true,
            isTyping: false,
            unreadCount: 0,
            companyInfo: {
                name: 'TechCorp Cameroun',
                rating: 4.8,
                responseTime: 5,
                isVerified: true,
                category: 'Électronique',
                phone: '+237677123456'
            }
        },
        {
            id: 'company-2',
            name: 'Fashion Hub Africa',
            avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
            isOnline: false,
            lastSeen: '2025-06-25T14:30:00Z',
            isTyping: false,
            unreadCount: 0,
            companyInfo: {
                name: 'Fashion Hub Africa',
                rating: 4.6,
                responseTime: 15,
                isVerified: true,
                category: 'Mode',
                phone: '+237678234567'
            }
        },
        {
            id: 'company-3',
            name: 'BeautyLux Cosmetics',
            avatar: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
            isOnline: true,
            isTyping: false,
            unreadCount: 0,
            companyInfo: {
                name: 'BeautyLux Cosmetics',
                rating: 4.7,
                responseTime: 8,
                isVerified: true,
                category: 'Beauté',
                phone: '+237679345678'
            }
        },
        {
            id: 'company-4',
            name: 'Agro Fresh Market',
            avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop',
            isOnline: true,
            isTyping: false,
            unreadCount: 0,
            companyInfo: {
                name: 'Agro Fresh Market',
                rating: 4.9,
                responseTime: 3,
                isVerified: true,
                category: 'Alimentation',
                phone: '+237670456789'
            }
        }
    ];

    const sampleProducts: { [key: string]: ProductMessage } = {
        'product-1': {
            id: 'product-1',
            name: 'MacBook Pro 16" M3 Max',
            price: 2800000,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop',
            company: 'TechCorp Cameroun',
            inStock: true,
            description: '32GB RAM, 1TB SSD, Garantie 2 ans'
        },
        'product-2': {
            id: 'product-2',
            name: 'Robe Africaine Premium',
            price: 85000,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=200&fit=crop',
            company: 'Fashion Hub Africa',
            inStock: true,
            description: 'Coton Wax authentique, Tailles S-XL'
        }
    };

    const emojis = ['😊', '😂', '❤️', '👍', '👎', '😮', '😢', '😡', '🔥', '💯', '🎉', '👌', '🛍️', '💰', '🚚', '⭐'];

    // Fonctions de persistance
    const saveToStorage = (data: StoredChatData) => {
        const dataWithExpiry = {
            ...data,
            expiryTime: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 jours
        };
        // En mémoire seulement (pas de localStorage dans Claude.ai)
        (window as any).__whatsappChatData = dataWithExpiry;
    };

    const loadFromStorage = (): StoredChatData | null => {
        try {
            const stored = (window as any).__whatsappChatData;
            if (stored && stored.expiryTime > Date.now()) {
                return stored;
            }
            return null;
        } catch {
            return null;
        }
    };

    const clearExpiredData = () => {
        const stored = (window as any).__whatsappChatData;
        if (stored && stored.expiryTime <= Date.now()) {
            delete (window as any).__whatsappChatData;
        }
    };

    // Effects
    useEffect(() => {
        clearExpiredData();
        const storedData = loadFromStorage();

        if (storedData) {
            setContacts(storedData.contacts);
            setAllMessages(storedData.messages);
        } else {
            setContacts(initialContacts);
            setAllMessages({});
        }
    }, []);

    useEffect(() => {
        if (selectedContact) {
            setMessages(allMessages[selectedContact.id] || []);
        }
    }, [selectedContact, allMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Sauvegarde automatique
        const chatData: StoredChatData = {
            contacts,
            messages: allMessages,
            lastUpdate: new Date().toISOString()
        };
        saveToStorage(chatData);
    }, [contacts, allMessages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Aujourd\'hui';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Hier';
        } else {
            return date.toLocaleDateString('fr-FR');
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XAF',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'sent': return faCheck;
            case 'delivered': return faCheckDouble;
            case 'read': return faCheckDouble;
            default: return faClock;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'read': return 'text-blue-500';
            case 'delivered': return 'text-gray-500';
            case 'sent': return 'text-gray-400';
            default: return 'text-gray-300';
        }
    };

    const handleSendMessage = () => {
        if (!message.trim() || !selectedContact) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            senderId: 'user',
            content: message,
            type: 'text',
            timestamp: new Date().toISOString(),
            status: 'sending'
        };

        const updatedMessages = [...(allMessages[selectedContact.id] || []), newMessage];
        setAllMessages(prev => ({
            ...prev,
            [selectedContact.id]: updatedMessages
        }));
        setMessage('');

        // Simulation envoi
        setTimeout(() => {
            setAllMessages(prev => ({
                ...prev,
                [selectedContact.id]: prev[selectedContact.id].map(msg =>
                    msg.id === newMessage.id
                        ? { ...msg, status: 'sent' }
                        : msg
                )
            }));
        }, 500);

        // Simulation réponse automatique
        setTimeout(() => {
            const responses = [
                'Merci pour votre message ! Un de nos conseillers vous répondra rapidement.',
                'Bonjour ! Je vais vérifier la disponibilité pour vous.',
                'Parfait ! Laissez-moi vous envoyer plus d\'informations.',
                'Excellente question ! Voici ce que je peux vous proposer :'
            ];

            const autoReply: ChatMessage = {
                id: (Date.now() + 1).toString(),
                senderId: selectedContact.id,
                content: responses[Math.floor(Math.random() * responses.length)],
                type: 'text',
                timestamp: new Date().toISOString(),
                status: 'delivered'
            };

            setAllMessages(prev => ({
                ...prev,
                [selectedContact.id]: [...(prev[selectedContact.id] || []), autoReply]
            }));
        }, 2000);
    };

    const handleEmojiSelect = (emoji: string) => {
        setMessage(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const handleOpenWhatsApp = (contact: ChatContact) => {
        const message = `Bonjour ${contact.companyInfo.name}, je suis intéressé par vos produits sur ANIBAHA.`;
        const whatsappUrl = `https://wa.me/${contact.companyInfo.phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleDeleteChat = (contactId: string) => {
        setAllMessages(prev => {
            const updated = { ...prev };
            delete updated[contactId];
            return updated;
        });

        if (selectedContact?.id === contactId) {
            setSelectedContact(null);
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.companyInfo.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalUnreadCount = contacts.reduce((sum, contact) => {
        const contactMessages = allMessages[contact.id] || [];
        return sum + contactMessages.filter(msg =>
            msg.senderId === contact.id && msg.status !== 'read'
        ).length;
    }, 0);

    if (!isOpen) {
        return (
            <div className="fixed bottom-20 right-6 z-[9999]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative bg-gradient-to-r py-3 from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full transition-all duration-600 transform hover:scale-110"
                >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />

                    {totalUnreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-4 flex items-center justify-center font-bold animate-bounce">
                            {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                        </span>
                    )}

                    <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                            Chat avec nos entreprises
                            <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <div className="bg-white rounded-xl w-96 h-[500px] overflow-hidden border border-gray-200">
                {!selectedContact ? (
                    // Liste des contacts
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                                <div>
                                    <h3 className="font-bold text-lg">Chat</h3>
                                    <p className="text-green-100 text-sm">ANIBAHA</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-green-200 transition-colors"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>

                        {/* Barre de recherche */}
                        <div className="p-4 border-b">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Rechercher une entreprise..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <p className="mt-20 p-6 m-6 text-xs opacity-75 font-mono bg-blue-50 border border-blue-200 text-blue-800">
                            La fonctionnalité de chat avec les entreprises est en cours de développement.
                        </p>

                        {/* Liste des contacts */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredContacts.map((contact) => {
                                const contactMessages = allMessages[contact.id] || [];
                                const lastMessage = contactMessages[contactMessages.length - 1];
                                const unreadCount = contactMessages.filter(msg =>
                                    msg.senderId === contact.id && msg.status !== 'read'
                                ).length;

                                return (
                                    <div
                                        key={contact.id}
                                        onClick={() => setSelectedContact(contact)}
                                        className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                                    >
                                        <div className="relative">
                                            <img
                                                src={contact.avatar}
                                                alt={contact.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            {contact.isOnline && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>

                                        <div className="flex-1 ml-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-1">
                                                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                                                    {contact.companyInfo.isVerified && (
                                                        <FontAwesomeIcon icon={faCheck} className="text-blue-500 text-xs" />
                                                    )}
                                                </div>
                                                {lastMessage && (
                                                    <span className="text-xs text-gray-500">
                                                        {formatTime(lastMessage.timestamp)}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {lastMessage ? lastMessage.content : 'Aucun message'}
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs text-gray-500">
                                                            {contact.companyInfo.category}
                                                        </span>
                                                        <div className="flex items-center space-x-1">
                                                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                                                            <span className="text-xs text-gray-500">
                                                                {contact.companyInfo.rating}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {unreadCount > 0 && (
                                                    <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                        {unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    // Interface de chat
                    <div className="flex flex-col h-full">
                        {/* Header du chat */}
                        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setSelectedContact(null)}
                                    className="text-white hover:text-green-200"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>

                                <img
                                    src={selectedContact.avatar}
                                    alt={selectedContact.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />

                                <div>
                                    <div className="flex items-center space-x-1">
                                        <h4 className="font-semibold">{selectedContact.name}</h4>
                                        {selectedContact.companyInfo.isVerified && (
                                            <FontAwesomeIcon icon={faCheck} className="text-green-200 text-xs" />
                                        )}
                                    </div>
                                    <p className="text-green-100 text-sm">
                                        {selectedContact.isOnline ? 'En ligne' :
                                            selectedContact.lastSeen ? `Vu ${formatDate(selectedContact.lastSeen)}` : 'Hors ligne'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleOpenWhatsApp(selectedContact)}
                                    className="text-white hover:text-green-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faPhone} />
                                </button>
                                <button
                                    onClick={() => setShowContactInfo(!showContactInfo)}
                                    className="text-white hover:text-green-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </button>
                            </div>
                        </div>

                        {/* Info entreprise (si affiché) */}
                        {showContactInfo && (
                            <div className="bg-blue-50 p-4 border-b">
                                <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold text-gray-900">Informations</h5>
                                    <button
                                        onClick={() => handleDeleteChat(selectedContact.id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-gray-600">Catégorie:</span>
                                        <p className="font-medium">{selectedContact.companyInfo.category}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Note:</span>
                                        <p className="font-medium flex items-center">
                                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                                            {selectedContact.companyInfo.rating}/5
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Réponse:</span>
                                        <p className="font-medium">~{selectedContact.companyInfo.responseTime}min</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Téléphone:</span>
                                        <p className="font-medium">{selectedContact.companyInfo.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.senderId === 'user'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-white text-gray-900 border'
                                            }`}
                                    >
                                        {msg.type === 'product' && msg.metadata?.productId ? (
                                            <div className="space-y-2">
                                                {sampleProducts[msg.metadata.productId] && (
                                                    <div className="bg-white rounded-lg p-3 border">
                                                        <img
                                                            src={sampleProducts[msg.metadata.productId].image}
                                                            alt={sampleProducts[msg.metadata.productId].name}
                                                            className="w-full h-32 object-cover rounded-md mb-2"
                                                        />
                                                        <h6 className="font-semibold text-gray-900 mb-1">
                                                            {sampleProducts[msg.metadata.productId].name}
                                                        </h6>
                                                        <p className="text-sm text-gray-600 mb-2">
                                                            {sampleProducts[msg.metadata.productId].description}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-bold text-green-600">
                                                                {formatPrice(sampleProducts[msg.metadata.productId].price)}
                                                            </span>
                                                            <span className={`text-xs px-2 py-1 rounded-full ${sampleProducts[msg.metadata.productId].inStock
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-red-100 text-red-700'
                                                                }`}>
                                                                {sampleProducts[msg.metadata.productId].inStock ? 'En stock' : 'Rupture'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-sm">{msg.content}</p>
                                            </div>
                                        )}

                                        <div className={`flex items-center justify-end space-x-1 mt-1 ${msg.senderId === 'user' ? 'text-green-100' : 'text-gray-500'
                                            }`}>
                                            <span className="text-xs">{formatTime(msg.timestamp)}</span>
                                            {msg.senderId === 'user' && (
                                                <FontAwesomeIcon
                                                    icon={getStatusIcon(msg.status)}
                                                    className={`text-xs ${getStatusColor(msg.status)}`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white text-gray-900 px-4 py-2 rounded-2xl border">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Picker d'emojis */}
                        {showEmojiPicker && (
                            <div className="p-3 border-t bg-white">
                                <div className="grid grid-cols-8 gap-2">
                                    {emojis.map((emoji, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleEmojiSelect(emoji)}
                                            className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Zone de saisie */}
                        <div className="bg-white border-t p-4">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faSmile} />
                                </button>

                                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                                    <FontAwesomeIcon icon={faPaperclip} />
                                </button>

                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Tapez votre message..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>

                            {/* Raccourcis rapides */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                    onClick={() => setMessage('Bonjour, je suis intéressé par vos produits')}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                                >
                                    👋 Saluer
                                </button>
                                <button
                                    onClick={() => setMessage('Quels sont vos prix ?')}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                                >
                                    💰 Prix
                                </button>
                                <button
                                    onClick={() => setMessage('Livraison à Douala possible ?')}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                                >
                                    🚚 Livraison
                                </button>
                                <button
                                    onClick={() => setMessage('Merci beaucoup !')}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                                >
                                    🙏 Merci
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer avec informations */}
                <div className="bg-gray-50 px-4 py-2 text-center border-t">
                    <p className="text-xs text-gray-500">
                        💬 Données conservées 7 jours •
                        <span className="text-green-600 font-semibold"> AfriCommerce</span>
                    </p>
                </div>
            </div>

            {/* Overlay pour fermer */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-10 -z-10"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default WhatsAppChatSystem;