import { AuthLayout } from "./AuthLayout";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";

export const SignUpPage = () => {
	return (
		<AuthLayout title={"Sign up"}>
			<AuthInput type="text" placeholder="Name" />
			<AuthInput type="email" placeholder="E-mail" />
			<AuthInput type="password" placeholder="Password" />
			<AuthInput type="password" placeholder="Confim password" />
			<AuthButton>Create account</AuthButton>
		</AuthLayout>
	);
};