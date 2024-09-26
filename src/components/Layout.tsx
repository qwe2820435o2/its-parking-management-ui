import React, {ReactNode} from 'react';
import Link from "next/link";

type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-grey-800 text-white">
                <div className="p-4 text-xl font-bold">
                    Parking Management
                </div>
                <nav className="mt-6">
                    <Link href="/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link>
                    <Link href="/users" className="block py-2 px-4 hover:bg-gray-700">Users</Link>
                    <Link href="/orders" className="block py-2 px-4 hover:bg-gray-700">Orders</Link>
                    <Link href="/parking-lots" className="block py-2 px-4 hover:bg-gray-700">Parking Lots</Link>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
    );
};

export default Layout;