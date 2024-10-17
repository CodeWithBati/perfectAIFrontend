import ChatOverview from "@/app/src/components/chat/ChatOverview";
import ChatBotResult from '@/app/src/components/chatBotResults/ChatBotResult';

export const metadata = {
  title: 'AI Tool Recommendations'
}

const ChatBotPage = (props) => {
  const { key } = props.params;
  return <ChatBotResult ChatKey={key} />;
};

export default ChatBotPage;
