import React, {ReactNode} from 'react';
import Link from "next/link";

type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-primary text-lightText shadow-lg">
                <div className="p-4 text-xl font-bold border-b border-gray-200">
                    Parking Management
                </div>
                <nav className="mt-6">
                    <Link href="/dashboard" className="block py-2 px-4 hover:bg-accent">Dashboard</Link>
                    <Link href="/users" className="block py-2 px-4 hover:bg-accent">Users</Link>
                    <Link href="/orders" className="block py-2 px-4 hover:bg-accent">Orders</Link>
                    <Link href="/parking-lots" className="block py-2 px-4 hover:bg-accent">Parking Lots</Link>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-secondary text-textPrimary">{children}</main>
        </div>
    );
};

export default Layout;