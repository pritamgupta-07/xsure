"use client"

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button onClick={() => window.location.href = "/sign-in"} >Get started</Button>
      </SignedOut>
    </div>
  )
}

export default page