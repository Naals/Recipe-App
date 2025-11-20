import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-9xl font-extrabold text-red-500">404</h1>
            <h2 className="mt-4 text-3xl font-semibold text-gray-800">Oops! Page not found</h2>
            <p className="mt-2 text-gray-600 text-center max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}
