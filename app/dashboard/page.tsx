"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const page = () => {
    const [data, setData] = useState([] as any)
    useEffect(() => {
        const getProjects = async () => {
            const res = await axios.get("/api/saveproject")
            console.log(res.data)
            setData(res.data)
        }
        getProjects()
    }, [])
    return (
        <div className='p-24'>
            <Link href="/dashboard/upload"><Button>Add a new Project</Button></Link>
            {data.map((item: any) => (
                <div key={item._id} className={cn("h-full flex items-center justify-between my-4 px-8 py-4", item.paymentstatus ? "bg-green-400" : "bg-red-400")}>
                    <h1>{item.name}</h1>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    )
}

export default page