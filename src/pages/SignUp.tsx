
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { GithubIcon, ArrowLeft, Check, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  // Password validation criteria
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const navigate = useNavigate();
  const { signUp, signInWithGithub, updateUserProfile } = useAuth();

  // Update password criteria on password change
  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
  }, [password]);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!allCriteriaMet) {
      newErrors.password = "Password does not meet all requirements";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp(email, password);
      await updateUserProfile(name);
      toast.success("Account created successfully! Please verify your email.");
      navigate("/verify-email");
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email is already in use" });
      } else {
        setErrors({ general: error.message || "Failed to create account" });
      }
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGithub();
      toast.success("Successfully signed up with GitHub");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("GitHub signup error:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        setErrors({ general: "An account already exists with the same email address but different sign-in credentials." });
      } else {
        setErrors({ general: error.message || "Failed to sign up with GitHub" });
      }
      toast.error("Failed to sign up with GitHub");
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
          onClick={() => navigate('/')}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to home</span>
        </Button>
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md shadow-lg border-gray-200 dark:border-gray-800 dark:bg-slate-800 dark:text-gray-100 transition-colors duration-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center dark:text-gray-300">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.general && (
            <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 rounded">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${errors.name ? "border-red-500" : ""} dark:bg-slate-900 dark:border-gray-700`}
                disabled={loading}
              />
              {errors.name && <p className="text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${errors.email ? "border-red-500" : ""} dark:bg-slate-900 dark:border-gray-700`}
                disabled={loading}
              />
              {errors.email && <p className="text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${errors.password ? "border-red-500" : ""} dark:bg-slate-900 dark:border-gray-700`}
                disabled={loading}
              />
              {errors.password && <p className="text-sm text-red-500 dark:text-red-400">{errors.password}</p>}
              
              {/* Password criteria list */}
              <div className="mt-2 space-y-1 text-sm">
                <p className="font-medium text-gray-700 dark:text-gray-300">Password must contain:</p>
                <ul className="space-y-1 pl-1">
                  <li className="flex items-center space-x-2">
                    {passwordCriteria.length ? 
                      <Check className="h-4 w-4 text-green-500" /> : 
                      <X className="h-4 w-4 text-red-500" />}
                    <span className={passwordCriteria.length ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                      At least 8 characters
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {passwordCriteria.uppercase ? 
                      <Check className="h-4 w-4 text-green-500" /> : 
                      <X className="h-4 w-4 text-red-500" />}
                    <span className={passwordCriteria.uppercase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                      At least one uppercase letter
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {passwordCriteria.lowercase ? 
                      <Check className="h-4 w-4 text-green-500" /> : 
                      <X className="h-4 w-4 text-red-500" />}
                    <span className={passwordCriteria.lowercase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                      At least one lowercase letter
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {passwordCriteria.number ? 
                      <Check className="h-4 w-4 text-green-500" /> : 
                      <X className="h-4 w-4 text-red-500" />}
                    <span className={passwordCriteria.number ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                      At least one number
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {passwordCriteria.special ? 
                      <Check className="h-4 w-4 text-green-500" /> : 
                      <X className="h-4 w-4 text-red-500" />}
                    <span className={passwordCriteria.special ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                      At least one special character (!@#$%^&*)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${errors.confirmPassword ? "border-red-500" : ""} dark:bg-slate-900 dark:border-gray-700`}
                disabled={loading}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500 dark:text-red-400">{errors.confirmPassword}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="dark:bg-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-800 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                onClick={handleGithubSignUp}
                disabled={loading}
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                onClick={() => navigate('/phone-login')}
                disabled={loading}
              >
                Phone Number
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign in
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
