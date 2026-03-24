import { AuthLayout } from "./AuthLayout";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { TbPokeball } from "react-icons/tb";

export const SignUpPage = () => {
    return (
        <AuthLayout
                    title={
                        <>
                            Sign up
                            <TbPokeball className="text-zinc-100 text-3xl" />
                        </>
                    }
                >
            <AuthInput type="text" placeholder="Name" />
            <AuthInput type="email" placeholder="E-mail" />
            <AuthInput type="password" placeholder="Password" />
            <AuthInput type="password" placeholder="Confim password" />
            <AuthButton>Create account</AuthButton>
        </AuthLayout>
    );
};