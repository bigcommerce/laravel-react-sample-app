import { Link } from '@inertiajs/react';

export default function Navigation() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <ul className="flex">
                    <li className="mr-6">
                        <Link className="text-white hover:text-blue-800" href="/">Home</Link>
                    </li>
                    <li className="mr-6">
                        <Link className="text-white hover:text-blue-800" href="/list">List</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
