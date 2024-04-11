'use client'
import styles from './FileInput.module.css'
import type { FileInputProps } from '@/components/molecules/FileInput/FileInput.types'
import { mergeRefs } from '@/utils'
import {
  ArrowUpTrayIcon as UploadIcon,
  TrashIcon,
  ExclamationCircleIcon as ErrorIcon,
  DocumentDuplicateIcon as FileIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Image from 'next/image'
import { forwardRef, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

// TODO: Resolve animation bugs
const errorVariants: Variants = {
  hidden: { opacity: 0, y: '-50%', height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
}
const iconButtonVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0 },
}
const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

type FileWithPreview = File & { preview: string }

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
      ...restProps
    } = props

    const [files, setFiles] = useState<FileWithPreview[]>([])

    const handleOnDrop = useCallback(
      (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [
          ...prevFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ])
      },
      [setFiles],
    )

    const {
      open: handleOpen,
      isDragActive,
      getInputProps,
      getRootProps,
      inputRef,
    } = useDropzone({
      onDrop: handleOnDrop,
      noClick: files.length > 0,
    })

    const handleDelete = (fileName?: string) => {
      if (fileName === undefined) {
        setFiles([])
        return
      }

      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.name !== fileName),
      )
    }

    return (
      <div
        {...getRootProps({
          className,
        })}
      >
        <m.div
          layout="size"
          className={clsx(
            styles.container,
            error && styles.containerError,
            isDragActive && styles.containerDragActive,
          )}
        >
          <m.div
            layout="position"
            className={clsx(styles.header, error && styles.headerError)}
          >
            <span
              className={clsx(styles.label)}
              data-testid="input-label"
            >
              {label}
            </span>
            <div className={styles.headerButtonsWrapper}>
              <button
                type="button"
                className={styles.headerButton}
                onClick={handleOpen}
              >
                <UploadIcon />
              </button>
              <AnimatePresence>
                {files.length > 0 && (
                  <m.button
                    type="button"
                    className={styles.headerButton}
                    onClick={() => handleDelete()}
                    variants={iconButtonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TrashIcon />
                  </m.button>
                )}
              </AnimatePresence>
            </div>
          </m.div>
          <m.div
            layout="position"
            className={clsx(
              styles.wrapper,
              files.length === 0 && styles.placeholderWrapper,
            )}
          >
            {files.length ? (
              <ul className={styles.previewWrapper}>
                <AnimatePresence mode="popLayout">
                  {files.map(
                    (file) =>
                      file && (
                        <m.li
                          layout="position"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          key={file.name}
                          className={styles.previewItem}
                        >
                          <Image
                            className={styles.previewImage}
                            alt={file.name}
                            width={200}
                            height={100}
                            onLoad={() => URL.revokeObjectURL(file.preview)}
                            src={file.preview}
                          />
                          <button
                            className={styles.previewButton}
                            onClick={() => handleDelete(file.name)}
                          >
                            <TrashIcon />
                          </button>
                        </m.li>
                      ),
                  )}
                </AnimatePresence>
              </ul>
            ) : (
              <div
                className={clsx(
                  styles.placeholder,
                  error && styles.placeholderError,
                  isDragActive && styles.placeholderDragActive,
                )}
              >
                <FileIcon className={styles.placeholderIcon} />
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
          </m.div>
        </m.div>
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
          {...getInputProps({
            ref: mergeRefs(inputRef, forwardedRef),
            ...restProps,
          })}
        />
      </div>
    )
  },
)
FileInput.displayName = 'FileInput'
