import UserDetails from "@/components/UserDetail";
import { useLatestUser } from "@/hooks/useLatestUser";
import React from "react";

const UserPage: React.FC = () => {
  const { latestUser: user, error } = useLatestUser();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserDetails user={user} />
    </div>
  );
};

export default UserPage;