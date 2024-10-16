import React, {ReactNode, useEffect, useState} from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import {useRouter} from "next/router";


type LayoutProps = {
    children: ReactNode
}


const Layout = ({children}: LayoutProps) => {
    const router = useRouter();

    // 检查当前路由是否为 '/login'
    const isLoginPage = router.pathname === '/login';

    const [user, setUser] = useState<{ name: string, avatarUrl: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('user');
        if (token && userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <div className="flex h-screen">
            {/* 如果不是登录页面，显示侧边栏 */}
            {!isLoginPage && (
                <aside className="w-64 bg-primary text-lightText shadow-lg">
                    <div className="p-4 text-xl font-bold border-b border-gray-200">
                        Parking Management
                    </div>
                    <nav className="mt-6 flex flex-col space-y-2">
                        <Link href="/camara" className="block px-4">
                            <Button variant="ghost" className="w-full justify-start">
                                Camara
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
            )}
            <main className="flex-1 p-6 bg-secondary text-textPrimary">
                {/* User info in top right corner */}
                {!isLoginPage && user && (
                    <div className="flex justify-end items-center space-x-4 mb-4">
                        <img src={user.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full"/>
                        <span>{user.name}</span>
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                )}

                {/* The children content will be pushed down */}
                <div className="mt-2">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;