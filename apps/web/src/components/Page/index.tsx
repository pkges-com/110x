interface PageProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Page({ ...props }: PageProps) {
  return (
    <div style={{ gridArea: 'main' }} className="px-6" {...props}>
      {props.children}
    </div>
  );
}
