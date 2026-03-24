import { AuthLayout } from "./AuthLayout";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { Link } from "react-router-dom";
import { TbPokeball } from "react-icons/tb";

export const LoginPage = () => {
    return (
        <AuthLayout
            title={
                <>
                    Login
                    <TbPokeball className="text-zinc-100 text-3xl" />
                </>
            }
        >
            <AuthInput type="text" placeholder="Username" />
            <AuthInput type="password" placeholder="Password" />
            <AuthButton>Login</AuthButton>
            <p className="text-sm text-zinc-400 text-center">Don't have an account? <Link to="/signup" className="text-red-500 cursor-pointer">Sign Up</Link></p>
        </AuthLayout>
    );
};