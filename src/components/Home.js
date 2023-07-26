import Movie from "./Movie";

function Home({ title }) {
  console.log("tititleee", title);
  return (
    <>
      <Movie title={title} />
    </>
  );
}

export default Home;
