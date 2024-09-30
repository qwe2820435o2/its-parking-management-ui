import React, {ReactNode} from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';


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
                <nav className="mt-6 flex flex-col space-y-2">
                    <Link href="/upload" className="block px-4">
                        <Button variant="ghost" className="w-full justify-start">
                            upload
                        </Button>
                    </Link>
                    <Link href="/users" className="block px-4">
                        <Button variant="ghost" className="w-full justify-start">
                            Users
                        </Button>
                    </Link>
                    <Link href="/orders" className="block px-4">
                        <Button variant="ghost" className="w-full justify-start">
                            Orders
                        </Button>
                    </Link>
                    <Link href="/parking-lots" className="block px-4">
                        <Button variant="ghost" className="w-full justify-start">
                            Parking Lots
                        </Button>
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-secondary text-textPrimary">{children}</main>
        </div>
    );
};

export default Layout;