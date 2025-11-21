import { useState, useRef, useEffect } from "react";
import { Message, ChatState, SkinType, SkinConcern } from "@/types/chat";
import { ChatMessage } from "@/components/ChatMessage";
import { QuickReply } from "@/components/QuickReply";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, AlertCircle } from "lucide-react";
import {
  getWelcomeMessage,
  getSkinTypeMessage,
  getConcernsMessage,
  getRoutineMessage,
  getAdvice,
  getTopicAdvice,
  getSkinTypeOptions,
  getConcernOptions,
  getRoutineOptions,
  getTopicOptions,
} from "@/utils/chatLogic";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>({
    skinType: null,
    concerns: [],
    hasRoutine: null,
    stage: "welcome",
  });
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    addBotMessage(getWelcomeMessage(), false);
    setTimeout(() => {
      setChatState((prev) => ({ ...prev, stage: "skin-type" }));
    }, 500);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addBotMessage = (content: string, withTyping = true) => {
    if (withTyping) {
      const typingMessage: Message = {
        id: Date.now().toString() + "-typing",
        type: "bot",
        content: "",
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages((prev) => [...prev, typingMessage]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === typingMessage.id
              ? { ...msg, content, isTyping: false }
              : msg
          )
        );
      }, 1000);
    } else {
      const message: Message = {
        id: Date.now().toString(),
        type: "bot",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, message]);
    }
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleQuickReply = (option: string) => {
    setShowQuickReplies(false);
    addUserMessage(option);

    setTimeout(() => {
      processUserResponse(option);
    }, 500);
  };

  const processUserResponse = (response: string) => {
    const lowerResponse = response.toLowerCase();

    switch (chatState.stage) {
      case "skin-type":
        const skinType = lowerResponse as SkinType;
        setChatState((prev) => ({ ...prev, skinType, stage: "concerns" }));
        setTimeout(() => {
          addBotMessage(getConcernsMessage());
          setShowQuickReplies(true);
        }, 1200);
        break;

      case "concerns":
        if (lowerResponse === "none") {
          setChatState((prev) => ({ ...prev, stage: "routine" }));
          setTimeout(() => {
            addBotMessage(getRoutineMessage());
            setShowQuickReplies(true);
          }, 1200);
        } else {
          const concern = lowerResponse as SkinConcern;
          const updatedConcerns = [...chatState.concerns];
          
          if (!updatedConcerns.includes(concern)) {
            updatedConcerns.push(concern);
          }

          setChatState((prev) => ({ ...prev, concerns: updatedConcerns }));
          
          setTimeout(() => {
            addBotMessage("Got it! Any other concerns? (Select 'None' when done)");
            setShowQuickReplies(true);
          }, 1200);
        }
        break;

      case "routine":
        const hasRoutine = lowerResponse === "yes";
        setChatState((prev) => ({ ...prev, hasRoutine, stage: "advice" }));
        setTimeout(() => {
          const advice = getAdvice({ ...chatState, hasRoutine });
          addBotMessage(advice);
          setChatState((prev) => ({ ...prev, stage: "topic-selection" }));
          setShowQuickReplies(true);
        }, 1200);
        break;

      case "topic-selection":
        setTimeout(() => {
          const topicAdvice = getTopicAdvice(response);
          addBotMessage(topicAdvice);
          setTimeout(() => {
            addBotMessage("Would you like tips on another topic?");
            setShowQuickReplies(true);
          }, 1500);
        }, 1200);
        break;

      case "advice":
        setTimeout(() => {
          const topicAdvice = getTopicAdvice(response);
          addBotMessage(topicAdvice);
          setChatState((prev) => ({ ...prev, stage: "topic-selection" }));
          setTimeout(() => {
            addBotMessage("Would you like tips on another topic?");
            setShowQuickReplies(true);
          }, 1500);
        }, 1200);
        break;
    }
  };

  const getQuickReplyOptions = (): string[] => {
    switch (chatState.stage) {
      case "skin-type":
        return getSkinTypeOptions();
      case "concerns":
        return getConcernOptions();
      case "routine":
        return getRoutineOptions();
      case "advice":
      case "topic-selection":
        return getTopicOptions();
      default:
        return [];
    }
  };

  const handleReset = () => {
    setMessages([]);
    setChatState({
      skinType: null,
      concerns: [],
      hasRoutine: null,
      stage: "welcome",
    });
    setShowQuickReplies(true);
    addBotMessage(getWelcomeMessage(), false);
    setTimeout(() => {
      setChatState((prev) => ({ ...prev, stage: "skin-type" }));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-card rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Skin Care Assistant</h1>
              <p className="text-xs text-primary-foreground/80">
                Your friendly skincare guide
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            Start Over
          </Button>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-secondary/50 px-6 py-3 flex items-start gap-3 border-b border-border">
          <AlertCircle className="w-5 h-5 text-secondary-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-secondary-foreground leading-relaxed">
            <strong>Educational Purpose Only:</strong> This chatbot provides
            general skincare information and cannot diagnose conditions or
            replace professional medical advice. Consult a dermatologist for
            serious concerns.
          </p>
        </div>

        {/* Chat Area */}
        <ScrollArea className="flex-1 px-6 py-4" ref={scrollRef}>
          <div className="space-y-2">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          {/* Quick Replies */}
          {showQuickReplies && chatState.stage !== "welcome" && (
            <QuickReply
              options={getQuickReplyOptions()}
              onSelect={handleQuickReply}
              className="mt-6"
            />
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="bg-muted px-6 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Powered by skincare expertise • Educational purposes only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
