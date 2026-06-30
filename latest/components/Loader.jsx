import { useLoading } from "../src/context/LoadingContext";

export default function Loader() {

    const { loading } = useLoading;

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded">
                Loading...
            </div>
        </div>
    );
}