
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Users, Clock, FileText } from 'lucide-react';

const CreateRoom = () => {
  const [roomData, setRoomData] = useState({
    name: '',
    maxParticipants: '',
    duration: '',
    transcriptEnabled: true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate room creation
    setTimeout(() => {
      setLoading(false);
      // Redirect to chat room with generated access key
      window.location.href = '/chat-room/abc123';
    }, 1000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setRoomData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-8">
        <Button 
          onClick={() => window.history.back()}
          variant="ghost" 
          className="mb-6 text-purple-600 hover:text-purple-800 hover:bg-purple-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">Create New Room</CardTitle>
              <p className="text-gray-600 mt-2">Configure your chat room settings</p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Room Name */}
                <div className="space-y-2">
                  <Label htmlFor="roomName" className="text-lg font-semibold text-gray-700">
                    Room Name
                  </Label>
                  <Input
                    id="roomName"
                    type="text"
                    value={roomData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter room name (e.g., Team Meeting, Project Discussion)"
                    required
                    className="h-12 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {/* Max Participants */}
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="text-lg font-semibold text-gray-700 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                    Maximum Participants
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="2"
                    max="100"
                    value={roomData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                    placeholder="Enter max participants (2-100)"
                    required
                    className="h-12 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {/* Room Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-lg font-semibold text-gray-700 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-purple-600" />
                    Room Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    max="480"
                    value={roomData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="Enter duration in minutes (15-480)"
                    required
                    className="h-12 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {/* Transcript Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-purple-600" />
                    <div>
                      <Label className="text-lg font-semibold text-gray-700">
                        Enable Chat Transcript
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Automatically generate and save chat transcript for download
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={roomData.transcriptEnabled}
                    onCheckedChange={(checked) => handleInputChange('transcriptEnabled', checked)}
                    className="scale-125"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={loading || !roomData.name || !roomData.maxParticipants || !roomData.duration}
                  className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  {loading ? 'Creating Room...' : 'Create Room & Start Chat'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
