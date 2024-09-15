// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useClerk, useUser } from "@clerk/nextjs";
// import {
//   LogOutIcon,
//   MenuIcon,
//   LayoutDashboardIcon,
//   Share2Icon,
//   UploadIcon,
//   ImageIcon,
//   ImagesIcon,
//   ImagePlusIcon,
//   HomeIcon,
//   Crop,
// } from "lucide-react";


// const sidebarItems = [
//   { href: "/home", icon: HomeIcon, label: "Home Page" },
//   { href: "/social-share", icon: Crop, label: "Image Transform" },
//   { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
// ];

// export default function AppLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { signOut } = useClerk();
//   const { user } = useUser();

//   const handleLogoClick = () => {
//     router.push("/home");
//   };

//   const handleSignOut = async () => {
//     await signOut();
//     router.push("/home")
//   };

//   return (
//     <>
//     <div className="drawer lg:drawer-open">
//       <input
//         id="sidebar-drawer"
//         type="checkbox"
//         className="drawer-toggle"
//         checked={sidebarOpen}
//         onChange={() => setSidebarOpen(!sidebarOpen)}
//       />
//       <div className="drawer-content flex flex-col">
//         {/* Navbar */}
//         <header className="w-full bg-base-200">
//           <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex-none lg:hidden">
//               <label
//                 htmlFor="sidebar-drawer"
//                 className="btn btn-square btn-ghost drawer-button"
//               >
//                 <MenuIcon />
//               </label>
//             </div>
//             <div className="flex-1">
//               <Link href="/home" onClick={handleLogoClick}>
//                 <div className="btn btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer">
//                 CloudifyMedia
//                 </div>
//               </Link>
//             </div>
            // <div className="flex-none flex items-center space-x-4">
            //   {user && (
            //     <>
            //       <div className="avatar">
            //         <div className="w-8 h-8 rounded-full">
            //           <img
            //             src={user.imageUrl}
            //             alt={
            //               user.username || user.emailAddresses[0].emailAddress
            //             }
            //           />
            //         </div>
            //       </div>
            //       <span className="text-sm truncate max-w-xs lg:max-w-md">
            //         {user.username || user.emailAddresses[0].emailAddress}
            //       </span>
            //       <button
            //         onClick={handleSignOut} 
            //         className="btn btn-ghost btn-circle"
            //       >
            //         <LogOutIcon className="h-6 w-6" />
            //       </button>
            //     </>
            //   )}
            // </div>
//           </div>
//         </header>
//         {/* Page content */}
//         <main className="flex-grow">
//           <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
//             {children}
//           </div>
//         </main>
//       </div>
//       <div className="drawer-side">
//         <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
//         <aside className="bg-base-200 w-64 h-full flex flex-col">
//           <div className="flex items-center justify-center py-4">
//             <ImagePlusIcon className="w-10 h-10 text-primary" />
//           </div>
//           <ul className="menu p-4 w-full text-base-content flex-grow">
//             {sidebarItems.map((item) => (
//               <li key={item.href} className="mb-2">
//                 <Link
//                   href={item.href}
//                   className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
//                     pathname === item.href
//                       ? "bg-primary text-white"
//                       : "hover:bg-base-300"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <item.icon className="w-6 h-6" />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           {user && (
//             <div className="p-4">
//               <button
//                 onClick={handleSignOut}
//                 className="btn btn-outline btn-error w-full"
//               >
//                 <LogOutIcon className="mr-2 h-5 w-5" />
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </aside>
//       </div>
//     </div>

// <footer className="footer footer-center bg-base-300 text-base-content p-4">
// <aside>
//   <p>Copyright © {new Date().getFullYear()} - All right reserved by CloudifyMedia</p>
// </aside>
// </footer>
// </>
//   );
// }

// 'use client'

// import React, { useState, useEffect } from "react"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import {
//   LogOut,
//   Menu,
//   Home,
//   Crop,
//   Upload,
//   ImagePlus,
//   Moon,
//   Sun,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// const sidebarItems = [
//   { href: "/home", icon: Home, label: "Home Page" },
//   { href: "/social-share", icon: Crop, label: "Image Transform" },
//   { href: "/video-upload", icon: Upload, label: "Video Upload" },
// ]

// interface User {
//   name: string
//   email: string
//   imageUrl: string
// }

// const placeholderUser: User = {
//   name: "John Doe",
//   email: "john@example.com",
//   imageUrl: "/placeholder.svg?height=32&width=32"
// }

// export default function Component({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const pathname = usePathname()
//   const router = useRouter()
//   const [user, setUser] = useState<User | null>(placeholderUser)
//   const [theme, setTheme] = useState<'light' | 'dark'>('light')

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
//     if (savedTheme) {
//       setTheme(savedTheme)
//     } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       setTheme('dark')
//     }
//   }, [])

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', theme === 'dark')
//     localStorage.setItem('theme', theme)
//   }, [theme])

//   const toggleTheme = () => {
//     setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
//   }

//   const handleLogoClick = () => {
//     router.push("/home")
//   }

