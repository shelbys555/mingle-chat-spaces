
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import { authAPI } from '@/services/api';
import { toast } from '@/components/ui/sonner';

const HostAuth = () => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await authAPI.register({ name, email });
      toast.success('Verification code sent to your email');
      setStep('otp');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await authAPI.verifyOTP({ otp });
      toast.success('Authentication successful');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
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
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              {step === 'email' ? (
                <Mail className="h-8 w-8 text-white" />
              ) : (
                <Shield className="h-8 w-8 text-white" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {step === 'email' ? 'Host Registration' : 'Verify OTP'}
            </CardTitle>
            <p className="text-gray-600">
              {step === 'email' 
                ? 'Enter your details to create and host a room'
                : `Enter the 6-digit code sent to ${email}`
              }
            </p>
          </CardHeader>

          <CardContent>
            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading || !email || !name}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-200"
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </Button>
              </form>
            ) : (
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
                    className="mt-2 text-center text-2xl font-mono tracking-widest border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-200"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </Button>

                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('email')}
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  Back to registration
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostAuth;
