import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ClaimButton({ selectedUser, setLeaderboard }) {
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = async () => {
    if (!selectedUser) {
      toast.warning('Please select a user first!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsClaiming(true);
    try {
      console.log('Attempting to claim points for user:', selectedUser);
      console.log('API URL:', `${import.meta.env.VITE_API_URL}/api/claim/${selectedUser}`);
      
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        const res = await axios.post(`${API_URL}/api/claim/${selectedUser}`);

      console.log('Claim response:', res.data);

      if (!res.data || !res.data.awardedPoints) {
        throw new Error('Invalid response from server');
      }

      toast.success(`🎉 ${res.data.awardedPoints} points awarded!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      if (res.data.leaderboard) {
        setLeaderboard(res.data.leaderboard);
      }
    } catch (err) {
      console.error('Claim failed:', err);
      let errorMessage = 'Error claiming points. Please try again.';
      
      if (err.response) {
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <button
      onClick={handleClaim}
      disabled={isClaiming || !selectedUser}
      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden ${
        selectedUser 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02]'
          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
      } ${isClaiming ? 'opacity-80' : ''}`}
    >
      
      {isClaiming && (
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {!isClaiming && (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Claim Points</span>
        </>
      )}
    </button>
  );
}