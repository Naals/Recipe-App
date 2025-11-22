'use client'

import {Button, Input, Form} from "@heroui/react";
import {useState} from "react";
import {registerUser} from "@/actions/register";

interface Props {
    onClose: () => void;
}


const RegistrationForm = ({onClose}: Props) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const validateEmail = (value: string) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(value);
    }

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('form submitted:', formData);

        const user = await registerUser(formData);
        console.log(user);

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
                    if (!validateEmail(value)) return "Email is incorrect";
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
                    if (value.length < 6) return "Password length must longer than 6!";
                    return null;
                }}
            />

            <Input
                isRequired
                name="password"
                placeholder="Confirm password"
                type="password"
                value={formData.confirmPassword}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none'
                }}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                validate={(value: string) => {
                    if (!value) return "Confirm password is required";
                    if (value !== formData.password) return "Password is incorrect";
                    return null;
                }}
            />

            <div className='flex w-[100%] gap-4 items-center pt-8 justify-end'>
                <Button variant='light' onPress={onClose}>Cancel</Button>
                <Button color='primary' type='submit'>Register</Button>
            </div>
        </Form>
    )
}

export default RegistrationForm;