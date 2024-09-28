import React from 'react';
import { useAuth, useUser } from '@clerk/nextjs'; // Assuming Clerk is handling authentication

export default function Dashboard() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <div className="p-6">
      {isSignedIn ? (
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.fullName}!</h1>
          <p>Your task dashboard will be displayed here.</p>
        </div>
      ) : (
        <p>Please sign in to access your dashboard.</p>
      )}
    </div>
  );
}
