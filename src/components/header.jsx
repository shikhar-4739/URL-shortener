import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  const getAvatarFallback = (email) => {
    if (!email) return "CN";
    const [first, second] = email.split("_")[0];
    return `${first}${second}`.toUpperCase();
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4">
        <Link to="/">
          <img src="/logo.png" className="h-16" alt="Trimm logo" />
        </Link>

        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>{getAvatarFallback(user?.user_metadata?.name)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        toast.success("Logged out successfully");
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
