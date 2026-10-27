import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { loginSchema } from "../schemas/authSchema";
import type { LoginFormValues } from "../schemas/authSchema";
import { loginUser } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // The token now comes from the server, not from us
      login(data.token, data.user.name);
      navigate("/profile");
    },
  });

  const onSubmit = (values: LoginFormValues): void => {
    loginMutation.mutate(values);
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={errors.email ? true : undefined}
            placeholder="you@example.com"
            className="dark:text-white"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password" className="text-foreground">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={errors.password ? true : undefined}
            className="dark:text-white"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {loginMutation.isError && (
          <p className="text-sm text-red-700">{loginMutation.error.message}</p>
        )}

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="justify-self-start"
        >
          {loginMutation.isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        No account yet?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;