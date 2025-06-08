
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const MessageArea = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="flex space-x-3">
          <Avatar>
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {msg.sender.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-gray-800">{msg.sender}</span>
              {msg.isHost && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                  Host
                </Badge>
              )}
              <span className="text-sm text-gray-500">{msg.timestamp}</span>
            </div>
            <p className="text-gray-700">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageArea;
