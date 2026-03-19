import CardPost from "../CardPost/CardPost";
import CardPublication from "../CardPublication/CardPublication";

function Feed() {
  return(
    <main className="flex-1 overflow-y-auto scrollbar-hide py-9 mx-auto w-full max-w-2xl flex flex-col gap-8">
      <CardPublication />
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
    </main>
  );
}

export default Feed;