import { Modal, Button } from 'react-bootstrap';
import type { Participant } from '../types/Participant';

interface ConfirmDeleteModalProps {
    show: boolean;
    participant: Participant | null;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal = ({ show, participant, onClose, onConfirm }: ConfirmDeleteModalProps) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Remover Participante</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tem certeza que deseja remover{' '}
                <strong>{participant?.name}</strong> da lista de participantes?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="danger" onClick={onConfirm}>Remover</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
