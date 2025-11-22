'use client'

import CustomModal from "@/components/common/modals";
import RegistrationForm from "@/forms/registraion.form";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal = ({isOpen, onClose} : Props) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title='Registration' size='xl'>
            <RegistrationForm onClose={onClose}/>
        </CustomModal>
    )
}

export default RegistrationModal