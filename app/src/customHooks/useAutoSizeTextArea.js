import { useEffect } from "react";

const useAutosizeTextArea = (textAreaRef, value) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      const lineHeight = 20;
      const maxLines = 6;
      const maxHeight = lineHeight * maxLines;

      textAreaRef.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textAreaRef.style.overflow = scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;