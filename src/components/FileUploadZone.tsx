"use client"

import { useState, useCallback, useTransition } from "react"
import { UploadCloud, FileType, CheckCircle2, Loader2, AlertCircle } from "lucide-react"

interface FileUploadZoneProps {
    onUploadAction: (formData: FormData) => Promise<{ success?: boolean; error?: string; url?: string }>
    disabled?: boolean
}

export function FileUploadZone({ onUploadAction, disabled }: FileUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled && !isPending) setIsDragging(true)
    }, [disabled, isPending])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const validateAndUpload = (file: File) => {
        setError(null)

        // Validation
        if (file.size > 10 * 1024 * 1024) {
            setError("File exceeds 10MB limit.")
            return
        }

        const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/svg+xml"]
        if (!validTypes.includes(file.type)) {
            setError("Invalid file type. Only PDF, PNG, JPG, and SVG are allowed.")
            return
        }

        startTransition(async () => {
            const formData = new FormData()
            formData.append("file", file)
            const result = await onUploadAction(formData)

            if (result.error) {
                setError(result.error)
            } else {
                // The parent component might handle the success toast via the action returning or revalidating the path.
            }
        })
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (disabled || isPending) return

        const file = e.dataTransfer.files?.[0]
        if (file) validateAndUpload(file)
    }, [disabled, isPending, validateAndUpload])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) validateAndUpload(file)
    }, [validateAndUpload])

    return (
        <div className="space-y-3 relative">
            <label
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative flex flex-col items-center justify-center w-full h-48 
                    border-2 border-dashed rounded-xl cursor-pointer 
                    transition-all duration-300 group overflow-hidden
                    ${disabled || isPending ? 'opacity-60 cursor-not-allowed bg-muted/50' : 'hover:bg-primary/5'}
                    ${isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-border/60 hover:border-primary/50'}
                `}
            >
                <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.svg"
                    onChange={handleChange}
                    disabled={disabled || isPending}
                />

                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center z-10">
                    {isPending ? (
                        <>
                            <Loader2 className="w-12 h-12 mb-4 text-primary animate-spin" />
                            <p className="text-sm font-semibold text-foreground">Uploading securely...</p>
                        </>
                    ) : (
                        <>
                            <div className={`p-4 rounded-full mb-4 transition-colors ${isDragging ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'}`}>
                                <UploadCloud className="w-8 h-8" />
                            </div>
                            <p className="mb-2 text-sm font-semibold text-foreground">
                                <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                <FileType className="w-3 h-3" /> PDF, PNG, JPG or SVG (MAX. 10MB)
                            </p>
                        </>
                    )}
                </div>
            </label>

            {error && (
                <div className="flex items-center gap-2 text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-lg animate-in fade-in zoom-in duration-300">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}
        </div>
    )
}
