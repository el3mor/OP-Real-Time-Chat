
import React from "react";

const ConversationFallback = () => {
  return (
    <div className="hidden lg:flex h-full w-full p-2 items-center justify-center  ring-1 ring-inset ring-gray-200 dark:ring-gray-700 rounded-md shadow-lg ">
      Select/start a conversation to get started
    </div>
  );
};

export default ConversationFallback;
