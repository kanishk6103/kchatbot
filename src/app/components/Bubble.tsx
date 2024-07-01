import Markdown from "markdown-to-jsx";

export type CoreMessageWithIDandFeedback = {
  id: number;
  role: "user" | "assistant";
  content: string;
  feedback: boolean | null;
};

const Bubble = ({
  message,
  onFeedbackChange,
}: {
  message: CoreMessageWithIDandFeedback;
  onFeedbackChange: (id: number, feedback: boolean) => void;
}) => {
  console.log(message);

  const handleLike = () => {
    // this will call the db function to set feedback, the function will be provided the feedback and ID
    onFeedbackChange(message.id, true);
  };
  const handleDislike = () => {
    onFeedbackChange(message.id, false);
  };

  return (
    <div
      className={`relative flex w-full flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-2xl rounded-xl ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"} w-max px-4 py-3`}
      >
        <div className="flex flex-col gap-1 whitespace-pre-wrap">
          <div className="text-sm font-bold">
            {message.role === "user" ? "User" : "Gemini"}
          </div>
          <div className="text-base font-light">
            <Markdown>{message.content}</Markdown>
          </div>
          {!(message.role === "user") && (
            <div className="mt-3 flex w-full flex-row items-center justify-end gap-2 text-xs">
              {message.feedback === true ? (
                <span className={"rounded-md bg-blue-400 p-1 text-white "}>
                  Liked
                </span>
              ) : message.feedback === false ? (
                //dislike
                <span className={"rounded-md bg-red-400 p-1 text-white "}>
                  Disliked
                </span>
              ) : (
                <>
                  <span
                    className={
                      "cursor-pointer rounded-md bg-blue-400 p-1 text-white "
                    }
                    onClick={handleLike}
                  >
                    {message.feedback ? "Liked" : "Like"}
                  </span>
                  <span
                    className="cursor-pointer rounded-md bg-red-400 p-1 text-white"
                    onClick={handleDislike}
                  >
                    {message.feedback === false ? "Disliked" : "Dislike"}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bubble;
