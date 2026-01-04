import ChatBotWidget from '@/components/ChatBotWidget';

const HomePage = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold">Home Page</h1>
      <ChatBotWidget />
    </main>
  );
};

export default HomePage;
