import { Comments } from "../../types";
import Comment from "./Comment";

interface Types {
  count: number;
  comments: Comments[];
}

const CommentsSection = ({ count, comments }: Types) => {
  return (
    <section className="bg-white py-6 px-9">
      <h2 className="font-bold text-light-accent text-lg pb-7">
        {count} Comments
      </h2>
      {comments &&
        comments.map((c, idx) => (
          <Comment
            className={idx !== 0 ? "border-t-2 pt-4 mt-4" : ""}
            key={c.id}
            commentId={c.id}
            {...c}
          />
        ))}
    </section>
  );
};

export default CommentsSection;
