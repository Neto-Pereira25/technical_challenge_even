import { Calendar, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import EditParticipantModal from './EditParticipantModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ParticipantList from './ParticipantList';
import ParticipantForm from './ParticipantForm';


interface Participant {
    id: string;
    name: string;
    email: string;
    registeredAt: Date;
}

const EventRegistration = () => {
    const [participants, setParticipants] = useState<Participant[]>(() => {
        try {
            const stored = localStorage.getItem('participants');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

    useEffect(() => {
        localStorage.setItem('participants', JSON.stringify(participants));
    }, [participants]);

    const addParticipant = (participant: Participant) => {
        setParticipants((prev) => [...prev, participant]);
    };

    const updateParticipant = (updated: Participant) => {
        setParticipants((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setShowEditModal(false);
        setSelectedParticipant(null);
    };

    const deleteParticipant = () => {
        if (!selectedParticipant) return;
        setParticipants((prev) => prev.filter((p) => p.id !== selectedParticipant.id));
        setShowDeleteModal(false);
        setSelectedParticipant(null);
    };

    return (
        <Container fluid className='py-2 bg-light'>
            <Container style={{ maxWidth: '960px' }}>
                <div className="text-center mb-5">
                    <div className='d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-pill small fw-medium mb-3'>
                        <Calendar size={16} />
                        Evento Tech Conference 2025
                    </div>
                    <h1 className='display-5 fw-bold'>Inscrição para o Evento</h1>
                    <p>Juste-se a nós no maior evento de tecnologia do ano. Preencha o formulário abaixo para garantir sua vaga.</p>
                </div>

                <Row>
                    <Col lg={6} className='mb-4'>
                        <Card className='shadow-sm'>
                            <Card.Body>
                                <Card.Title className='d-flex align-items-center gap-2 mb-3'>
                                    <Users size={20} />
                                    Formulário de Inscrição
                                </Card.Title>
                                <ParticipantForm participants={participants} onAdd={addParticipant} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card className='shadow-sm'>
                            <Card.Body>
                                <Card.Title className='d-flex align-items-center gap-2 mb-3'>
                                    <Users size={20} className='text-success' />
                                    Participantes Inscritos
                                    <Badge bg='secondary' className='ms-auto'>{participants.length}</Badge>
                                </Card.Title>
                                <ParticipantList
                                    participants={participants}
                                    onEdit={(p) => {
                                        setSelectedParticipant(p);
                                        setShowEditModal(true);
                                    }}
                                    onDelete={(p) => {
                                        setSelectedParticipant(p);
                                        setShowDeleteModal(true);
                                    }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {participants.length > 0 && (
                    <div className="mt-4 text-center">
                        <div className="d-inline-flex align-items-center gap-2 bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill fw-medium">
                            <Users size={18} />
                            {participants.length} {participants.length === 1 ? 'Pessoa Inscrita' : 'Pessoas Inscritas'}
                        </div>
                    </div>
                )}
            </Container>

            <EditParticipantModal
                show={showEditModal}
                participant={selectedParticipant}
                participants={participants}
                onClose={() => setShowEditModal(false)}
                onSave={updateParticipant}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                participant={selectedParticipant}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={deleteParticipant}
            />
        </Container>
    );
};

export default EventRegistration;