//   const handleSignOut = () => {
//     setUser(null)
//     router.push("/home")
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky flex justify-evenly top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-14 items-center justify-between">
//           <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">Toggle sidebar</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-64 p-0">
//               <SheetHeader className="border-b p-4">
//                 <SheetTitle>CloudifyMedia</SheetTitle>
//               </SheetHeader>
//               <nav className="flex flex-col gap-2 p-4">
//                 {sidebarItems.map((item) => (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
//                       pathname === item.href
//                         ? "bg-secondary text-secondary-foreground"
//                         : "hover:bg-secondary/50"
//                     }`}
//                     onClick={() => setSidebarOpen(false)}
//                   >
//                     <item.icon className="h-4 w-4" />
//                     {item.label}
//                   </Link>
//                 ))}
//               </nav>
//             </SheetContent>
//           </Sheet>
          
//           <Link
//             href="/home"
//             onClick={handleLogoClick}
//             className="mr-6 flex items-center space-x-2"
//           >
//             <ImagePlus className="h-6 w-6" />
//             <span className="hidden text-2xl font-bold sm:inline-block">
//               CloudifyMedia
//             </span>
//           </Link>
          
//           <nav className="flex-1 hidden lg:flex justify-center">
//             <ul className="flex gap-6">
//               {sidebarItems.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className={`flex items-center gap-2 text-sm font-medium ${
//                       pathname === item.href
//                         ? "text-foreground"
//                         : "text-foreground/60 hover:text-foreground"
//                     }`}
//                   >
//                     <item.icon className="h-4 w-4" />
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
          
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon" onClick={toggleTheme}>
//               {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
//             </Button>
//             {user && (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="relative h-8 w-8 rounded-full"
//                   >
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage src={user.imageUrl} alt={user.name} />
//                       <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56" align="end" forceMount>
//                   <DropdownMenuLabel className="font-normal">
//                     <div className="flex flex-col space-y-1">
//                       <p className="text-sm font-medium leading-none">
//                         {user.name}
//                       </p>
//                       <p className="text-xs leading-none text-muted-foreground">
//                         {user.email}
//                       </p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={handleSignOut}>
//                     <LogOut className="mr-2 h-4 w-4" />
//                     <span>Log out</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}
//           </div>
//         </div>
//       </header>
  
//       <main className="flex-1 flex items-center justify-center">
//         <div className="container my-8">
//           {children}
//         </div>
//       </main>
  
//       <footer className="border-t py-6 md:py-0">
//         <div className="container flex flex-col items-center justify-center md:h-24 md:flex-row">
//           <p className="text-center text-sm leading-loose text-muted-foreground">
//             Copyright © {new Date().getFullYear()} CloudifyMedia. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   )
// }

'use client'

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"
import {
  LogOut,
  Menu,
  Home,
  Crop,
  Upload,
  ImagePlus,
  Moon,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sidebarItems = [
  { href: "/home", icon: Home, label: "Home Page" },
  { href: "/social-share", icon: Crop, label: "Image Transform" },
  { href: "/video-upload", icon: Upload, label: "Video Upload" },
]

export default function Component({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const { signOut } = useClerk()
  const { user, isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const handleLogoClick = () => {
    router.push("/home")
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/home")
  }

  const handleSignIn = () => {
    router.push("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky flex justify-evenly top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle>CloudifyMedia</SheetTitle>
              </SheetHeader>
              {isLoaded && isSignedIn && user && (
                <div className="flex items-center space-x-4 p-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} alt={user.username || user.primaryEmailAddress?.emailAddress || 'User'} />
                    <AvatarFallback>{user.username?.[0] || user.primaryEmailAddress?.emailAddress?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm truncate max-w-[150px]">
                    {user.username || user.primaryEmailAddress?.emailAddress || 'User'}
                  </span>
                </div>
              )}
              <nav className="flex flex-col gap-2 p-4">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                      pathname === item.href
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-secondary/50"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link
            href="/home"
            onClick={handleLogoClick}
            className="mr-6 flex items-center space-x-2"
          >
            {/* <ImagePlus className="h-6 w-6" /> */}
            <span className="hidden text-2xl font-bold sm:inline-block">
              CloudifyMedia
            </span>
          </Link>
          
          <nav className="flex-1 hidden lg:flex justify-center">
            <ul className="flex gap-6">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 text-sm font-medium ${
                      pathname === item.href
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            {isLoaded && isSignedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.imageUrl} alt={user.username || user.primaryEmailAddress?.emailAddress || 'User'} />
                      <AvatarFallback>{user.username?.[0] || user.primaryEmailAddress?.emailAddress?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.username || user.primaryEmailAddress?.emailAddress || 'User'}
                      </p>
                      {user.primaryEmailAddress && (
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.primaryEmailAddress.emailAddress}
                        </p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleSignIn}>Sign In</Button>
            )}
          </div>
        </div>
      </header>
  
      <main className="flex-1 flex items-center justify-center">
        <div className="container my-8">
          {children}
        </div>
      </main>
  
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Copyright © {new Date().getFullYear()} CloudifyMedia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}