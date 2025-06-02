import { UserProfile } from '@clerk/nextjs';
import React from 'react';

function Settings() {
  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center bg-muted transition-colors">
      <div className="w-full max-w-4xl">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "shadow-lg rounded-xl p-6 bg-card text-foreground",
              card: "bg-card text-foreground",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Settings;
