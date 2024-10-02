import { useState } from "react";
import Label from "./Label";
import Input from "./Input";

const CustomTagsInput = ({ tags, setTags, disabled, className }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeTag = (indexToRemove) => {
    if(disabled) return
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full lg:w-1/2 px-3">
      <div className="py-2">
        <Label htmlFor="directoryTags" className="mb-2 flex items-end">
          Tags
          <span className="text-gray-400 italic text-xs ml-2">
            (Press Enter to add tags)
          </span>
        </Label>

        <div className="flex flex-wrap items-center">
          <Input
            className={`flex-1 w-full ${className}`}
            placeholder="Add a tag"
            id="directoryTags"
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            value={inputValue}
            disabled={disabled}
          />
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-slate-200 dark:bg-slate-700 text-black dark:text-white flex items-center gap-5 justify-between text-sm rounded mt-2 mr-1 p-2 "
            >
              {tag}
              <button
                onClick={() => removeTag(index)}
                className="text-slate-500 dark:text-slate-900"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTagsInput;
