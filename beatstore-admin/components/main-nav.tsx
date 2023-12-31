"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { HtmlHTMLAttributes } from "react";

export default function MainNav({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      labels: "Início",
      active: pathname === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/billboards`,
      labels: "Avisos",
      active: pathname === `/${params.storeId}/billboards`
    },
    {
      href: `/${params.storeId}/categories`,
      labels: "Categorias",
      active: pathname === `/${params.storeId}/categories`
    },
    {
      href: `/${params.storeId}/settings`,
      labels: "Configuração",
      active: pathname === `/${params.storeId}/settings`
    }
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {
        routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              )}
          >
            {route.labels}
          </Link>
        ))
      }
    </nav>
  );
}
