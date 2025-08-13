import { Badge, Button } from 'react-bootstrap';
import { Edit, Trash2, Mail, User } from 'lucide-react';
import { formatDate } from '../utils/participantUtils';
import type { Participant } from '../types/Participant';

interface ParticipantListProps {
    participants: Participant[];
    onEdit: (p: Participant) => void;
    onDelete: (p: Participant) => void;
}

const ParticipantList = ({ participants, onEdit, onDelete }: ParticipantListProps) => {
    if (participants.length === 0) {
        return (
            <div className="text-center py-5 text-muted">
                <User size={48} className='mb-3' />
                <p className='mb-0'>Nenhum participante inscrito ainda</p>
                <small className='text-muted'>Seja o primeiro a se inscrever</small>
            </div>
        );
    }

    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {participants.map((p, index) => (
                <div
                    key={p.id}
                    className="d-flex align-items-start gap-3 p-3 border rounded mb-2 bg-light"
                >
                    <div
                        className="rounded-circle bg-primary bg-opacity-25 d-flex align-items-center justify-content-center"
                        style={{ width: 40, height: 40 }}
                    >
                        <User size={20} className="text-primary" />
                    </div>

                    <div className="flex-grow-1">
                        <h6 className='mb-1 text-truncate'>{p.name}</h6>
                        <div className='small text-muted d-flex align-items-center gap-1'>
                            <Mail size={14} />
                            <span className='text-truncate'>{p.email}</span>
                        </div>
                        <div className='text-muted small mt-1'>
                            Inscrito em {formatDate(p.registeredAt)}
                        </div>
                    </div>

                    <div className='d-flex flex-column align-items-end gap-2'>
                        <Badge bg='success'>#{index + 1}</Badge>
                        <div className='d-flex gap-1'>
                            <Button
                                size='sm'
                                variant='outline-secondary'
                                onClick={() => onEdit(p)}
                            >
                                <Edit size={14} />
                            </Button>
                            <Button
                                size='sm'
                                variant='outline-danger'
                                onClick={() => onDelete(p)}
                            >
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParticipantList;
