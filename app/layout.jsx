import Nav from "./(components)/Nav";
import NavMobile from "./(components)/Nav";
import "./globals.css";
import { Inter } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MultiSport",
  description: "Multisport website, Generated by Stephen Shea",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div className="flex flex-col h-screen max-h-screen">
            <div className="hidden md:block  bg-nav text-white">
              <Nav />
            </div>
            <div className="overflow-y-auto bg-page text-default-text h-full w-full">
              {children}
            </div>
            <div className="fixed md:hidden bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <NavMobile />
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;