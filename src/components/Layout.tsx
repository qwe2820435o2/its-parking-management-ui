import React, {ReactNode} from 'react';

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
                    <a href="/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</a>
                    <a href="/users" className="block py-2 px-4 hover:bg-gray-700">Users</a>
                    <a href="/orders" className="block py-2 px-4 hover:bg-gray-700">Orders</a>
                    <a href="/parking-lots" className="block py-2 px-4 hover:bg-gray-700">Parking Lots</a>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
    );
};

export default Layout;