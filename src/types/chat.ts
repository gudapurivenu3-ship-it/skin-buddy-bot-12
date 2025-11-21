export type MessageType = "bot" | "user";

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export type SkinType = "oily" | "dry" | "combination" | "normal" | null;
export type SkinConcern = "acne" | "dryness" | "dullness" | "pigmentation" | "aging" | null;

export interface ChatState {
  skinType: SkinType;
  concerns: SkinConcern[];
  hasRoutine: boolean | null;
  stage: "welcome" | "skin-type" | "concerns" | "routine" | "advice" | "topic-selection";
}
