// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const result = await streamText({
//     model: google("models/gemini-pro"),
//     messages,
//   });

//   return result.toAIStreamResponse();
// }

// async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
//   // console.log(text);
//   // console.log(toolCalls);
//   // console.log(finishReason);
//   // console.log(toolResults);
//   // console.log(usage);
//   //   await saveChat({ text, toolCalls, toolResults });
// },

// stream additional data

// const data = new StreamData();

// data.append({ test: "value" });

// const stream = result.toAIStream({
//   onFinal(_) {
//     data.close();
//   },
// });

// return new StreamingTextResponse(stream, {}, data);
