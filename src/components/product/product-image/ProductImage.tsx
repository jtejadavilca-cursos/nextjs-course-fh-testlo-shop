import Image from "next/image";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
    width?: number;
    height?: number;
}

export const ProductImage = ({ src, alt, className, width = 500, height = 500 }: Props) => {
    let localSrc = src ? (src.startsWith("http") ? src : `/products/${src}`) : "/imgs/placeholder.jpg";

    return <Image width={width} height={height} src={localSrc} alt={alt} className={className} />;
};
