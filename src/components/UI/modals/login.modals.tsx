'use client'

import CustomModal from "@/components/common/modals";
import LoginForm from "@/forms/login.form";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({isOpen, onClose} : Props) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title='Login' size='xl'>
            <LoginForm onClose={onClose}/>
        </CustomModal>
    )
}

export default LoginModal