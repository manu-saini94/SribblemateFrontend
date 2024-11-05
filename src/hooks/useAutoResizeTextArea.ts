import { useLayoutEffect, useRef } from "react";

const useAutoResizeTextArea = (
  handleChange: (arg0: { target: any }) => void
) => {
  const textareaRef = useRef(null);

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      adjustTextareaHeight(textarea);
    }
  }, []); // Empty dependency array to run once after initial render

  const handleContentChange = (event: { target: any }) => {
    const textarea = event.target;
    adjustTextareaHeight(textarea);
    handleChange(event);
  };

  return { textareaRef, handleContentChange };
};

export default useAutoResizeTextArea;
