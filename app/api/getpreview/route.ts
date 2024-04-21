import conn from "@/lib/db"
import project from "@/lib/db/models/project.model"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const body = await req.json()
    await conn()
    try {
        console.log(body)
        const previewProject = await project.findOne({ _id: body.id })
        if (!previewProject) {
            return new NextResponse("Project not found", { status: 404 })
        }
        return new NextResponse(JSON.stringify(previewProject))
    } catch (error) {
        return new NextResponse("Error while getting the preview", { status: 500 })
    }
}