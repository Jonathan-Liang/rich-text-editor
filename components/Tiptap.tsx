'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toolbar } from '@/components/Toolbar'
import Heading from "@tiptap/extension-heading"

export default function Tiptap({
    description,
    onChange,
}: {
    description: string
    onChange: (richText: string) => void
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            Heading.configure({
                HTMLAttributes: {
                    class: "text-xl font-bold", 
                    levels: [1]
                },
            }),
        ],
        content: description,
        editorProps: {
            attributes: {
                class:
                    "rounded-md border min-h-[180px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        }
    })

    return (
        <div className="flex flex-col justify-stretch min-h-[250px]">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}