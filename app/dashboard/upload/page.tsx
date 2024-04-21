"use client"

import axios from "axios"
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadDropzone } from '@/lib/uploadthing';
import { redirectFn } from "@/lib/redirectFn";
import toast from "react-hot-toast";

const page = () => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [type, setType] = useState("")
    const handleSave = async () => {
        if (!name || !price) return alert("Please fill all the fields")
        if (Number(price) <= 0) return alert("Price should be greater than 0")
        const res = await axios.post("/api/saveproject", { name, price, url, type })
        if (res) {
            console.log(res.data._id)
            setOpen(false)
            toast.success("Redirecting to preview page")
            redirectFn(res.data._id)
        }
    }
    return (
        <main className='p-24 min-h-screen'>
            <Link href="/dashboard"><Button>Back to Dashboard</Button></Link>
            <div className="flex flex-col items-center justify-between">
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log("File: ", res);
                        setUrl(res[0].url)
                        setType(res[0].type.split("/")[0])
                        setOpen(true);
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Please fill the missing fields</DialogTitle>
                        <DialogDescription>
                            Below fields are required to complete the upload process.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input type='number' value={price} onChange={e => setPrice(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    )
}

export default page