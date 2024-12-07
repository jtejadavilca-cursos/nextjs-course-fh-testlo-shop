import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
    // searchParams: {
    //     limit: string;
    // };
}

export default async function CategoryPage({ params }: Props) {
    const { id } = await params;

    if (!["men", "women", "kids"].includes(id)) {
        notFound();
    }

    return (
        <div>
            <h1>Category Page #{id}</h1>
        </div>
    );
}
