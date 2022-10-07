import { AnimatedPage, SafeArea } from "@components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  linkTo: string;
}

const Card = ({ title, description, linkTo }: CardProps) => {
  const formatedDescription =
    description.length > 120
      ? description.substring(0, 120) + "..."
      : description;

  return (
    <Link
      to={linkTo}
      className="w-full border border-stone-600 p-5 rounded-xl text-white cursor-pointer duration-300 active:border-sky-400 md:hover:border-sky-400"
    >
      <h2 className="text-2xl mb-2">{title}</h2>
      <p className="text-md text-stone-400 font-light">{formatedDescription}</p>
    </Link>
  );
};

const Dashboard = () => {
  const posts = [
    {
      id: "1",
      title: "Movies",
      description:
        "Search for all movies from one of the most famous movie franchises",
      linkTo: "/movies",
    },
  ];

  useEffect(() => {
    document.title = "Dashboard - Star Wars";
  }, []);

  return (
    <AnimatedPage>
      <SafeArea className="max-w-[400px] min-h-screen flex flex-col gap-5 justify-center items-center">
        <h1 className="text-white text-3xl font-medium mb-10">
          Make your choice
        </h1>

        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            description={post.description}
            linkTo={post.linkTo}
          />
        ))}
      </SafeArea>
    </AnimatedPage>
  );
};

export default Dashboard;
