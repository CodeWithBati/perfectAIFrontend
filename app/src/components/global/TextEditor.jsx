import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faListUl, faListOl } from "@fortawesome/free-solid-svg-icons";

const TextEditor = ({ value, onChange, label }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json); // Trigger onChange with updated content
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value); // Update editor content when value changes
    }
  }, [value, editor]);

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  return (
    <div className="p-4 bg-[#2c2c2c] rounded-lg border border-[rgba(255,255,255,0.2)]">
      <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
      <div className="flex items-center mb-2">
        <button onClick={toggleBold} className="mr-2 text-white">
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button onClick={toggleItalic} className="mr-2 text-white">
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button onClick={toggleBulletList} className="mr-2 text-white">
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button onClick={toggleOrderedList} className="text-white">
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
