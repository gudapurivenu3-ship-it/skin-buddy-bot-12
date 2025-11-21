import { ChatState, SkinType, SkinConcern } from "@/types/chat";

export const getWelcomeMessage = () => {
  return `Hi there! 👋 I'm your Skin Care Assistant.

I can help you with general skincare tips and advice based on your skin type and concerns.

⚠️ **Important Disclaimer:**
This chatbot is for educational purposes only. I cannot diagnose skin diseases or provide medical advice. For serious skin concerns, please consult a dermatologist.

Let's get started! What's your skin type?`;
};

export const getSkinTypeMessage = () => {
  return "What's your skin type?";
};

export const getConcernsMessage = () => {
  return "What are your main skin concerns? (You can select multiple)";
};

export const getRoutineMessage = () => {
  return "Do you currently have a daily skincare routine?";
};

export const getAdvice = (state: ChatState): string => {
  const { skinType, concerns, hasRoutine } = state;
  
  let advice = `Based on your ${skinType} skin`;
  
  if (concerns.length > 0) {
    const concernsList = concerns.join(", ");
    advice += ` and concerns about ${concernsList}`;
  }
  
  advice += ", here are some general tips:\n\n";

  // General routine structure
  if (!hasRoutine) {
    advice += "**Basic Skincare Routine:**\n";
    advice += "1. **Cleanser** - Morning and night\n";
    advice += "2. **Toner** - To balance pH\n";
    advice += "3. **Serum** - Target specific concerns\n";
    advice += "4. **Moisturizer** - Lock in hydration\n";
    advice += "5. **Sunscreen** - SPF 30+ in the morning\n\n";
  }

  // Skin-type specific advice
  switch (skinType) {
    case "oily":
      advice += "**For Oily Skin:**\n";
      advice += "• Use gel-based or foaming cleansers\n";
      advice += "• Look for oil-free, non-comedogenic products\n";
      advice += "• Use lightweight, water-based moisturizers\n";
      advice += "• Don't skip moisturizer - it helps balance oil production\n\n";
      break;
    case "dry":
      advice += "**For Dry Skin:**\n";
      advice += "• Use cream-based cleansers\n";
      advice += "• Look for hydrating ingredients like hyaluronic acid\n";
      advice += "• Use rich, nourishing moisturizers\n";
      advice += "• Avoid hot water and harsh soaps\n\n";
      break;
    case "combination":
      advice += "**For Combination Skin:**\n";
      advice += "• Use gentle, balanced cleansers\n";
      advice += "• Try the multi-masking technique\n";
      advice += "• Use lightweight moisturizers\n";
      advice += "• Focus on T-zone oil control\n\n";
      break;
    case "normal":
      advice += "**For Normal Skin:**\n";
      advice += "• Maintain your routine consistently\n";
      advice += "• Use gentle, balanced products\n";
      advice += "• Focus on prevention and protection\n";
      advice += "• Keep skin hydrated\n\n";
      break;
  }

  // Concern-specific advice
  if (concerns.includes("acne")) {
    advice += "**For Acne:**\n";
    advice += "• Look for salicylic acid or benzoyl peroxide\n";
    advice += "• Don't pick or pop pimples\n";
    advice += "• Change pillowcases regularly\n";
    advice += "• Avoid touching your face\n\n";
  }

  if (concerns.includes("dryness")) {
    advice += "**For Dryness:**\n";
    advice += "• Drink plenty of water\n";
    advice += "• Use a humidifier\n";
    advice += "• Apply moisturizer on damp skin\n";
    advice += "• Look for ceramides and fatty acids\n\n";
  }

  if (concerns.includes("pigmentation")) {
    advice += "**For Pigmentation:**\n";
    advice += "• Use vitamin C serums\n";
    advice += "• Always wear sunscreen (crucial!)\n";
    advice += "• Consider niacinamide products\n";
    advice += "• Be patient - it takes time\n\n";
  }

  if (concerns.includes("aging")) {
    advice += "**For Aging Concerns:**\n";
    advice += "• Use retinol products (start slowly)\n";
    advice += "• Never skip sunscreen\n";
    advice += "• Add antioxidants to your routine\n";
    advice += "• Keep skin hydrated\n\n";
  }

  // General tips
  advice += "**General Tips:**\n";
  advice += "• Always remove makeup before bed\n";
  advice += "• Patch test new products\n";
  advice += "• Stay hydrated\n";
  advice += "• Get adequate sleep\n";
  advice += "• Protect from sun daily\n\n";

  advice += "Would you like tips on a specific topic?";

  return advice;
};

export const getTopicAdvice = (topic: string): string => {
  switch (topic) {
    case "Basic Skin Routine":
      return `**Basic Skincare Routine:**

**Morning:**
1. Gentle cleanser
2. Toner (optional)
3. Vitamin C serum
4. Eye cream
5. Moisturizer
6. Sunscreen (SPF 30+)

**Evening:**
1. Makeup remover/cleansing oil
2. Gentle cleanser
3. Toner
4. Treatment serum
5. Eye cream
6. Night cream/moisturizer

Remember: Start simple and add products gradually!`;

    case "Tips for Oily Skin":
      return `**Oily Skin Care Tips:**

✓ Cleanse twice daily with foaming cleanser
✓ Use oil-free, non-comedogenic products
✓ Don't over-wash (causes more oil production)
✓ Use blotting papers during the day
✓ Try clay masks weekly
✓ Look for salicylic acid or niacinamide
✓ Still use moisturizer (lightweight, gel-based)
✓ Never skip sunscreen

Remember: Oily skin needs hydration too!`;

    case "Tips for Dry Skin":
      return `**Dry Skin Care Tips:**

✓ Use cream-based, gentle cleansers
✓ Apply products on damp skin
✓ Look for hyaluronic acid, glycerin, ceramides
✓ Use rich moisturizers and oils
✓ Avoid hot water and harsh soaps
✓ Use a humidifier at night
✓ Exfoliate gently (not too often)
✓ Drink plenty of water

Remember: Layer hydrating products for best results!`;

    case "Sun Protection Tips":
      return `**Sun Protection Guide:**

✓ Use SPF 30+ daily (even on cloudy days)
✓ Reapply every 2 hours outdoors
✓ Apply 15 minutes before sun exposure
✓ Don't forget ears, neck, hands
✓ Wear protective clothing and hats
✓ Seek shade during peak hours (10am-4pm)
✓ Use mineral sunscreen for sensitive skin
✓ Check expiration dates on sunscreen

Remember: Sun damage is cumulative and permanent!`;

    case "Common Mistakes to Avoid":
      return `**Common Skincare Mistakes:**

✗ Over-exfoliating
✗ Skipping sunscreen
✗ Not removing makeup before bed
✗ Using too many products at once
✗ Not patch testing new products
✗ Sleeping on dirty pillowcases
✗ Touching your face frequently
✗ Expecting instant results
✗ Using hot water
✗ Picking at skin

Remember: Consistency is key, and less is often more!`;

    default:
      return "I can provide tips on various topics. Please select from the available options!";
  }
};

export const getSkinTypeOptions = (): string[] => {
  return ["Oily", "Dry", "Combination", "Normal"];
};

export const getConcernOptions = (): string[] => {
  return ["Acne", "Dryness", "Dullness", "Pigmentation", "Aging", "None"];
};

export const getRoutineOptions = (): string[] => {
  return ["Yes", "No"];
};

export const getTopicOptions = (): string[] => {
  return [
    "Basic Skin Routine",
    "Tips for Oily Skin",
    "Tips for Dry Skin",
    "Sun Protection Tips",
    "Common Mistakes to Avoid",
  ];
};
