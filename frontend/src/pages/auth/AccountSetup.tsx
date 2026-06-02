import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ShieldCheck, Key, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function AccountSetup() {
  const navigate = useNavigate();
  
  // UI Loading & Context States
  const [sessionLoading, setSessionLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Profile Meta Data fetched dynamically based on token session
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  // Password Input Fields States
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const verifyInvitationSession = async () => {
      try {
        // 1. Check if Supabase successfully parsed the email link hash into an active session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session || !session.user) {
          setStatus({ 
            type: 'error', 
            message: 'Your activation token is missing, expired, or invalid. Please request a new invite from your administrator.' 
          });
          setSessionLoading(false);
          return;
        }

        // 2. Fetch the pre-authorized profile details using their authenticated user email
        const userEmail = session.user.email;
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('email', userEmail)
          .maybeSingle(); // Handles case cleanly if database trigger hasn't fired yet

        if (profileError) throw profileError;

        if (profile) {
          setUserName(profile.full_name);
          setUserRole(profile.role);
        } else {
          setUserName('Valued Member');
        }

      } catch (err: any) {
        console.error('Session verification roadblock:', err);
        setStatus({ type: 'error', message: `Verification failed: ${err.message}` });
      } finally {
        setSessionLoading(false);
      }
    };

    verifyInvitationSession();
  }, []);

  const handleCompleteActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setStatus(null);

    // Form parameter validation checks
    if (password.length < 6) {
      setStatus({ type: 'error', message: 'Security parameters dictate passwords must be at least 6 characters long.' });
      setActionLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Password confirmation mismatch. Ensure both values match identically.' });
      setActionLoading(false);
      return;
    }

    try {
      // Update user account credentials using Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        password: password
      });

      if (authError) throw authError;

      setStatus({ 
        type: 'success', 
        message: 'Account configured and password secured! Syncing your instance workspace...' 
      });

      // Redirect them cleanly into their dashboard route based on pre-assigned database roles
      setTimeout(() => {
        if (userRole === 'super-admin') {
          navigate('/super-admin/dashboard');
        } else if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/member/home');
        }
      }, 2000);

    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to initialize security credentials.' });
      setActionLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-medium text-gray-500 tracking-wider uppercase">Verifying Security Credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        
        {/* Decorative Graphic Branded Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Activate Portal Instance</h1>
          {userName && (
            <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5 font-medium">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Welcome back, <span className="text-gray-900 font-bold">{userName}</span>!
            </p>
          )}
        </div>

        {/* Dynamic Operational Alerts Code Block */}
        {status && (
          <div className={`p-4 rounded-xl text-xs flex items-start space-x-2 border ${
            status.type === 'success' 
              ? 'bg-green-50 text-green-800 border-green-100' 
              : 'bg-red-50 text-red-800 border-red-100'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" /> : <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600 mt-0.5" />}
            <span className="leading-relaxed">{status.message}</span>
          </div>
        )}

        {/* Setup Form Rendering loop conditional block */}
        {(!status || status.type !== 'success') && (
          <form onSubmit={handleCompleteActivation} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Choose Secure Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm Your Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all disabled:opacity-50 mt-2"
            >
              {actionLoading ? 'Saving Security Profile...' : 'Complete Account Activation'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}