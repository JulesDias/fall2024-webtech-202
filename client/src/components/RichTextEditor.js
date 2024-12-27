import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import { useDarkMode } from './DarkmodeContext';

const RichTextEditor = ({ content, setContent }) => {
  const { isDarkMode } = useDarkMode();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html); // Sync content with parent state
    },
  });

  if (!editor) return null;

  return (
    <div
      className={`w-full border rounded-lg p-4 ${
        isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-black'
      }`}
    >
      {/* Toolbar */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('bold')
              ? 'bg-blue-500 text-black font-bold'
              : 'bg-gray-300 text-black'
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('italic')
              ? 'bg-blue-500 text-black font-bold'
              : 'bg-gray-300 text-black'
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('underline')
              ? 'bg-blue-500 text-black font-bold'
              : 'bg-gray-300 text-black'
          }`}
        >
          Underline
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('strike')
              ? 'bg-blue-500 text-black font-bold'
              : 'bg-gray-300 text-black'
          }`}
        >
          Strike
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className={`prose ${isDarkMode ? 'prose-invert' : ''}`}
      />
    </div>
  );
};

export default RichTextEditor;
