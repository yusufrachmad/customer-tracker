export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col border-b px-20 h-14 justify-center bg-[#ffffff]">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}
