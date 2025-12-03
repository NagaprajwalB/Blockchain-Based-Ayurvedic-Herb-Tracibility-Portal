import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Leaf, Users, ShoppingCart, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'PROVIDER' | 'CONSUMER'>('CONSUMER');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'provider' || roleParam === 'consumer') {
      setRole(roleParam.toUpperCase() as 'PROVIDER' | 'CONSUMER');
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === 'PROVIDER' ? '/provider' : '/consumer');
    }
  }, [isAuthenticated, role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const success = isLogin 
        ? await login(formData.email, formData.password, role)
        : await signup(formData.email, formData.password, role);

      if (success) {
        navigate(role === 'PROVIDER' ? '/provider' : '/consumer');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">AyurTrace</h1>
          </div>
          <p className="text-gray-600">Blockchain-powered herb traceability</p>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Select Your Role</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setRole('PROVIDER')}
              className={`p-4 rounded-lg border-2 transition-all ${
                role === 'PROVIDER'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 hover:border-amber-300 text-gray-600'
              }`}
            >
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="font-medium">Provider</div>
              <div className="text-xs">Farmers & Suppliers</div>
            </button>
            <button
              onClick={() => setRole('CONSUMER')}
              className={`p-4 rounded-lg border-2 transition-all ${
                role === 'CONSUMER'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300 text-gray-600'
              }`}
            >
              <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
              <div className="font-medium">Consumer</div>
              <div className="text-xs">Buyers & Verifiers</div>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 text-center font-medium rounded-l-md transition-colors ${
                isLogin
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 text-center font-medium rounded-r-md transition-colors ${
                !isLogin
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                role === 'PROVIDER'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? 'Processing...' : `${isLogin ? 'Login' : 'Sign Up'} as ${role === 'PROVIDER' ? 'Provider' : 'Consumer'}`}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <div><strong>Provider:</strong> provider@demo.com / demo123</div>
            <div><strong>Consumer:</strong> consumer@demo.com / demo123</div>
          </div>
        </div>
      </div>
    </div>
  );
};