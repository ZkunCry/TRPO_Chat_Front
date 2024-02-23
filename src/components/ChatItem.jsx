import React from "react";

export const ChatItem = () => {
  return (
    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 dark:border-[#593A8D]">
      <div className="w-full">
        <div className="text-lg font-semibold">Luis1994</div>
        <span className="text-gray-500">Pick me at 9:00 Am</span>
      </div>
    </div>
  );
};
export default ChatItem;
