interface Props {
    className?: string;
}
export const HSeparator = ({ className }: Props) => {
    return <div className={`w-full h-px bg-gray-200 ${className}`}></div>;
};
