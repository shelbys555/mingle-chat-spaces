
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Users, Shield, Clock } from 'lucide-react';

const Index = () => {
  const [showHostModal, setShowHostModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">ChatFlow</span>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            onClick={() => setShowHostModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Host a Room
          </Button>
          <Button 
            onClick={() => setShowJoinModal(true)}
            variant="outline" 
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-2 rounded-lg transition-all duration-200"
          >
            Join a Room
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Real-Time Chat
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Create secure chat rooms, invite participants, and enjoy seamless real-time communication with advanced features like transcripts and participant management.
          </p>
          
          <div className="flex justify-center space-x-6 mb-16">
            <Button 
              onClick={() => setShowHostModal(true)}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Hosting Now
            </Button>
            <Button 
              onClick={() => setShowJoinModal(true)}
              variant="outline" 
              size="lg"
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-200"
            >
              Join a Room
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Room Management</h3>
              <p className="text-gray-300">
                Create and manage chat rooms with custom participant limits, duration settings, and full control over your conversations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Secure Access</h3>
              <p className="text-gray-300">
                Protected rooms with access keys, email verification, and OTP authentication ensure only invited participants can join.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">Chat Transcripts</h3>
              <p className="text-gray-300">
                Automatically generate and download chat transcripts to keep records of important conversations and meetings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {showHostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <HostRoomModal onClose={() => setShowHostModal(false)} />
        </div>
      )}

      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <JoinRoomModal onClose={() => setShowJoinModal(false)} />
        </div>
      )}
    </div>
  );
};

// Modal components
const HostRoomModal = ({ onClose }) => (
  <Card className="w-full max-w-md mx-4 bg-white">
    <CardContent className="p-6">
      <h2 className="text-2xl font-bold mb-4">Host a Room</h2>
      <p className="text-gray-600 mb-4">This will redirect to the host authentication flow.</p>
      <div className="flex space-x-4">
        <Button onClick={onClose} variant="outline" className="flex-1">Cancel</Button>
        <Button onClick={() => window.location.href = '/host-auth'} className="flex-1">Continue</Button>
      </div>
    </CardContent>
  </Card>
);

const JoinRoomModal = ({ onClose }) => (
  <Card className="w-full max-w-md mx-4 bg-white">
    <CardContent className="p-6">
      <h2 className="text-2xl font-bold mb-4">Join a Room</h2>
      <p className="text-gray-600 mb-4">This will redirect to the join room flow.</p>
      <div className="flex space-x-4">
        <Button onClick={onClose} variant="outline" className="flex-1">Cancel</Button>
        <Button onClick={() => window.location.href = '/join-room'} className="flex-1">Continue</Button>
      </div>
    </CardContent>
  </Card>
);

export default Index;
