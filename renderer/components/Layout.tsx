import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/settings" className="nav-link">
          Settings
        </Link>
      </nav>
    </header>
    <main>
      {children}
    </main>

    <style jsx>{`
      header {
        background-color: #f8f9fa;
        padding: 1rem;
        border-bottom: 1px solid #dee2e6;
      }

      nav {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        gap: 20px;
      }

      .nav-link {
        color: #495057;
        text-decoration: none;
        font-size: 16px;
        transition: color 0.2s;
      }

      .nav-link:hover {
        color: #228be6;
      }

      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
    `}</style>
  </div>
);

export default Layout;
