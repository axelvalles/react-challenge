import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateProductMutation,
  useGetAllCategoriesQuery,
  useUpdateProductMutation,
} from "../../../store/apis/product.api";
import { Product } from "../../../models";

interface Props {
  show: boolean;
  onClose: () => void;
  currentProduct: Product | null;
  onUpdate: () => void;
}

const schema = z.object({
  title: z.string().min(1, "this field is required"),
  price: z.number().positive("only positive values"),
  description: z.string().min(1, "this field is required"),
  image: z.string().url("invalid image url"),
  category: z.string().min(1, "this field is required"),
});

type FormData = z.infer<typeof schema>;

const ProductModal: FC<Props> = ({
  onClose,
  show,
  currentProduct,
  onUpdate,
}) => {
  // redux
  const categories = useGetAllCategoriesQuery();
  const [createProduct, createProductContext] = useCreateProductMutation();
  const [updateProduct, updateProductContext] = useUpdateProductMutation();
  // hooks
  const modalRef = useRef<HTMLDialogElement>(null);
  // react-form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    },
  });
  // methods
  const onSubmit = async (formdata: FormData) => {
    if (currentProduct) {
      handleUpdate(formdata);
    } else {
      handleCreate(formdata);
    }
  };

  const handleCreate = async (formdata: FormData) => {
    try {
      const response = await createProduct({
        title: formdata.title,
        category: formdata.category,
        description: formdata.description,
        image: formdata.image,
        price: formdata.price,
      }).unwrap();
      console.log(response);
      alert("Product created");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (formdata: FormData) => {
    try {
      const response = await updateProduct({
        id: currentProduct!.id,
        title: formdata.title,
        category: formdata.category,
        description: formdata.description,
        image: formdata.image,
        price: formdata.price,
      }).unwrap();
      console.log(response);
      onUpdate();
      alert("Product updated");
      reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  // effects
  useEffect(() => {
    if (!modalRef.current) return;

    if (show) {
      modalRef.current.showModal();
    } else {
      reset();
      clearErrors();
      modalRef.current.close();
    }
  }, [show]);

  useEffect(() => {
    console.log(currentProduct);

    if (currentProduct) {
      setValue("category", currentProduct.category);
      setValue("title", currentProduct.title);
      setValue("price", currentProduct.price);
      setValue("description", currentProduct.description);
      setValue("image", currentProduct.image);
    } else {
      setValue("category", "");
      setValue("title", "");
      setValue("price", 0);
      setValue("description", "");
      setValue("image", "");
    }
  }, [show, currentProduct]);

  useEffect(() => {
    if (!modalRef.current) return;

    modalRef.current.addEventListener("close", () => {
      reset();
      clearErrors();
      onClose();
    });

    return () => {
      modalRef?.current?.removeEventListener("close", () => {});
    };
  }, [modalRef.current]);

  return (
    <dialog ref={modalRef} className="modal">
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
        <button
          disabled={
            createProductContext.isLoading || updateProductContext.isLoading
          }
          onClick={() => onClose()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">
          {currentProduct ? "Update product" : "Create product"}
        </h3>
        <div>
          {/* form control title */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Title</span>
            </label>
            <input
              disabled={
                createProductContext.isLoading || updateProductContext.isLoading
              }
              {...register("title")}
              type="text"
              placeholder="type a title"
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.title?.message}
              </span>
            </label>
          </div>
          {/* form control price */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Price</span>
            </label>
            <input
              disabled={
                createProductContext.isLoading || updateProductContext.isLoading
              }
              {...register("price", {
                setValueAs: (v) => parseInt(v),
              })}
              defaultValue={0}
              type="number"
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.price?.message}
              </span>
            </label>
          </div>
          {/* form control description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              {...register("description")}
              disabled={
                createProductContext.isLoading || updateProductContext.isLoading
              }
              cols={4}
              className="textarea textarea-bordered"
              placeholder="Description..."
            ></textarea>
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.description?.message}
              </span>
            </label>
          </div>
          {/* form control image */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Image url</span>
            </label>
            <input
              disabled={
                createProductContext.isLoading || updateProductContext.isLoading
              }
              {...register("image")}
              type="url"
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.image?.message}
              </span>
            </label>
          </div>
          {/* form control category */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Category</span>
            </label>
            <select
              {...register("category")}
              disabled={
                createProductContext.isLoading || updateProductContext.isLoading
              }
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select...
              </option>
              {categories.isSuccess &&
                categories.data.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
            </select>
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.category?.message}
              </span>
            </label>
          </div>
        </div>
        <div className="modal-action">
          <button
            disabled={
              createProductContext.isLoading || updateProductContext.isLoading
            }
            type="submit"
            className="btn btn-neutral btn-outline"
          >
            {(createProductContext.isLoading ||
              updateProductContext.isLoading) && (
              <span className="loading loading-spinner"></span>
            )}
            {currentProduct ? "Update" : "Create"}
          </button>
          <button
            onClick={() => onClose()}
            disabled={
              createProductContext.isLoading || updateProductContext.isLoading
            }
            type="button"
            className="btn btn-neutral"
          >
            {(createProductContext.isLoading ||
              updateProductContext.isLoading) && (
              <span className="loading loading-spinner"></span>
            )}
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ProductModal;
