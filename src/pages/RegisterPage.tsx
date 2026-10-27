import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { registerSchema } from "../schemas/authSchema";
import type { RegisterFormValues } from "../schemas/authSchema";
import { registerUser, loginUser } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const registerMutation = useMutation({
    // Register, then log in with the same credentials to get a token
    mutationFn: async (values: RegisterFormValues) => {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      return loginUser({ email: values.email, password: values.password });
    },
    onSuccess: (data) => {
      login(data.token, data.user.name);
      navigate("/profile");
    },
  });

  const onSubmit = (values: RegisterFormValues): void => {
    registerMutation.mutate(values);
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Register
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name" className="text-foreground">Name</Label>
          <Input
            id="name"
            {...register("name")}
            aria-invalid={errors.name ? true : undefined}
            placeholder="Juan dela Cruz"
            className="dark:text-white"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

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

        <div className="grid gap-1.5">
          <Label htmlFor="confirmPassword" className="text-foreground">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            aria-invalid={errors.confirmPassword ? true : undefined}
            className="dark:text-white"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {registerMutation.isError && (
          <p className="text-sm text-red-700">
            {registerMutation.error.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="justify-self-start"
        >
          {registerMutation.isPending ? "Creating account..." : "Register"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;