'use client'

import React, { useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import {signIn} from 'next-auth/react'
import { Icons } from './icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {

}

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {toast} = useToast()

    const loginWithGoogle = async () => {
        setIsLoading(true)

        try {

            // throw new Error()

            await signIn('google')
            
        } catch (err) {
            // toast Notification
            toast({
                title: 'There was a problem',
                description: 'There was an error loggin in with Google',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    } 

    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Button
                onClick={loginWithGoogle}
                isLoading={isLoading}
                size='sm'
                className='w-full'
            >
                {
                    isLoading? null : <Icons.google className='h-4 w-4 mr-2' />
                }
                Google
            </Button>
        </div>
    )
}
