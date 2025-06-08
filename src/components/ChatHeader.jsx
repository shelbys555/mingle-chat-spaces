
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Clock, Users } from 'lucide-react';

const ChatHeader = ({ roomName, timeRemaining, participants, isHost, onEndChat }) => {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">{roomName}</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{timeRemaining} remaining</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span>{participants.filter(p => p.isOnline).length}/{participants.length}</span>
          </div>
          {isHost && (
            <Button 
              onClick={onEndChat}
              variant="destructive" 
              size="sm"
              className="bg-red-600 hover:bg-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              End Chat
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
