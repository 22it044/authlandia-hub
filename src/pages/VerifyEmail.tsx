
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { currentUser, sendVerificationEmail, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.emailVerified) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  const handleResendEmail = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await sendVerificationEmail();
      setResendDisabled(true);
      setCountdown(60); // Disable resend for 60 seconds
      toast.success("Verification email sent");
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      setError(error.message || "Failed to send verification email");
      toast.error("Failed to send verification email");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (currentUser) {
      currentUser.reload()
        .then(() => {
          if (currentUser.emailVerified) {
            toast.success("Email verified successfully");
            navigate("/dashboard");
          } else {
            toast.error("Email not verified yet");
          }
        })
        .catch((error) => {
          console.error("Error reloading user:", error);
          toast.error("Failed to check verification status");
        });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!currentUser) {
    return null; // Will navigate to login from useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <MailCheck className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification email to <strong>{currentUser.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-300 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded border border-blue-200 text-center">
              <p className="text-gray-700">
                Please check your inbox and click on the verification link to verify your email address.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                If you don't see the email, check your spam folder.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleRefresh}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                I've Verified My Email
              </Button>
              
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full"
                disabled={loading || resendDisabled}
              >
                {loading ? "Sending..." : resendDisabled 
                  ? `Resend Email (${countdown}s)` 
                  : "Resend Verification Email"}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={handleLogout}>
            Sign out and use a different account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
