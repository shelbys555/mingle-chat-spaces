
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Copy, 
  UserMinus, 
  UserPlus, 
  Download, 
  LogOut, 
  Settings,
  Clock,
  Users
} from 'lucide-react';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', email: 'john@example.com', message: 'Welcome to the chat room!', timestamp: '10:30 AM', isHost: true },
    { id: 2, sender: 'Jane Smith', email: 'jane@example.com', message: 'Thanks for having me here.', timestamp: '10:31 AM', isHost: false },
    { id: 3, sender: 'Mike Johnson', email: 'mike@example.com', message: 'Looking forward to our discussion.', timestamp: '10:32 AM', isHost: false }
  ]);
  
  // Check if current user is host (from URL params)
  const isHost = !window.location.search.includes('participant=true');
  const accessKey = 'CHAT123XYZ';
  
  const [participants] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', isHost: true, isOnline: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', isHost: false, isOnline: true },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', isHost: false, isOnline: true },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', isHost: false, isOnline: false }
  ]);

  const [timeRemaining, setTimeRemaining] = useState('1:45:30');

  useEffect(() => {
    // Simulate countdown timer
    const timer = setInterval(() => {
      // This would normally calculate real remaining time
      console.log('Timer tick');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: isHost ? 'John Doe' : 'Current User',
      email: isHost ? 'john@example.com' : 'user@example.com',
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isHost: isHost
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const copyAccessKey = () => {
    navigator.clipboard.writeText(accessKey);
    // Toast notification would appear here
  };

  const endChat = () => {
    if (window.confirm('Are you sure you want to end this chat session?')) {
      window.location.href = '/dashboard';
    }
  };

  const downloadTranscript = () => {
    // Generate and download transcript
    console.log('Downloading transcript...');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Team Standup</h1>
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
                onClick={endChat}
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

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Participants */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Participants</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-800">{participant.name}</p>
                      {participant.isHost && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                          Host
                        </Badge>
                      )}
                    </div>
                    {isHost && (
                      <p className="text-sm text-gray-600">{participant.email}</p>
                    )}
                  </div>
                </div>
                
                {isHost && !participant.isHost && (
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center - Chat Messages */}
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
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

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={sendMessage} className="flex space-x-3">
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
        </div>

        {/* Right Sidebar - Room Details */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Room Details</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Room Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Room Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Room Name</p>
                  <p className="font-medium">Team Standup</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">2 hours</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Participants</p>
                  <p className="font-medium">10 people</p>
                </div>
              </CardContent>
            </Card>

            {/* Access Key (Host only) */}
            {isHost && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Access Key</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Input value={accessKey} readOnly className="font-mono" />
                    <Button onClick={copyAccessKey} size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Host Controls */}
            {isHost && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Host Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={downloadTranscript}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Transcript
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Room Settings
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
