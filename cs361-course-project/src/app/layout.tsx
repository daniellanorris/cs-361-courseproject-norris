
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "../components/navBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AppProvider } from "../components/appProvider";
import { cookies } from "next/headers";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();

const userCookie = cookieStore.get("user")?.value;

const userId = userCookie
  ? JSON.parse(userCookie).id
  : null;

  const loggedInItems = [
    { name: "Home", href: "/home" },
    { name: "Find a Movie", href: "/findaMovie" },
    { name: "Watched Movies", href: `/watchedMovies/${userId}` },
    { name: "Logout", href: "/welcome" }

  ];

  const notLoggedInItems = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Welcome", href: "/welcome" },

  ]


  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full">

        <AppRouterCacheProvider>

          <AppProvider>

            <NavBar loggedInItems={loggedInItems} notLoggedInItems={notLoggedInItems} />

            <main>
              {children}
            </main>

          </AppProvider>

        </AppRouterCacheProvider>

      </body>

    </html>
  );
}