import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { validateParticipant, emailExists } from '../utils/participantUtils';
import { toast } from 'react-toastify';
import type { Participant } from '../types/Participant';

interface EditParticipantModalProps {
    show: boolean;
    participant: Participant | null;
    participants: Participant[];
    onClose: () => void;
    onSave: (updated: Participant) => void;
}

const EditParticipantModal = ({ show, participant, participants, onClose, onSave }: EditParticipantModalProps) => {
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');

    useEffect(() => {
        if (participant) {
            setEditName(participant.name);
            setEditEmail(participant.email);
        }
    }, [participant]);

    const handleSave = () => {
        if (!participant) return;

        if (!validateParticipant({ name: editName, email: editEmail })) return;

        if (emailExists(participants, editEmail, participant.id)) {
            toast.warning('Este e-mail já está inscrito no evento.');
            return;
        }

        onSave({ ...participant, name: editName.trim(), email: editEmail.trim() });
        toast.success('Participante atualizado com sucesso.');
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Participante</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type='text'
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type='email'
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSave}>Salvar Alterações</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditParticipantModal;
