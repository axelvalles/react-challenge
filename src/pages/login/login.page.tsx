import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../store/apis/product.api";
import { login, logout, selectAuthInfo } from "../../store/features/auth";

const schema = z.object({
  username: z.string().min(1, "this field is required"),
  password: z.string().min(1, "this field is required"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  // redux
  const authinfo = useAppSelector(selectAuthInfo);
  const [loginMutation, loginContext] = useLoginMutation();
  const dispatch = useAppDispatch();
  // react-form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  // methods
  const onSubmit = async (formdata: FormData) => {
    try {
      console.log(formdata);
      const response = await loginMutation({
        username: formdata.username,
        password: formdata.password,
      }).unwrap();
      console.log(response);
      dispatch(
        login({
          token: response.token,
          username: formdata.username,
        })
      );
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <section className="container mx-auto pt-5 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Login Page</h1>
      </div>

      <div className="max-w-lg w-full mx-auto">
        {authinfo.isAuth && (
          <div>
            <p>¡Hi {authinfo.username}!</p>
            <button
              onClick={() => handleLogout()}
              className="btn btn-primary"
              role="button"
            >
              Logout
            </button>
          </div>
        )}

        {!authinfo.isAuth && (
          <form className="gap-4" onSubmit={handleSubmit(onSubmit)} role="form">
            {/* form control username */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Username</span>
              </label>

              <input
                disabled={loginContext.isLoading}
                {...register("username")}
                type="text"
                className={`input input-bordered input-sm md:input-md w-full ${
                  errors.username ? "input-error" : ""
                }`}
              />

              <label className="label">
                <span role="alert" className="label-text-alt text-error">
                  {errors.username?.message}
                </span>
              </label>
            </div>

            {/* form control password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Password </span>
              </label>
              <input
                disabled={loginContext.isLoading}
                {...register("password")}
                type="password"
                className={`input input-bordered input-sm md:input-md w-full ${
                  errors.password ? "input-error" : ""
                }`}
              />

              <label className="label">
                <span role="alert" className="label-text-alt text-error">
                  {errors.password?.message}
                </span>
              </label>
            </div>

            <button
              disabled={loginContext.isLoading}
              className="btn btn-primary block w-full btn-sm md:btn-md"
              role="button"
              type="submit"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
