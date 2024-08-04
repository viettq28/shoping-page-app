
const ChatInterface = ({ messages }) => {
  return (
    <div
      className="m-0 flex flex-col-reverse gap-3 basis-10/12 overflow-y-scroll [&_.mess]:w-fit [&_.mess]:rounded-sm [&_.mess]:px-3 [&_.mess]:py-3"
    >
      {messages.map((message, i) => {
        const sender = message[0].split('-');
        if (sender[0] === 'u') {
          return (
            <div key={i} className="mess ml-auto bg-[#48B0F7] text-zinc-100">
              {`You: ${message[1]}`}
            </div>
          );
        }
        return (
          <div key={i} className="flex gap-2">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatr"
              className="h-fit max-h-[2rem] w-[10%] max-w-[2rem] rounded-full"
            />
            <div className="mess h-fit bg-zinc-100 text-zinc-400">
              {sender[0] === 'admin'
                ? `Admin: ${message[1]}`
                : `Client: ${message[1]}`}
            </div>
          </div>
        );
      }).reverse()}
    </div>
  );
};
export default ChatInterface;
