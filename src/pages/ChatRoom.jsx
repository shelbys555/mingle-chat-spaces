
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { initializeSocket, sendMessage as socketSendMessage } from '@/services/socket';
import ChatHeader from '@/components/ChatHeader';
import ParticipantsList from '@/components/ParticipantsList';
import MessageArea from '@/components/MessageArea';
import MessageInput from '@/components/MessageInput';
import RoomDetails from '@/components/RoomDetails';

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', email: 'john@example.com', message: 'Welcome to the chat room!', timestamp: '10:30 AM', isHost: true },
    { id: 2, sender: 'Jane Smith', email: 'jane@example.com', message: 'Thanks for having me here.', timestamp: '10:31 AM', isHost: false },
    { id: 3, sender: 'Mike Johnson', email: 'mike@example.com', message: 'Looking forward to our discussion.', timestamp: '10:32 AM', isHost: false }
  ]);
  
  // Check if current user is host (from URL params)
  const isHost = !window.location.search.includes('participant=true');
  const accessKey = 'CHAT123XYZ';
  
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', isHost: true, isOnline: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', isHost: false, isOnline: true },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', isHost: false, isOnline: true },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', isHost: false, isOnline: false }
  ]);

  const [timeRemaining, setTimeRemaining] = useState('1:45:30');
  const [roomInfo] = useState({
    name: 'Team Standup',
    duration: '2 hours',
    maxParticipants: '10 people'
  });

  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = initializeSocket();
    
    // Join the room
    socket.emit('joinRoom', { roomId, isHost });

    // Listen for new messages
    socket.on('newMessage', (messageData) => {
      setMessages(prev => [...prev, messageData]);
    });

    // Listen for participant updates
    socket.on('participantUpdate', (participantsData) => {
      setParticipants(participantsData);
    });

    // Simulate countdown timer
    const timer = setInterval(() => {
      // This would normally calculate real remaining time
      console.log('Timer tick for room:', roomId);
    }, 1000);

    return () => {
      clearInterval(timer);
      socket.disconnect();
    };
  }, [roomId, isHost]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: isHost ? 'John Doe' : 'Current User',
      email: isHost ? 'john@example.com' : 'user@example.com',
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isHost: isHost,
      roomId: roomId
    };

    // Send via Socket.IO
    socketSendMessage(newMessage);
    
    // Update local state immediately for responsive UI
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handleCopyAccessKey = () => {
    navigator.clipboard.writeText(accessKey);
    toast.success('Access key copied to clipboard');
  };

  const handleEndChat = () => {
    if (window.confirm('Are you sure you want to end this chat session?')) {
      navigate('/dashboard');
    }
  };

  const handleDownloadTranscript = () => {
    // Generate and download transcript
    const transcript = messages.map(msg => 
      `[${msg.timestamp}] ${msg.sender}: ${msg.message}`
    ).join('\n');
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${roomInfo.name}-transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Transcript downloaded successfully');
  };

  const handleRemoveParticipant = (participantId) => {
    if (window.confirm('Are you sure you want to remove this participant?')) {
      setParticipants(prev => prev.filter(p => p.id !== participantId));
      toast.success('Participant removed from the room');
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <ChatHeader
        roomName={roomInfo.name}
        timeRemaining={timeRemaining}
        participants={participants}
        isHost={isHost}
        onEndChat={handleEndChat}
      />

      <div className="flex-1 flex overflow-hidden">
        <ParticipantsList
          participants={participants}
          isHost={isHost}
          onRemoveParticipant={handleRemoveParticipant}
        />

        <div className="flex-1 flex flex-col">
          <MessageArea messages={messages} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
          />
        </div>

        <RoomDetails
          roomInfo={roomInfo}
          isHost={isHost}
          accessKey={accessKey}
          onCopyAccessKey={handleCopyAccessKey}
          onDownloadTranscript={handleDownloadTranscript}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
