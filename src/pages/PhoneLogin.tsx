
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ConfirmationResult } from "firebase/auth";
import { ArrowLeft, Phone, KeyRound } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    phoneNumber?: string;
    otp?: string;
    general?: string;
  }>({});

  const confirmationResultRef = useRef<ConfirmationResult | null>(null);
  const navigate = useNavigate();
  const { setupRecaptcha, confirmOtp } = useAuth();

  const validatePhoneNumber = () => {
    const newErrors: {
      phoneNumber?: string;
    } = {};

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      // Simple validation, you can use a more robust library for international number validation
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid phone number with country code (e.g., +1234567890)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: {
      otp?: string;
    } = {};

    if (!otp) {
      newErrors.otp = "OTP is required";
    } else if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      newErrors.otp = "OTP must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validatePhoneNumber()) return;

    setLoading(true);
    try {
      const confirmationResult = await setupRecaptcha(phoneNumber);
      confirmationResultRef.current = confirmationResult;
      setVerificationSent(true);
      toast.success("Verification code sent to your phone");
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setErrors({ general: error.message || "Failed to send verification code" });
      toast.error("Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateOtp()) return;

    if (!confirmationResultRef.current) {
      setErrors({ general: "Verification process expired. Please try again." });
      return;
    }

    setLoading(true);
    try {
      await confirmOtp(confirmationResultRef.current, otp);
      toast.success("Phone verification successful");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Verify OTP error:", error);
      if (error.code === "auth/invalid-verification-code") {
        setErrors({ otp: "Invalid verification code" });
      } else {
        setErrors({ general: error.message || "Failed to verify code" });
      }
      toast.error("Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-slate-900 px-4 transition-colors duration-300">
      <div className="absolute top-4 left-4 flex space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/login')}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to login</span>
        </Button>
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md shadow-lg border-gray-200 dark:border-gray-800 dark:bg-slate-800 dark:text-gray-100 transition-colors duration-300">
        <CardHeader className="space-y-1">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 mb-2">
            {verificationSent ? (
              <KeyRound className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            ) : (
              <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {verificationSent ? "Verify OTP" : "Phone Authentication"}
          </CardTitle>
          <CardDescription className="text-center dark:text-gray-300">
            {verificationSent 
              ? "Enter the verification code sent to your phone" 
              : "Enter your phone number to receive a verification code"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.general && (
            <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 rounded">
              {errors.general}
            </div>
          )}
          
          {!verificationSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`${errors.phoneNumber ? "border-red-500" : ""} dark:bg-slate-900 dark:border-gray-700`}
                  disabled={loading}
                />
                {errors.phoneNumber && <p className="text-sm text-red-500 dark:text-red-400">{errors.phoneNumber}</p>}
              </div>
              
              <div id="recaptcha-container" className="flex justify-center my-4"></div>
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Sending code..." : "Send Verification Code"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="flex justify-center">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => {
                      // Only allow numbers and limit to 6 characters
                      const input = e.target.value.replace(/\D/g, '').substring(0, 6);
                      setOtp(input);
                    }}
                    className={`${errors.otp ? "border-red-500" : ""} text-center tracking-widest text-lg dark:bg-slate-900 dark:border-gray-700`}
                    disabled={loading}
                    maxLength={6}
                  />
                </div>
                {errors.otp && <p className="text-sm text-red-500 dark:text-red-400 text-center">{errors.otp}</p>}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-700"
                onClick={() => setVerificationSent(false)}
                disabled={loading}
              >
                Change Phone Number
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Sign In
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PhoneLogin;
