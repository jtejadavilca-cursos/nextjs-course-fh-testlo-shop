import { ProductGrid, TitleComponent } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function ShopPage() {
    //Home
    return (
        <>
            <TitleComponent title="Tienda" subtitle="Todos los productos" />
            <ProductGrid products={products} />
        </>
    );
}
