"use client"

import { Button } from '@/components/ui/button'
import { redirectToDashboard } from '@/lib/redirectFn'
import axios from "axios"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CheckoutForm from '@/components/shared/checkoutForm'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const page = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { id } = useParams()
    const [data, setData] = useState({} as any)
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    useEffect(() => {
        const getPreview = async () => {
            const res = await axios.post("/api/getpreview", { id })
            if (res) {
                console.log(res.data)
                setData(res.data)
            }
        }
        const createPaymentIntent = async () => {
            const price = await data.price;
            const res = await axios.post("/api/createpayment", { price })
            if (res) {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            }
        }
        getPreview()
        createPaymentIntent()
    }, [])
    return (
        <div className='h-full flex items-center justify-center flex-col gap-4'>
            <div>
                {data.type === "image" ? (
                    <img src={data.url} alt="img" className='w-[300px] h-[300px]' />
                ) : (
                    <audio src={data.url} controls={true}></audio>
                )}
            </div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default page