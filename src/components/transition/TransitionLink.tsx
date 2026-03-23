"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionParams } from "./TransitionProvider";

type TransitionLinkProps = React.ComponentProps<typeof Link>;

export function TransitionLink({ href, children, ...props }: TransitionLinkProps) {
  const { navigateTo } = useTransitionParams();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const destination = href.toString();
    const isExternal = destination.startsWith("http") || destination.startsWith("mailto:");
    const isSamePage = destination === pathname || destination.startsWith("#");
    const isNewTab = props.target === "_blank" || e.ctrlKey || e.metaKey;

    // Do not intercept if external, same page, or opened in new tab
    if (isExternal || isSamePage || isNewTab) {
      if (props.onClick) props.onClick(e);
      return;
    }

    // Intercept standard navigation
    e.preventDefault();
    if (props.onClick) props.onClick(e);
    
    navigateTo(destination);
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
