import { User } from "@/types/user";
import React from "react";
import { Card } from "./ui/card";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const navigate = useNavigate();
  const cards = [
    { label: 'Name', value: user?.name || 'N/A', route: `/update-name/${user.id}` },
    { label: 'Username', value: user?.userName || 'N/A', route: `/update-username/${user.id}` },
    { label: 'Email', value: user?.email || 'N/A', route: '/' },
    { label: 'Phone Number', value: user?.phone || 'N/A', route: '/' },
    { label: 'Change Password', value: '********', route: `/update-password/${user.id}` },
    { label: 'Delete My Account', value: '', route: `/delete-account/${user.id}` },
  ];

  return (
    <div className="space-y-0 p-4 w-full max-w-md mx-auto bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Profile Settings</h1>
      {cards.map((card, index) => (
        <Card
          key={index}
          className={cn(
            'rounded-md overflow-hidden group hover:shadow-2xl bg-background p-4 h-[90px]',
            index === cards.length - 1 ? 'mb-8' : 'mb-2'
          )}
        >
          <div className="flex justify-between items-center h-full">
            <div className="flex flex-col">
              <span className="text-left font-bold">{card.label}</span>
              <span className="text-left text-sm">{card.value}</span>
            </div>
            <button
              onClick={() => navigate(card.route)}
              className="text-right transition duration-300 ease-in-out"
            >
              <ChevronRight className="h-6 w-6 transition-transform transform group-hover:translate-x-1" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserDetails;