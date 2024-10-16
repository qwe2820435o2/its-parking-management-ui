import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomToast from '@/components/CustomToast';
import AuthService from "@/services/authService";
import {useRouter} from "next/router";

const Login = () => {
    // 使用 useState 管理表单的状态
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault();  // 阻止表单的默认提交行为
            // 确保 username 和 password 已经从状态中正确获取
            const response = await AuthService.login({ username, password });
            // 登录成功后可以做其他处理
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({
                name: response.username,    // Assuming the API returns user info
                role: response.role,   // Example avatar URL
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzbzantcH6yH8LAz0ykNZR9jWfTpYU-9OTg&s'   // Example avatar URL
            }));

            console.log('response',response)
            setToastMessage('Login successfully!');
            // 登录成功后跳转到首页
            router.push('/');  // 跳转到首页
        } catch (err) {
            console.error('Failed to login',err);
            setToastMessage('Login error!');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block mb-2">Username</label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" variant="default" className="bg-primary text-white px-4 py-2">
                    Login
                </Button>
            </form>
            {toastMessage && <CustomToast message={toastMessage} onClose={() => setToastMessage('')}/>}
        </div>
    );
};

export default Login;
