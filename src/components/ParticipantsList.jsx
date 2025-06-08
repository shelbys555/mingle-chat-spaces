
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserMinus } from 'lucide-react';

const ParticipantsList = ({ participants, isHost, onRemoveParticipant }) => {
  return (
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onRemoveParticipant(participant.id)}
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;
