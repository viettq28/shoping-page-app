import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceSmile,
  faPaperclip,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

const ChatInput = ({ handleSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendWhenEnter = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputMessage, setInputMessage);
    }
  };

  return (
    <div className="flex basis-2/12 items-center gap-2 bg-zinc-100">
      {/* Avatar */}
      <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="avatr"
        className="h-fit max-h-[2rem] w-[10%] max-w-[2rem] rounded-full object-cover"
      />
      {/* Phần nhập liệu */}
      <input
        type="text"
        className="h-fit w-4/6 rounded-sm bg-white px-3 py-1 text-zinc-400 focus:outline-zinc-500"
        placeholder="Enter Messages!"
        value={inputMessage}
        onChange={handleChange}
        onKeyDown={handleSendWhenEnter}
      />
      {/* Các icon */}
      <div className="ml-3 space-x-2 [&>*]:text-[#a1a1aa] hover:[&>*]:text-[#48B0F7]">
        <FontAwesomeIcon icon={faFaceSmile} />
        <FontAwesomeIcon icon={faPaperclip} />
        <FontAwesomeIcon
          icon={faPaperPlane}
          onClick={handleSendMessage.bind(null, inputMessage, setInputMessage)}
        />
      </div>
    </div>
  );
};
export default ChatInput;
