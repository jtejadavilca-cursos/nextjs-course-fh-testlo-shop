interface Props {
    params: Promise<{ slug: string }>;
    // searchParams: {
    //     limit: string;
    // };
}

export default async function PrductSlugPage({ params }: Props) {
    const { slug } = await params;
    return (
        <div>
            <h1>PrductSlug Page {slug}</h1>
        </div>
    );
}
