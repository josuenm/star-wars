import { SafeArea } from "@components";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  paths: string[];
  backTo: string;
}

export const Header = ({ paths, backTo }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed backdrop-blur w-full border-b border-stone-700 py-5">
      <SafeArea className="flex text-white">
        <button
          className="active:border-sky-400 md:hover:border-sky-400 active:underline md:hover:underline"
          onClick={() => navigate(backTo)}
        >
          Back
        </button>

        <div className="w-fit mx-auto">
          {paths.map((item) => (
            <span key={item}>
              /
              <Link
                to={"/" + item}
                className="active:border-sky-400 md:hover:text-sky-400 active:underline md:hover:underline"
              >
                {item}
              </Link>
            </span>
          ))}
        </div>
      </SafeArea>
    </header>
  );
};
