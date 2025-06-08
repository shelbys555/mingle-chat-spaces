
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Settings } from 'lucide-react';

const HostControls = ({ accessKey, onCopyAccessKey, onDownloadTranscript }) => {
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Access Key</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input value={accessKey} readOnly className="font-mono" />
            <Button onClick={onCopyAccessKey} size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Host Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={onDownloadTranscript}
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
    </>
  );
};

export default HostControls;
