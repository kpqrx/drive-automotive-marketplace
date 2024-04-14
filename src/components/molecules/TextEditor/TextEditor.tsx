'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import CharacterCount from '@tiptap/extension-character-count'
import { Markdown } from 'tiptap-markdown'
import type { TextEditorProps } from './TextEditor.types'
import clsx from 'clsx'
import styles from './TextEditor.module.css'
import { AnimatePresence, m, type Variants } from 'framer-motion'
import { ExclamationCircleIcon as ErrorIcon } from '@heroicons/react/24/outline'
import {
  LuItalic as ItalicIcon,
  LuBold as BoldIcon,
  LuStrikethrough as StrikeIcon,
  LuListOrdered as OrderedListIcon,
  LuList as ListIcon,
  LuHeading as HeadingIcon,
  LuHighlighter as HighlightIcon,
} from 'react-icons/lu'
import { useFormContext } from 'react-hook-form'
import { forwardRef } from 'react'

const errorVariants: Variants = {
  hidden: { opacity: 0, y: '-50%', height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
}

export const TextEditor = forwardRef<HTMLInputElement, TextEditorProps>(
  (props, ref) => {
    const {
      className,
      label,
      error,
      name,
      maxCharacters = Infinity,
      ...restProps
    } = props

    const { setValue, getValues } = useFormContext()

    const editor = useEditor({
      content: name && getValues ? getValues(name) : '',
      extensions: [
        StarterKit,
        Highlight,
        Markdown,
        CharacterCount.configure({ limit: maxCharacters }),
      ],
      editorProps: {
        attributes: {
          class: styles.editorContent,
        },
      },
      onUpdate: ({ editor }) => {
        if (!name || !setValue) return

        const markdown = editor.storage.markdown.getMarkdown()
        setValue(name, markdown)
      },
    })

    // TODO: Adjust Tailwind's prose spacing

    const isLabelFloating = editor ? editor.isFocused || !editor.isEmpty : false

    return (
      <div className={clsx(styles.container, className)}>
        <div className={clsx(styles.wrapper, error && styles.wrapperError)}>
          <span
            className={clsx(
              styles.label,
              isLabelFloating && styles.labelFloating,
              error && styles.labelError,
            )}
          >
            {label}
          </span>
          <EditorContent
            className={styles.editorContentWrapper}
            editor={editor}
          />
          <ul className={clsx(styles.toolbar, error && styles.toolbarError)}>
            <li>
              <button
                type="button"
                className={clsx(
                  styles.toolbarControl,
                  editor?.isActive('heading') && styles.toolbarControlActive,
                )}
                onClick={() =>
                  editor?.chain().toggleHeading({ level: 2 }).focus().run()
                }
              >
                <HeadingIcon />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={clsx(
                  styles.toolbarControl,
                  editor?.isActive('highlight') && styles.toolbarControlActive,
                )}
                onClick={() => editor?.chain().toggleHighlight().focus().run()}
              >
                <HighlightIcon />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={clsx(
                  styles.toolbarControl,
                  editor?.isActive('bold') && styles.toolbarControlActive,
                )}
                onClick={() => editor?.chain().toggleBold().focus().run()}
              >
                <BoldIcon />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={clsx(
                  styles.toolbarControl,
                  editor?.isActive('italic') && styles.toolbarControlActive,
                )}
                onClick={() => editor?.chain().toggleItalic().focus().run()}
              >
                <ItalicIcon />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={clsx(
                  styles.toolbarControl,
                  editor?.isActive('strike') && styles.toolbarControlActive,
                )}
                onClick={() => editor?.chain().toggleStrike().focus().run()}
              >
                <StrikeIcon />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={clsx(
                  styles.toolbarControl,
                  editor?.isActive('bulletList') && styles.toolbarControlActive,
                )}
                onClick={() => editor?.chain().toggleBulletList().focus().run()}
              >
                <ListIcon />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={clsx(
                  styles.toolbarControl,
                  editor?.isActive('orderedList') &&
                    styles.toolbarControlActive,
                )}
                onClick={() =>
                  editor?.chain().toggleOrderedList().focus().run()
                }
              >
                <OrderedListIcon />
              </button>
            </li>
            {maxCharacters !== Infinity && (
              <li className={styles.characterCount}>
                {editor?.storage.characterCount.characters()} / {maxCharacters}
              </li>
            )}
          </ul>
        </div>
        <AnimatePresence>
          {error && (
            <m.p
              className={styles.error}
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ErrorIcon />
              {error}
            </m.p>
          )}
        </AnimatePresence>
        <input
          hidden
          name={name}
          ref={ref}
          {...restProps}
        />
      </div>
    )
  },
)

TextEditor.displayName = 'TextEditor'
