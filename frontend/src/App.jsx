import { useState, useEffect } from 'react';
import axios from 'axios';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';

function App() {
  const [selectedUser, setSelectedUser] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    axios.get(`${API_URL}/api/users/leaderboard`)
      .then(res => setLeaderboard(res.data))
      .catch(err => console.error('Leaderboard fetch failed:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight py-1">
            Glory Leaderboard
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Compete for the top spot! Claim points and track your progress against others.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform transition-all hover:shadow-2xl hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Select Your Champion
              </h2>
              <UserSelector selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform transition-all hover:shadow-2xl hover:-translate-y-1">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Claim Your Points
              </h2>
              <ClaimButton selectedUser={selectedUser} setLeaderboard={setLeaderboard} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <Leaderboard leaderboard={leaderboard} />
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <ClaimHistory />
            </div>
          </div>
        </div>

        <div className="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-200 opacity-10 animate-float"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 30 + 20}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
