import React from 'react'
import { IoPerson } from 'react-icons/io5'
import { Link } from '@tanstack/react-router'
import Headroom from 'headroom.js'
import { LuMountain } from 'react-icons/lu'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '~/shared/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/shared/components/ui/avatar'
import './gnb.css'
import { Button } from '../ui/button'
import { useAuth } from '~/shared/hooks/use-auth'

export function GNB() {
  const auth = useAuth().value
  const headerRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const header = headerRef.current
    if (!header) {
      return
    }
    const headroom = new Headroom(header)
    headroom.init()
  }, [])
  return (
    <header className="fixed top-0 w-full pr-[var(--removed-body-scroll-bar-size)]">
      <div
        ref={headerRef}
        className="flex h-[var(--gnb-h)] w-full shrink-0 items-center px-4 pr-[var(--fix-scrollbar-size)] md:px-6"
      >
        <Link to="/" className="text-8 mr-6 flex items-center">
          <LuMountain className="h-auto w-8" />
          <span className="sr-only">fullstack-challenge-template-vite</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Home
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  About
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Services
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  to="/account"
                  className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  account
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
          {auth?.accessToken ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="focus:outline-none">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      <IoPerson />
                    </AvatarFallback>
                    <span className="sr-only">Toggle user menu</span>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/" className="flex items-center gap-2">
                    <div className="h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/" className="flex items-center gap-2">
                    <div className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/signout" className="flex items-center gap-2">
                    <div className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/signin">로그인</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
