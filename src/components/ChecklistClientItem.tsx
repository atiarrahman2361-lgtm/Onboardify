"use client"

import { useState, useTransition } from "react"
import { CheckCircle2, UploadCloud, Type, Circle, Loader2 } from "lucide-react"
import { submitTextAction, toggleCheckboxAction, uploadFileAction } from "@/app/actions/checklist"
import { FileUploadZone } from "./FileUploadZone"

type Task = {
    id: string
    title: string
    description: string | null
    type: "file_upload" | "text_input" | "checkbox"
    status: "pending" | "completed"
    value: string | null
}

export function ChecklistClientItem({ task, projectId, index }: { task: Task, projectId: string, index: number }) {
    const [isPending, startTransition] = useTransition()
    const [textVal, setTextVal] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const isCompleted = task.status === "completed"

    const handleTextSubmit = () => {
        setErrorMsg("")
        startTransition(async () => {
            const res = await submitTextAction(task.id, projectId, textVal)
            if (res?.error) setErrorMsg(res.error)
        })
    }

    const handleCheckboxToggle = () => {
        setErrorMsg("")
        startTransition(async () => {
            const res = await toggleCheckboxAction(task.id, projectId)
            if (res?.error) setErrorMsg(res.error)
        })
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setErrorMsg("")
        startTransition(async () => {
            const formData = new FormData()
            formData.append("file", file)
            const res = await uploadFileAction(formData, task.id, projectId)
            if (res?.error) setErrorMsg(res.error)
        })
    }

    return (
        <div
            className={`subtle-3d-card rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start animate-in fade-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className="flex-shrink-0 mt-1">
                {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                    <Circle className="w-8 h-8 text-amber-500" />
                )}
            </div>

            <div className="flex-grow space-y-4 w-full">
                <div>
                    <h4 className={`text-xl font-semibold ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {task.title}
                    </h4>
                    <p className="text-muted-foreground">{task.description}</p>
                </div>

                {errorMsg && <p className="text-sm text-red-500 font-medium">{errorMsg}</p>}

                {!isCompleted && (
                    <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border/50 relative overflow-hidden">
                        {isPending && (
                            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                            </div>
                        )}

                        {task.type === "file_upload" && (
                            <FileUploadZone
                                disabled={isPending}
                                onUploadAction={async (formData) => {
                                    const res = await uploadFileAction(formData, task.id, projectId)
                                    if (res?.error) {
                                        return { error: res.error }
                                    }
                                    if (typeof window !== "undefined") {
                                        // Optional: Fire a toast event or rely on `sonner` directly here if imported.
                                        // For now, Shadcn Toaster listens to toast() calls.
                                        const { toast } = await import("sonner")
                                        toast.success("File uploaded securely!")
                                    }
                                    return { success: true }
                                }}
                            />
                        )}

                        {task.type === "text_input" && (
                            <div className="space-y-3">
                                <div className="relative">
                                    <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <textarea
                                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Type your response here..."
                                        value={textVal}
                                        onChange={(e) => setTextVal(e.target.value)}
                                        disabled={isPending}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleTextSubmit}
                                        disabled={isPending || !textVal.trim()}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                                    >
                                        Submit Response
                                    </button>
                                </div>
                            </div>
                        )}

                        {task.type === "checkbox" && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <div className="w-6 h-6 rounded border-2 border-primary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <span className="opacity-0 w-3 h-3 bg-primary rounded-sm transition-opacity"></span>
                                    </div>
                                    <span className="text-sm font-medium">I confirm the above requirement</span>
                                </label>
                                <button
                                    onClick={handleCheckboxToggle}
                                    disabled={isPending}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                                >
                                    Confirm
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {isCompleted && task.value && (
                    <div className="mt-4 p-3 rounded-lg bg-muted text-sm border border-border">
                        <span className="font-semibold text-foreground/80 mr-2">Submitted Value:</span>
                        {task.type === "file_upload" ? (
                            <a href={task.value} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate inline-block max-w-xs align-bottom">
                                View Uploaded File
                            </a>
                        ) : (
                            <span className="text-muted-foreground italic break-words">{task.value}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
