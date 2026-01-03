import ChatBotWidget from '@/components/ChatBotWidget';

const HomePage = () => {
  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 pb-24 pt-10">
      <section className="grid w-full gap-6">
        <div className="flex w-full items-center justify-center h-screen text-sm text-slate-600">
          <h1 className="text-center text-2xl font-bold sm:text-3xl">Home Page</h1>
        </div>
      </section>
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8">
        <ChatBotWidget />
      </div>
    </main>
  );
};

export default HomePage;
