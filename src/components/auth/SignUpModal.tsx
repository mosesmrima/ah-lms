import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, addToast } from '@heroui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

const SignUpModal = ({ isOpen, onClose, onOpenLogin }: SignUpModalProps) => {
  const { signUp, signInWithGoogle, isSigningUp, isGoogleSigningIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signUp(email, password, fullName);
      addToast({
        title: "Success",
        description: "Account created successfully!",
        color: "success"
      });
      onClose();
    } catch (error: unknown) {
      addToast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to create account',
        color: "danger"
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      addToast({
        title: "Success",
        description: "Successfully signed up with Google!",
        color: "success"
      });
      onClose();
    } catch (error: unknown) {
      addToast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to sign up with Google',
        color: "danger"
      });
    }
  };

  const handleLoginClick = () => {
    onClose();
    onOpenLogin();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      backdrop="blur"
      placement="center"
      classNames={{
        base: "bg-black rounded-lg shadow-xl",
        backdrop: "bg-black/70",
        wrapper: "z-50 overflow-y-auto",
      }}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" }
          },
          exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.2, ease: "easeIn" }
          }
        }
      }}
      hideCloseButton
    >
      <ModalContent className="p-0 w-full max-w-md">
        {() => (
          <>
            <ModalHeader className="text-center text-2xl font-medium leading-6 text-white mb-0 p-6 pb-0">
              Sign Up to Africahackon
            </ModalHeader>
            <ModalBody className="p-6 pt-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="w-full rounded-lg bg-[#222222] p-4 text-white outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-lg bg-[#222222] p-4 text-white outline-none"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-lg bg-[#222222] p-4 text-white outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#ed3237] py-4 text-white font-medium hover:bg-red-600 transition-colors"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center">
                <div className="flex-1 h-px bg-gray-600"></div>
                <span className="px-4 text-sm text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-600"></div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center rounded-lg bg-[#4285F4] py-4 text-white font-medium hover:bg-blue-600 transition-colors"
                  disabled={isGoogleSigningIn}
                >
                  {isGoogleSigningIn ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <span className="mr-2">
                        <svg
                          width="18"
                          height="18"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                          />
                          <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                          />
                          <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                          />
                          <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                          />
                        </svg>
                      </span>
                      Continue with Google
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center">
                  <div className="flex-1 h-px bg-gray-600"></div>
                  <span className="px-4 text-sm text-gray-400">
                   Have an account?
                  </span>
                  <div className="flex-1 h-px bg-gray-600"></div>
                </div>

                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="mt-4 w-full rounded-lg bg-[#222222] py-4 text-[#ed3237] font-medium hover:bg-[#333333] transition-colors"
                >
                  Sign In
                </button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;