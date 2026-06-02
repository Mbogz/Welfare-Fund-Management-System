import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { LogIn, Mail, Key, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  // Form Processing States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // 1. Authenticate credentials via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (authError) throw authError;

      if (authData?.user) {
        // 2. Fetch the user's role from public.profiles table to route them to the right dashboard
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (profileError) throw profileError;

        setStatus({ type: 'success', message: 'Authentication successful! Redirecting...' });

        // 3. Dynamic role-based routing matrix
        setTimeout(() => {
          if (profile?.role === 'super-admin') {
            navigate('/super-admin');
          } else if (profile?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/member/home');
          }
        }, 1000);
      }
    } catch (err: any) {
      console.error('Authentication barrier:', err);
      setStatus({ type: 'error', message: err.message || 'Invalid login credentials. Please check your spelling and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        
        {/* Branding Title Block */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto">
            <LogIn className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Access Portal Gateway</h1>
          <p className="text-sm text-gray-500">Sign in to manage your decentralized welfare contributions.</p>
        </div>

        {/* Dynamic Warning Alerts Container */}
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

        {/* Credentials Form Layout */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Registered Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="you@welfaregroup.org"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Security Password</label>
            </div>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Verifying Identity Credentials...' : 'Authenticate Account'}
          </button>
        </form>

      </div>
    </div>
  );
}