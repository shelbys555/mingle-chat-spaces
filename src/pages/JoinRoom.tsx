
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Key, Mail, Shield } from 'lucide-react';

const JoinRoom = () => {
  const [step, setStep] = useState<'accessKey' | 'email' | 'otp'>('accessKey');
  const [accessKey, setAccessKey] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAccessKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate access key validation
    setTimeout(() => {
      setLoading(false);
      setStep('email');
    }, 1000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate email verification
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP verification and join room
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/chat-room/abc123?participant=true';
    }, 1000);
  };

  const getStepIcon = () => {
    switch (step) {
      case 'accessKey': return <Key className="h-8 w-8 text-white" />;
      case 'email': return <Mail className="h-8 w-8 text-white" />;
      case 'otp': return <Shield className="h-8 w-8 text-white" />;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'accessKey': return 'Enter Access Key';
      case 'email': return 'Enter Your Email';
      case 'otp': return 'Verify OTP';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'accessKey': return 'Enter the room access key provided by the host';
      case 'email': return 'We\'ll send you a verification code to join the room';
      case 'otp': return `Enter the 6-digit code sent to ${email}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          onClick={() => window.history.back()}
          variant="ghost" 
          className="text-white hover:bg-white/20 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="bg-white/95 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              {getStepIcon()}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {getStepTitle()}
            </CardTitle>
            <p className="text-gray-600">
              {getStepDescription()}
            </p>
          </CardHeader>

          <CardContent>
            {step === 'accessKey' && (
              <form onSubmit={handleAccessKeySubmit} className="space-y-6">
                <div>
                  <Label htmlFor="accessKey" className="text-gray-700">Room Access Key</Label>
                  <Input
                    id="accessKey"
                    type="text"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value.toUpperCase())}
                    placeholder="Enter access key"
                    required
                    className="mt-2 text-center text-lg font-mono tracking-widest border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading || !accessKey}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-200"
                >
                  {loading ? 'Validating...' : 'Validate Access Key'}
                </Button>
              </form>
            )}

            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading || !email}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-200"
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </Button>

                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('accessKey')}
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  Back to Access Key
                </Button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="otp" className="text-gray-700">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                    className="mt-2 text-center text-2xl font-mono tracking-widest border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-200"
                >
                  {loading ? 'Joining Room...' : 'Join Chat Room'}
                </Button>

                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('email')}
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  Didn't receive code? Try again
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JoinRoom;
