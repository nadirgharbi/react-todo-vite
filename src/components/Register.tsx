import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Toaster } from "sonner";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { userRegister } from "../api/users";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Register: React.FC = () => {
  const [user, setUser] = useState<UserRegister>({ fullName: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState({
    full_name: true,
    email: true,
    password: true,
    confirm_password: true,
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const inputStyle = "bg-lighty dark:bg-darky border-darky/20 dark:border-lighty/20 ";

  const checkName = () => {
    return Boolean(user.fullName);
  };

  const checkEmail = () => {
    return emailRegex.test(user.email) && Boolean(user.email);
  };

  const checkPassword = () => {
    return (user.password.length >= 8 && user.password.length <= 16) || Boolean(user.password);
  };

  const checkSamePassword = () => {
    return confirmPassword === user.password && Boolean(confirmPassword);
  };

  const validForm = () => {
    return checkName() && checkEmail() && checkPassword() && checkSamePassword();
  };

  const handleSubmit = () => {
    if (!validForm()) {
      !checkName() ? setIsCorrect((prev) => ({ ...prev, full_name: false })) : setIsCorrect((prev) => ({ ...prev, full_name: true }));
      !checkEmail() ? setIsCorrect((prev) => ({ ...prev, email: false })) : setIsCorrect((prev) => ({ ...prev, email: true }));
      !checkPassword() ? setIsCorrect((prev) => ({ ...prev, password: false })) : setIsCorrect((prev) => ({ ...prev, password: true }));
      !checkSamePassword() ? setIsCorrect((prev) => ({ ...prev, confirm_password: false })) : setIsCorrect((prev) => ({ ...prev, confirm_password: true }));
    } else {
      userRegister(user);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-lighty dark:bg-darky text-darky dark:text-lighty transition-all ">
      <Toaster position="top-center" richColors closeButton />
      <Card className="w-[400px] shadow-none border-darky/20 dark:border-lighty/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            <Logo />
          </CardTitle>
          <CardDescription>Inscrivez-vous a votre compte MyTodo</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-2">
            {/* Full Name */}
            <div className="space-y-1">
              <Label>Nom / Prenom</Label>
              <Input className={inputStyle + !Boolean(user.fullName) && !isCorrect.full_name ? "border-red-500 dark:border-red-400" : ""} type="text" placeholder="John Doe" onChange={(e) => setUser((prev) => ({ ...prev, fullName: e.target.value }))} required />
              {!Boolean(user.fullName) && <p className="text-sm text-red-400">Veuillez indiquer votre nom</p>}
            </div>
            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <Input className={inputStyle + !Boolean(user.email) && !isCorrect.email ? "border-red-500 dark:border-red-400" : ""} type="email" placeholder="john@doe.com" onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} required />
              {!(emailRegex.test(user.email) && Boolean(user.email)) && <p className="text-sm text-red-400">L'email est incorrect</p>}
            </div>
            {/* Password */}
            <div className="space-y-1">
              <Label>Mot de passe</Label>
              <div className="flex items-center">
                <Input
                  className={inputStyle + !Boolean(user.password) && !isCorrect.password ? "border-red-500 dark:border-red-400" : ""}
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
                {showPassword ? <BsEye className="absolute translate-x-80 cursor-pointer w-4 h-4" onClick={() => setShowPassword(false)} /> : <BsEyeSlash className="absolute translate-x-80 cursor-pointer w-4 h-4" onClick={() => setShowPassword(true)} />}
              </div>
              {!(user.password.length >= 8 && user.password.length <= 16) && Boolean(user.password) && <p className="text-sm text-red-400">Le mot doit contenir entre 8 et 16 caracteres</p>}
            </div>
            {/* Confirm Password */}
            <div className="space-y-1">
              <Label>Confirmation mot de passe</Label>
              <div className="flex items-center">
                <Input className={inputStyle + !Boolean(confirmPassword) && !isCorrect.confirm_password ? "border-red-500 dark:border-red-400" : ""} type={showPassword ? "text" : "password"} placeholder="**********" onChange={(e) => setConfirmPassword(e.target.value)} required />
                {showPassword ? <BsEye className="absolute translate-x-80 cursor-pointer w-4 h-4" onClick={() => setShowPassword(false)} /> : <BsEyeSlash className="absolute translate-x-80 cursor-pointer w-4 h-4" onClick={() => setShowPassword(true)} />}
              </div>
              {!(confirmPassword === user.password && Boolean(confirmPassword)) && <p className="text-sm text-red-400">Les mot de passe ne sont pas identiques</p>}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2">
          <Button className="bg-darky text-lighty dark:bg-lighty dark:text-darky" onClick={handleSubmit}>
            S'inscrire
          </Button>
          <NavLink to={"/login"} className={"text-sm underline underline-offset-2"}>
            Je ne suis pas inscris
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
};
