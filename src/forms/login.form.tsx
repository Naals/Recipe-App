'use client'

import {Button, Input, Form} from "@heroui/react";
import {useState} from "react";
import {unlink} from "node:fs";

interface Props {
    onClose: () => void;
}


const LoginForm = ({onClose}: Props) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('form submitted:', formData);

        onClose();
    }
    return (
        <Form className='w-full' onSubmit={handelSubmit}>
            <Input
                aria-label="Email"
                isRequired
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none'
                }}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                validate={(value: string) => {
                    if (!value) return "Email is required";
                    return null;
                }}
            />

            <Input
                isRequired
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none'
                }}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                validate={(value: string) => {
                    if (!value) return "Password is required";
                    return null;
                }}
            />


            <div className='flex w-[100%] gap-4 items-center pt-8 justify-end'>
                <Button variant='light' onPress={onClose}>Cancel</Button>
                <Button color='primary' type='submit'>Login</Button>
            </div>
        </Form>
    )
}

export default LoginForm;