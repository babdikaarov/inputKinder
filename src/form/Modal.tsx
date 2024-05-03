import { Check, Minus, TriangleAlert, Upload, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogClose,
} from './Dialog'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from './cn'
import { shortenFileName } from './DocFileInput'
import { fileUrls } from './types'
interface DialogDemoProps {
  myRef: React.MutableRefObject<null>
  text: {
    button: string
    title: string
    save: string
    note: string
    clickDrop: {
      clickAndDrop: string
      drop: string
    }
    upload: string
  }
  forwardInput: any
  className: string
  setFileUrls: React.Dispatch<React.SetStateAction<fileUrls[]>>
  fileUrls: fileUrls[]
}
interface FileWithPreview extends File {
  preview: string
}
export default function DialogDemo({
  myRef,
  text,
  forwardInput,
  className,
  setFileUrls,
  fileUrls,
}: DialogDemoProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDuplicate, setIsDuplicate] = useState({
    isDuplicate: false,
    name: '',
  })
  const onDrop = (acceptedFiles: File[]) => {
    // acceptedFiles.forEach((file) => {
    //   acceptedFiles.forEach((fileCompare) => {
    //     if (file.name == fileCompare.name) {
    //       setIsDuplicate({
    //         isDuplicate: true,
    //         name: file.name,
    //       })
    //     }
    //   })
    // })
    setFiles((prev) => [...prev, ...acceptedFiles])
    setFileUrls((previousFiles) => [
      ...previousFiles,
      ...acceptedFiles.map((file) => ({
        name: file.name,
        shortName: shortenFileName(file.name),
        size: (file.size / (1024 * 1024)).toFixed(2),
        url: URL.createObjectURL(file),
      })),
    ])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({ onDrop, maxFiles: 2 })

  const save = () => {
    const dataTransfer = new DataTransfer()
    files.forEach((file: File) => {
      dataTransfer.items.add(file)
    })

    forwardInput(dataTransfer.files)
    // filesURL.forEach((fileWithPreview) => {
    //   URL.revokeObjectURL(fileWithPreview.preview)
    // })
  }
  const removeFile = (name: string) => {
    // setFileUrls((files) => files.filter((file) => file.name !== name))
    // setFiles((files) => files.filter((file) => file.name !== name))
    setFileUrls((files) => {
      const removed = files.some((file, index) => {
        if (file.name === name) {
          files.splice(index, 1) // Remove the file from the array
          return true // Terminate the iteration
        }
        return false // Continue the iteration
      })
      return removed ? [...files] : files // Return a new array only if a file was removed
    })
    setFiles((files) => {
      const removed = files.some((file, index) => {
        if (file.name === name) {
          files.splice(index, 1) // Remove the file from the array
          return true // Terminate the iteration
        }
        return false // Continue the iteration
      })
      return removed ? [...files] : files // Return a new array only if a file was removed
    })
  }
  useEffect(() => {
    let isDuplicate = false
    for (let i = 0; i < files.length; i++) {
      for (let j = i + 1; j < files.length; j++) {
        if (files[i].name === files[j].name) {
          isDuplicate = true
          break
        }
      }
      if (isDuplicate) {
        break
      }
    }
    setIsDuplicate({
      isDuplicate: isDuplicate,
      name: isDuplicate ? files[0].name : '', // If duplicate found, set name to the first duplicate found
    })
  }, [files])

  const fileRejectionItems = (content: string | number) => {
    return (
      <div>
        <TriangleAlert className='float-left mr-1 stroke-[#F93232]' />
        {typeof content === 'number' ? (
          <span className='text-[#f93232ad]'>{`strapi: You have chooses ${content} files, max allowed number of files are two for front and back or one for travel Passport`}</span>
        ) : null}
        {typeof content === 'string' ? (
          <span className='text-[#f93232ad]'>{`strapi: You have duplicate ${content} files, please remove duplicate`}</span>
        ) : null}
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            'button absolute top-0 flex h-[50px] w-full min-w-[196px]  items-center justify-center gap-2 p-2   ',
            className
          )}
          ref={myRef}
        >
          {text.button}
        </button>
      </DialogTrigger>
      <DialogOverlay className='bg-[#1A1A1A42] ' />
      <DialogContent
        className='bg-[#F9F9F9] text-black sm:max-w-[425px] '
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-fs-lg text-black'>
            {text.title}
          </DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-6'>
          <div
            {...getRootProps()}
            className='flex flex-col items-center gap-5 rounded-10 border-[2px] border-solid border-[#A8A8A8] p-5'
          >
            <input {...getInputProps()} />
            <Upload />
            {isDragActive ? (
              <p>{text.clickDrop.drop}</p>
            ) : (
              // eslint-disable-next-line react/no-unescaped-entities
              <p>{text.clickDrop.clickAndDrop}</p>
            )}

            <p>{text.note}</p>

            <button className='button h-[35px] w-[120px]'>{text.upload}</button>
          </div>
          <ul className='flex flex-col gap-5'>
            {fileUrls.map((file, i) => (
              <li
                key={i}
                className=' flex h-[35px] items-center justify-between gap-1'
              >
                <div className='flex gap-2'>
                  <a
                    href={file.url}
                    target='_blank'
                    className='boxShadow relative flex h-full items-center  text-fs-lg hover:underline'
                  >
                    {file.name.slice(-20)} - {file.size}mb
                  </a>
                  <button
                    type='button'
                    className='border-secondary-400 -right-5 -top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border bg-red-200 transition-colors hover:bg-red-400'
                    onClick={() => removeFile(file.name)}
                  >
                    <Minus className='hover:fill-secondary-400 size-full fill-white transition-colors' />
                  </button>
                </div>
                <Check className='aspect-square  size-[28px] bg-green-200' />
              </li>
            ))}
            {files.length > 2 ? fileRejectionItems(files.length) : null}
            {isDuplicate.isDuplicate
              ? fileRejectionItems(isDuplicate.name)
              : null}
            {fileRejections.length
              ? fileRejectionItems(fileRejections.length)
              : null}
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button
              className='button h-[35px] w-[120px] self-baseline rounded bg-blue-500 text-white'
              disabled={(files && files.length > 2) || isDuplicate.isDuplicate}
              onClick={save}
            >
              {text.save}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
