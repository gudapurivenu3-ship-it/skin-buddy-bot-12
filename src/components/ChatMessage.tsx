import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Sparkles, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.type === "bot";

  return (
    <div
      className={cn(
        "flex gap-3 mb-4 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isBot
            ? "bg-chat-bot text-chat-bot-foreground rounded-tl-sm"
            : "bg-chat-user text-chat-user-foreground rounded-tr-sm"
        )}
      >
        {message.isTyping ? (
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-current rounded-full animate-bounce"></span>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};
