import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store";
import { z } from "zod";
import { addTodo } from "../../store/features/todo";

const schema = z.object({
  title: z.string().min(1, "this field is required"),
});

type FormData = z.infer<typeof schema>;

const TodoForm = () => {
  // redux
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
  const onSubmit: SubmitHandler<FormData> = (formdata) => {
    dispatch(addTodo(formdata.title));
    reset();
  };

  return (
    <form
      className="md:flex gap-4"
      onSubmit={handleSubmit(onSubmit)}
      role="form"
    >
      <div className="form-control w-full">
        <input
          {...register("title")}
          aria-invalid={errors.title ? "true" : "false"}
          placeholder="Type a new todo"
          type="text"
          role="textbox"
          className={`input input-bordered input-sm md:input-md w-full ${
            errors.title ? "input-error" : ""
          }`}
        />

        <label className="label">
          {errors?.title && (
            <span role="alert" className="label-text-alt text-error">
              {errors.title.message}
            </span>
          )}
        </label>
      </div>

      <button
        className="btn btn-primary block w-full md:inline md:w-fit btn-sm md:btn-md"
        role="button"
        type="submit"
      >
        Agregar tarea
      </button>
    </form>
  );
};

export default TodoForm;
