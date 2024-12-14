export const revalidate = 604800;

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCard } from "./ui/AddToCard";

interface Props {
    params: Promise<{ slug: string }>;
    // searchParams: {
    //     limit: string;
    // };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const { slug } = await params;

    // fetch data
    const product = await getProductBySlug(slug);

    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []

    const title = product?.title ?? "Product not found";
    const description = product?.description ?? "";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            //     images: ['/some-specific-page-image.jpg', ...previousImages],
        },
    };
}

export default async function PrductSlugPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2 max-w-5xl">
                {/* Mobile Slideshow */}
                <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden" />
                {/* Desktop Slideshow */}
                <ProductSlideshow title={product.title} images={product.images} className="hidden md:block" />
            </div>
            {/* Product Details */}
            <div className="col-span-1 px-5 ">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>

                <StockLabel slug={product.slug} />

                <p className="text-lg mb-5">${product.price}</p>

                <AddToCard product={product} />

                {/* Descripción */}
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">{product.description}</p>
            </div>
        </div>
    );
}
