'use client'

import {Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/modal";
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    size?: "sm" | "md" | "lg" | "xs" | "xl",
    children: React.ReactNode;
    title: string;
}

const CustomModal = ({isOpen, onClose, size, children, title}: ModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CustomModal;