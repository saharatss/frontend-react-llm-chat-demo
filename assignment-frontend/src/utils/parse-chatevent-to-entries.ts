import type { ChatEntry, EditcardContent } from "../types/chat-entry";
import type { ChatEvent } from "../types/chat-event";

export function parseChatEventToEntries(event: ChatEvent): ChatEntry[] {
  if (event.type !== 'final_message') {
    return [];
  }

  const entries: ChatEntry[] = [];

  let message = event.message ?? '';
  message = message.replaceAll('[]', '').trim();

  const editCardRegex = /<edit_card>\ncardid:(.*?)\nold_text:(.*?)\nnew_text:(.*?)\n<\/edit_card>/gs;

  let lastIndex = 0;
  let match;

  while ((match = editCardRegex.exec(message)) !== null) {
    const [fullMatch, cardId, oldText, newText] = match;
    const start = match.index;

    // Extract text before this edit card
    if (start > lastIndex) {
      const chunk = message.slice(lastIndex, start).trim();
      if (chunk) {
        entries.push({
          type: 'text',
          sender: 'agent',
          content: chunk
        });
      }
    }

    // Add edit card entry
    entries.push({
      sender: 'agent',
      type: 'editcard',
      content: {
        cardId: cardId.trim(),
        oldText: oldText.trim(),
        newText: newText.trim(),
      } as EditcardContent,
    });

    lastIndex = match.index + fullMatch.length;
  }

  // Remaining agent text after last edit card
  if (lastIndex < message.length) {
    const remaining = message.slice(lastIndex).trim();
    if (remaining) {
      entries.push({
        type: 'text',
        sender: 'agent',
        content: remaining
      });
    }
  }

  return entries;
}