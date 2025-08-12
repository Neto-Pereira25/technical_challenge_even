import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { Users, Mail, User, Calendar } from 'lucide-react';

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
            return stored ? JSON.parse(stored) as Participant[] : [];
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        localStorage.setItem('participants', JSON.stringify(participants));
    }, [participants]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Usuário inscrito no evento');
    };

    const formatDate = (date: Date) =>
        new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));

    return (
        <Container fluid className='py-5 bg-light min-vh-100'>
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
                                    <User size={20} />
                                    Formulário de Inscrição
                                </Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className='mb-3' controlId='name'>
                                        <Form.Label>Nome Completo</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Digite seu nome completo'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='email'>
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='seu@email.com'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant='primary' type='submit' className='w-100' disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Spinner animation='border' size='sm' className='me-2' />
                                                Inscrevendo Participante...
                                            </>
                                        ) : (
                                            <>
                                                Inscreva-se
                                            </>
                                        )}
                                    </Button>
                                </Form>
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
                                {participants.length === 0 ? (
                                    <div className="text-center py-5 text-muted">
                                        <Users size={48} className='mb-3' />
                                        <p className='mb-0'>Nenhum participante inscrito ainda</p>
                                        <small className='text-muted'>Seja o primeiro a se inscrever</small>
                                    </div>
                                ) : (
                                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        {participants.map((participant, index) => (
                                            <div
                                                key={participant.id}
                                                className='d-flex align-items-start gap-3 p-3 border rounded mb-2 bg-light'
                                            >
                                                <div className='rounded-circle bg-primary bg-opacity-25 d-flex align-items-center justify-content-center' style={{ width: 40, height: 40 }}>
                                                    <User size={20} className='text-primary' />
                                                </div>
                                                <div className='flex-grow-1'>
                                                    <h6 className='mb-1 text-truncate'>{participant.name}</h6>
                                                    <div className='small text-muted d-flex align-items-center gap-1'>
                                                        <Mail size={14} />
                                                        <span className='text-truncate'>{participant.email}</span>
                                                    </div>
                                                    <div className='text-muted small mt-1'>
                                                        Inscrito em {formatDate(participant.registeredAt)}
                                                    </div>
                                                </div>
                                                <Badge bg='outline-sucess'>#{participants.length - index}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
        </Container>
    );
};

export default EventRegistration;