import { useState, useRef, useCallback, useEffect } from "react";
import { ChatSidebar, ChatSession } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LoadingDots } from "@/components/LoadingDots";
import { streamChat, Msg } from "@/lib/streamChat";
import { toast } from "sonner";

interface Chat {
  id: string;
  title: string;
  messages: Msg[];
  createdAt: Date;
}

function generateId() {
  return crypto.randomUUID();
}

const Index = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeId);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages.length, scrollToBottom]);

  const createChat = useCallback((firstMessage?: string) => {
    const id = generateId();
    const chat: Chat = {
      id,
      title: firstMessage ? firstMessage.slice(0, 40) + (firstMessage.length > 40 ? "…" : "") : "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setChats((prev) => [chat, ...prev]);
    setActiveId(id);
    setSidebarOpen(false);
    return id;
  }, []);

  const sendMessage = useCallback(
    async (input: string) => {
      let chatId = activeId;
      if (!chatId || !chats.find((c) => c.id === chatId)) {
        chatId = createChat(input);
      }

      const userMsg: Msg = { role: "user", content: input };

      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== chatId) return c;
          return {
            ...c,
            title: c.messages.length === 0 ? input.slice(0, 40) + (input.length > 40 ? "…" : "") : c.title,
            messages: [...c.messages, userMsg],
          };
        })
      );

      setIsLoading(true);
      let assistantSoFar = "";

      const allMessages = [
        ...(chats.find((c) => c.id === chatId)?.messages ?? []),
        userMsg,
      ];

      try {
        await streamChat({
          messages: allMessages,
          onDelta: (chunk) => {
            assistantSoFar += chunk;
            const content = assistantSoFar;
            setChats((prev) =>
              prev.map((c) => {
                if (c.id !== chatId) return c;
                const msgs = [...c.messages];
                const last = msgs[msgs.length - 1];
                if (last?.role === "assistant") {
                  msgs[msgs.length - 1] = { ...last, content };
                } else {
                  msgs.push({ role: "assistant", content });
                }
                return { ...c, messages: msgs };
              })
            );
            scrollToBottom();
          },
          onDone: () => setIsLoading(false),
          onError: (err) => {
            setIsLoading(false);
            toast.error(err);
          },
        });
      } catch (e) {
        setIsLoading(false);
        toast.error("Failed to get response. Please try again.");
      }
    },
    [activeId, chats, createChat, scrollToBottom]
  );

  const sessions: ChatSession[] = chats.map((c) => ({
    id: c.id,
    title: c.title,
    createdAt: c.createdAt,
  }));

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <ChatSidebar
        sessions={sessions}
        activeId={activeId}
        onSelect={(id) => { setActiveId(id); setSidebarOpen(false); }}
        onNew={() => createChat()}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {!activeChat || activeChat.messages.length === 0 ? (
          <>
            <WelcomeScreen onSuggestion={sendMessage} />
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </>
        ) : (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto">
                {activeChat.messages.map((m, i) => (
                  <ChatMessage key={i} role={m.role} content={m.content} />
                ))}
                {isLoading && activeChat.messages[activeChat.messages.length - 1]?.role === "user" && (
                  <LoadingDots />
                )}
              </div>
            </div>
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
