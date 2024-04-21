"use server"

import { redirect } from "next/navigation"

const redirectFn = (id: String) => {
    return redirect(`/dashboard/preview/${id}`)
}

const redirectToDashboard = () => {
    return redirect("/dashboard")
}

export { redirectFn, redirectToDashboard }