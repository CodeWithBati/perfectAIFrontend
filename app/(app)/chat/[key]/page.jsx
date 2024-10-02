import ChatOverview from "@/app/src/components/chat/ChatOverview";

export const metadata = {
  title: 'AI Tool Recommendations'
}

const ChatBotPage = (props) => {
  const { key } = props.params;
  return <ChatOverview ChatKey={key} />;
};

export default ChatBotPage;
