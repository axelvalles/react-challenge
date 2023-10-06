import { FC } from "react";
import { Product } from "../../../models";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../store/apis/product.api";

interface Props {
  onUpdate: (product: Product) => void;
}

const ProductsList: FC<Props> = ({ onUpdate }) => {
  // redux
  const products = useGetAllProductsQuery();
  const [deleteProduct, deleteProductContext] = useDeleteProductMutation();
  // methods
  const handleDelete = async (product: Product) => {
    try {
      const responseConfirm = confirm(
        "Are you sure you want to delete the product?"
      );

      if (!responseConfirm) return;

      const response = await deleteProduct(product.id).unwrap();
      console.log(response);
      alert("Product deleted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.isLoading && (
            <tr>
              <td colSpan={6}>
                <span className="loading loading-spinner loading-lg mx-auto block"></span>
              </td>
            </tr>
          )}

          {products.isSuccess &&
            products.data.map((product) => (
              <tr key={product.id}>
                <th>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={product.image} alt={product.title} />
                    </div>
                  </div>
                </th>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onUpdate(product)}
                    disabled={deleteProductContext.isLoading}
                    className="btn btn-circle btn-outline btn-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    disabled={deleteProductContext.isLoading}
                    onClick={() => handleDelete(product)}
                    className="btn btn-circle btn-outline btn-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
