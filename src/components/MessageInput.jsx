
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const MessageInput = ({ message, setMessage, onSendMessage }) => {
  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={onSendMessage} className="flex space-x-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" disabled={!message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
