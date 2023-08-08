import Chat from '@/components/Chat';
import Chats from '@/components/Chats';
import LeftNav from '@/components/LeftNav';
import Loader from '@/components/Loader';
import PopupWrapper from '@/components/popup/PopupWrapper';
import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Home = () => {
  const router = useRouter();
  const { signOut, currentUser, isLoading } = useAuth();
  const { data } = useChatContext();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, isLoading]);

  return !currentUser ? (
    <Loader />
  ) : // <div>
  //   <button onClick={signOut}>Sign Out</button>
  // </div>
  isMobile ? (
    <div className="bg-c1 flex h-[100%]">
      <div className="flex w-full shrink-0">
        <LeftNav />
        <div className="flex flex-col bg-c2 grow">
          <div className="w-[400px] p-5 overflow-auto scrollbar shrink-0 border-r border-white/[0.05]">
            <div className="flex flex-col">
              <Chats />
            </div>
          </div>
          {data.user && <Chat />}
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-c1 flex h-[100vh]">
      <div className="flex w-full shrink-0">
        <LeftNav />
        <div className="flex bg-c2 grow">
          <div className="w-[400px] p-5 overflow-auto scrollbar shrink-0 border-r border-white/[0.05]">
            <div className="flex flex-col h-full">
              <Chats />
            </div>
          </div>
          {data.user && <Chat />}
        </div>
      </div>
    </div>
  );
};

export default Home;
