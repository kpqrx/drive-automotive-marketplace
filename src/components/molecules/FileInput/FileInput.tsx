'use client'
import styles from './FileInput.module.css'
import type { FileInputProps } from '@/components/molecules/FileInput/FileInput.types'
import { mergeEventHandlers, mergeRefs } from '@/utils'
import {
  ArrowUpTrayIcon as UploadIcon,
  TrashIcon,
  ExclamationCircleIcon as ErrorIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { forwardRef, useRef, useState, type ChangeEventHandler } from 'react'
import { useDropzone } from 'react-dropzone'

const errorVariants: Variants = {
  hidden: { opacity: 0, y: '-50%', height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props, forwardedRef) => {
    const {
      label,
      className = '',
      placeholderHeading,
      placeholderDescription,
      dragPlaceholderHeading,
      dragPlaceholderDescription,
      error,
      multiple,
      onChange,
      ...restProps
    } = props

    const [files, setFiles] = useState<File[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleSetFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
      const currentFiles = event.target.files
      if (!currentFiles) return
      setFiles((prevFiles) => [...prevFiles, ...currentFiles])
    }

    const { open, isDragActive, getInputProps, getRootProps } = useDropzone()
    const { onChange: dropzoneOnChange, ...restDropzoneProps } = getInputProps()

    return (
      <m.label
        layout
        className={clsx(styles.container, className)}
        data-testid="input"
        {...getRootProps<any>()}
      >
        <div className="flex items-center justify-between">
          <span
            className={clsx(styles.label, error && styles.labelError)}
            data-testid="input-label"
          >
            {label}
          </span>
          <div className="flex space-x-3">
            <button
              type="button"
              className="rounded p-1 hover:bg-neutral-200"
              onClick={open}
            >
              <UploadIcon className="size-5" />
            </button>
            <button
              type="button"
              className="rounded p-1 hover:bg-neutral-200"
              onClick={() => setFiles([])}
            >
              <TrashIcon className="size-5" />
            </button>
          </div>
        </div>
        <div className={styles.wrapper}>
          {files.length ? (
            <div>
              {files.map((file, i) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                const fileSrc = reader.result
                return (
                  <img
                    className="aspect-[4/3] max-w-24"
                    key={i}
                    alt="asdf"
                    src={fileSrc as string}
                  />
                )
              })}
            </div>
          ) : (
            <div className={styles.placeholder}>
              <UploadIcon className={styles.placeholderIcon} />
              <p className={styles.placeholderHeading}>
                {isDragActive ? dragPlaceholderHeading : placeholderHeading}
              </p>
              <p className={styles.placeholderDescription}>
                {isDragActive
                  ? dragPlaceholderDescription
                  : placeholderDescription}
              </p>
            </div>
          )}
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
          type="file"
          hidden
          onChange={mergeEventHandlers(
            onChange,
            handleSetFiles,
            dropzoneOnChange,
          )}
          ref={mergeRefs(inputRef, forwardedRef)}
          className={clsx(styles.input, error && styles.inputError)}
          {...restProps}
          {...restDropzoneProps}
        />
      </m.label>
    )
  },
)
FileInput.displayName = 'Input'
