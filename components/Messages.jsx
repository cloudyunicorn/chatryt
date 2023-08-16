import { useChatContext } from '@/context/chatContext';
import { db } from '@/firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { DELETED_FOR_ME } from '@/utils/constants';
import { useAuth } from '@/context/authContext';
import { useMediaQuery } from "react-responsive";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data, setIsTyping } = useChatContext();
  const ref = useRef();
  const { currentUser } = useAuth();

  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
        setIsTyping(doc.data()?.typing?.[data.user.uid] || false);
      }
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    });

    return () => unsub();
  }, [data.chatId]);

  const scrollToBottom = () => {
    const chatContainer = ref.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  return (
    <div ref={ref} className={`${isMobile ? 'h-[75vh]' : 'grow overflow-auto scrollbar'} flex flex-col overflow-auto p-5`}>
      {messages
        ?.filter((m) => {
          return (
            m?.deletedInfo?.[currentUser.uid] !== DELETED_FOR_ME &&
            !m?.deletedInfo?.deletedForEveryone &&
            !m?.deletedChatInfo?.[currentUser.uid]
          );
        })
        ?.map((m) => {
          return <Message message={m} key={m.id} />;
        })}
    </div>
  );
};

export default Messages;
