import { NextResponse } from "next/server"

import project from "@/lib/db/models/project.model"
import conn from "@/lib/db"

export const GET = async () => {
    await conn();
    try {
        const projects = await project.find()
        return new NextResponse(JSON.stringify(projects))
    } catch (error) {
        return new NextResponse("Error getting project : " + error, { status: 500 })
    }
}

export const POST = async (req: Request) => {
    const data = await req.json()
    await conn();
    try {
        const newProject = new project(data)
        await newProject.save()
        return new NextResponse(JSON.stringify(newProject))
    } catch (error) {
        console.error("Error saving project : ", error)
        return new NextResponse("Error saving project : " + error, { status: 500 })
    }
}