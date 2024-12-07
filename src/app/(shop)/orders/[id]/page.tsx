interface Props {
    params: Promise<{ id: string }>;
    // searchParams: {
    //     limit: string;
    // };
}

export default async function OrderIdPage({ params }: Props) {
    const { id } = await params;

    return (
        <div>
            <h1>OrderId Page #{id}</h1>
        </div>
    );
}
