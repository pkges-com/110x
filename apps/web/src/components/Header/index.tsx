import { useNavStore } from '@/stores/nav';

export default function Header() {
  const nav = useNavStore((state) => state.nav);

  return (
    <div
      style={{ gridArea: 'header' }}
      className="flex flex-col min-h-16 items-center"
    >
      <h1 className="m-0 text-2xl font-bold self-start">
        110x 🚀 - {nav?.title ?? ' Welcome'}
      </h1>
      <div className="w-full py-6">
        <div className="w-full h-[1px] bg-slate-100" />
      </div>
    </div>
  );
}
