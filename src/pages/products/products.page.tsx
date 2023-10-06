import { useState } from "react";
import ProductModal from "./components/product-modal";
import ProductsList from "./components/products-list";
import { Product } from "../../models";

const ProductsPage = () => {
  // states
  const [modalshow, setModalshow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  // methods
  const handleClose = () => {
    setCurrentProduct(null);
    setModalshow(false);
  };
  const handleOpen = () => {
    setCurrentProduct(null);
    setModalshow(true);
  };
  const handleUpdate = (product: Product | null) => {
    setCurrentProduct(product);
    setModalshow(true);
  };
  return (
    <section className="container mx-auto pt-5 px-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Products Page</h1>
        <button onClick={() => handleOpen()} className="btn btn-primary">
          Create Product
        </button>
      </div>

      <ProductsList
        onUpdate={(product) => handleUpdate(product)}
      ></ProductsList>
      <ProductModal
        onUpdate={() => setCurrentProduct(null)}
        currentProduct={currentProduct}
        show={modalshow}
        onClose={() => handleClose()}
      ></ProductModal>
    </section>
  );
};

export default ProductsPage;
