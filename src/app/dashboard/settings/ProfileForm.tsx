"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Upload, Loader2, User as UserIcon } from "lucide-react"
import Image from "next/image"
import { updateProfileAction, uploadAvatarAction } from "@/app/actions/settings"

interface ProfileFormProps {
    initialName: string
    initialEmail: string
    initialImage?: string | null
}

export function ProfileForm({ initialName, initialEmail, initialImage }: ProfileFormProps) {
    const [name, setName] = useState(initialName)
    const [email, setEmail] = useState(initialEmail)
    const [image, setImage] = useState(initialImage)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSaving(true)
        const toastId = toast.loading("Saving profile...")

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)

        const res = await updateProfileAction(formData)

        if (res.error) {
            toast.error(res.error, { id: toastId })
        } else {
            toast.success("Profile updated successfully", { id: toastId })
        }
        setIsSaving(false)
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 2 * 1024 * 1024) {
            toast.error("File size must be less than 2MB")
            return
        }

        setIsUploading(true)
        const toastId = toast.loading("Uploading avatar...")

        const formData = new FormData()
        formData.append("file", file)

        const res = await uploadAvatarAction(formData)

        if (res.error) {
            toast.error(res.error, { id: toastId })
        } else if (res.url) {
            setImage(res.url)
            toast.success("Avatar updated successfully", { id: toastId })
        }

        setIsUploading(false)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-xl border border-border bg-card shadow-sm">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20 bg-muted flex shrink-0 items-center justify-center">
                    {image ? (
                        <Image src={image} alt="Avatar" fill className="object-cover" />
                    ) : (
                        <UserIcon className="h-10 w-10 text-muted-foreground" />
                    )}
                    {isUploading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    )}
                </div>
                <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-medium">Profile Picture</h4>
                    <p className="text-sm text-muted-foreground">
                        Supported formats: JPEG, PNG, WEBP. Max size: 2MB.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={isUploading}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="w-4 h-4 mr-2" /> Upload new
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleAvatarUpload}
                        />
                    </div>
                </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Full Name
                    </label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                    />
                    <p className="text-[0.8rem] text-muted-foreground">
                        This is your public display name locally and in client portals.
                    </p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        readOnly // Readonly currently to prevent locking out of account without email verification layer
                        disabled
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        required
                    />
                    <p className="text-[0.8rem] text-muted-foreground">
                        You cannot change your email address securely at this time.
                    </p>
                </div>

                <Button type="submit" disabled={isSaving || isUploading}>
                    {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Update profile"}
                </Button>
            </form>
        </div>
    )
}
