
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, Clock, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [previousRooms, setPreviousRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real rooms from backend
    // For now, using mock data
    setTimeout(() => {
      setPreviousRooms([
        {
          id: 1,
          name: "Team Standup",
          participants: 8,
          maxParticipants: 10,
          duration: "45 min",
          date: "2024-01-15",
          status: "completed"
        },
        {
          id: 2,
          name: "Project Review",
          participants: 12,
          maxParticipants: 15,
          duration: "1h 30min",
          date: "2024-01-12",
          status: "completed"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your chat rooms and sessions</p>
            </div>
            <Button 
              onClick={() => setShowCreateRoom(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Room
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Rooms</p>
                  <p className="text-3xl font-bold text-gray-800">{previousRooms.length}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Participants</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {previousRooms.reduce((sum, room) => sum + room.participants, 0)}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Duration</p>
                  <p className="text-3xl font-bold text-gray-800">1h 5m</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Previous Rooms */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Previous Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading rooms...</div>
            ) : (
              <div className="space-y-4">
                {previousRooms.map((room) => (
                  <div 
                    key={room.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {room.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{room.participants}/{room.maxParticipants} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{room.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(room.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" className="text-purple-600 hover:text-purple-800">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Room Modal */}
      {showCreateRoom && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <CreateRoomModal onClose={() => setShowCreateRoom(false)} />
        </div>
      )}
    </div>
  );
};

const CreateRoomModal = ({ onClose }) => (
  <Card className="w-full max-w-md bg-white">
    <CardContent className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Room</h2>
      <p className="text-gray-600 mb-4">This will open the room creation form.</p>
      <div className="flex space-x-4">
        <Button onClick={onClose} variant="outline" className="flex-1">Cancel</Button>
        <Button onClick={() => window.location.href = '/create-room'} className="flex-1">Continue</Button>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
