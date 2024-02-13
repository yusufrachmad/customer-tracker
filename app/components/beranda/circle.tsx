"use client";
import { useRouter } from "next/navigation";

export default function Circle({
  title,
  icon,
  colors,
}: {
  title: string;
  icon: React.ReactNode;
  colors: string[];
}) {
  const router = useRouter();
  const handleClick = (text: string) => {
    router.push(`/${text.toLowerCase()}`);
  };

  const style1 = `flex border rounded-full justify-center bg-${colors[0]} shadow-2xl hover:cursor-pointer hover:${colors[1]}`;
  const style2 = `flex justify-center items-center w-24 h-24 bg-${colors[2]} rounded-xl m-11`;
  return (
    <div className="col-span-1">
      <div className={style1} onClick={() => handleClick(title)}>
        <div className={style2}>{icon}</div>
      </div>
      <div className="flex justify-center mt-10 font-bold">{title}</div>
    </div>
  );
}
