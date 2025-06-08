
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HostControls from './HostControls';

const RoomDetails = ({ 
  roomInfo, 
  isHost, 
  accessKey, 
  onCopyAccessKey, 
  onDownloadTranscript 
}) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Room Details</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Room Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Room Name</p>
              <p className="font-medium">{roomInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-medium">{roomInfo.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Max Participants</p>
              <p className="font-medium">{roomInfo.maxParticipants}</p>
            </div>
          </CardContent>
        </Card>

        {isHost && (
          <HostControls
            accessKey={accessKey}
            onCopyAccessKey={onCopyAccessKey}
            onDownloadTranscript={onDownloadTranscript}
          />
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
