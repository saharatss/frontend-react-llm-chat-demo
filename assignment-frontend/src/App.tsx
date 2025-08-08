import { useEffect, useState } from 'react'
import './App.css'
import ChatEntryAgent from './components/chat-entry-agent'
import ChatEntryEditcard from './components/chat-entry-editcard'
import ChatEntryUser from './components/chat-entry-user'
import { ChatTextfield } from './components/chat-textfield'
import Icons from './components/icons'
import type { ChatEvent } from './types/chat-event'
import { streamSSE } from './api/main'
import { CircleButton } from './components/circle-button'
import type { ChatEntry, EditcardContent } from './types/chat-entry'
import { parseChatEventToEntries } from './utils/parse-chatevent-to-entries'

function App() {

  const [userInput, setUserInput] = useState('');

  const [isRequestedMockup, setIsRequestedMockup] = useState(false);

  const [chatEntries, setChatEntries] = useState<ChatEntry[]>([]);
  const [agentStreamingBuffer, setAgentStreamingBuffer] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setIsRequestedMockup(true);

    setIsStreaming(true);
    setChatEntries([
      { sender: 'user', type: 'text', content: 'Hey, can you help me improve my outline?' },
    ]);
    setError(null);

    streamSSE<ChatEvent>({
      url: "http://127.0.0.1:5000/stream",
      payload: { message: "Hey, can you help me improve my outline?" },
      timeoutMs: 10000,
      onMessage: (msg) => {
        // console.log("Received message:", msg);

        if (msg.status === 'streaming') {

          let newToken = msg.token || '';

          newToken = newToken.replace(/<edit_card>.*?<\/edit_card>/gs, '').trim();
          newToken = newToken.replace('[]', '').trim();

          // append token to the last entry
          setAgentStreamingBuffer((prev) => prev + newToken);
          
        }
        else if (msg.type === 'final_message') {
          const finalEntries = parseChatEventToEntries(msg);

          const agentEntryFromBuffer: ChatEntry | null = agentStreamingBuffer.trim()
            ? {
              sender: 'agent',
              type: 'text',
              content: agentStreamingBuffer.trim()
            }
            : null;

          const combined = [
            ...(agentEntryFromBuffer ? [agentEntryFromBuffer] : []),
            ...finalEntries,
          ];

          setChatEntries((prev) => [...prev, ...combined]);
          setAgentStreamingBuffer(''); // clear buffer
        }

      },
      onDone: () => setIsStreaming(false),
      onError: (err) => {
        setError(err.message || "Stream failed");
        setIsStreaming(false);
      },
    });
  };

  useEffect(() => {
    console.log("Chat entries updated:", chatEntries);
  }, [chatEntries]);

  return (
    <>
      {/* Header */}
      <div className="w-full min-w-full flex justify-between items-center sticky top-0 z-10 bg-[var(--color-background)] py-5">
        <div className='text-[16px]'>New Chat</div>
        <div><Icons.CloseIcon size={20}/></div>
      </div>
      {/* Body */}
      <div className='w-full flex flex-col mt-5 mb-10 gap-8'>
        <div className='flex flex-col gap-8'>

          {!isRequestedMockup && (
            <CircleButton onClick={handleStart} >Click here to start the mockup request</CircleButton>
          )}

          {/* <ChatEntryUser>Hey, can you help me improve my outline?</ChatEntryUser> */}
          {/* <ChatEntryAgent>I'll improve the note card and one action card in the second moment to better match your channel's style and enhance the dramatic impact.</ChatEntryAgent> */}
          {/* <ChatEntryEditcard
            cardId='card-1'
            oldText='This is the old text of the card.'
            newText='This is the new text of the card.'
          /> */}

          {chatEntries.map((entry, idx) => {
            if (entry.sender === 'user') {
              return <ChatEntryUser key={idx} index={idx}>{entry.content as string}</ChatEntryUser>;
            }
            if (entry.sender === 'agent') {
              if (entry.type === 'text') {
                return <ChatEntryAgent key={idx} index={idx}>{entry.content as string}</ChatEntryAgent>;
              } else if (entry.type === 'editcard') {
                const { cardId, oldText, newText } = entry.content as EditcardContent;
                return (
                  <ChatEntryEditcard
                    key={cardId}
                    cardId={cardId}
                    oldText={oldText}
                    newText={newText}
                  />
                );
              }
            }
            return null;
          })}

          {isStreaming && agentStreamingBuffer.trim() && (
            <ChatEntryAgent key="streaming-agent">{agentStreamingBuffer}</ChatEntryAgent>
          )}

          {error && (
            <div className='text-red-500 text-sm mt-2'>
              {error}
            </div>
          )}
          
        </div>

        <ChatTextfield value={userInput} onChange={setUserInput} />
      </div>
      <div className='w-screen'></div>
    </>
  )
}

export default App;
