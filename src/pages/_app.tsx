import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // 检查用户是否在受保护页面但没有 token
        if (!token && router.pathname !== '/login') {
            router.push('/login');
        }
    }, [router]);

  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}
