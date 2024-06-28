import { CoreMessage } from "ai";

const Bubble = ({ message }: { message: CoreMessage }) => {
  console.log(message.content);
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
            {message.content as string}
          </div>
          {!(message.role === "user") && (
            <div className="flex w-full flex-row items-center justify-end gap-2">
              <span className="cursor-pointer rounded-md bg-blue-400 p-1 text-white">
                Like
              </span>
              <span className="cursor-pointer rounded-md bg-red-400 p-1 text-white">
                Dislike
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bubble;
