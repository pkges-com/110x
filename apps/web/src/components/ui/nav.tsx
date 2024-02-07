import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    variant?: 'default' | 'ghost';
    path: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      style={{
        gridArea: 'sidebar',
      }}
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4"
    >
      <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 min-w-44 group-[[data-collapsed=true]]:hidden">
        {links.map((link, index) => {
          const variant = link.variant || 'ghost';

          return isCollapsed ? (
            <TooltipProvider>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={link.path}
                    className={cn(
                      buttonVariants({ variant, size: 'icon' }),
                      'h-9 w-9',
                      variant === 'default' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                    )}
                  >
                    {/* Icon */}
                    <link.icon className="h-4 w-4" />

                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              to={link.path}
              className={cn(
                buttonVariants({ variant, size: 'sm' }),
                variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    'ml-auto',
                    variant === 'default' && 'text-background dark:text-white'
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
