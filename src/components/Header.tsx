import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ui/theme-provider";
import React, { useEffect, useState } from "react";
import { getUserData, userLogout } from "../api/users";
import { Logo } from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export const Header: React.FC = () => {
  const { setTheme } = useTheme();
  const currentMode = localStorage.getItem("vite-ui-theme");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
      }
    };
    fetchUser();
  }, []);

  const handleMode = () => {
    setTheme(currentMode === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    userLogout(user);
  };

  return (
    <>
      <div className="flex w-full fixed bg-lighty dark:bg-darky justify-between p-3 transition-colors">
        <Logo />
        {/* Dark / Light Mode */}
        <div className="flex gap-2 items-center">
          <div>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="hover:!bg-transparent">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xl font-semibold">{user && user.fullName[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{user && <p className="text-sm font-semibold text-center">{user.email}</p>}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer p-2 hover:bg-darky/5 dark:hover:bg-lighty/5">
                    {/* <Button variant={"ghost"} className="px-0 -my-2 hover:!bg-transparent"> */}
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    {/* </Button> */}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div>
            <Button className="" variant="outline" size="icon" onClick={handleMode}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-darky dark:text-lighty" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-darky dark:text-lighty" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
