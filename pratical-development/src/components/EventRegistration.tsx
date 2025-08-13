import { Calendar, Edit, Mail, Trash2, User, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

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
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');

    useEffect(() => {
        localStorage.setItem('participants', JSON.stringify(participants));
    }, [participants]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            toast.error('Por favor, preencha nome e e-mail.');
            return;
        }

        if (!email.includes('@')) {
            toast.warning('Por favor, insira um e-mail válido.');
            return;
        }

        const emailExists = participants.some(
            (p) => p.email.toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {
            toast.warning('Este e-mail já está inscrito no evento.');
            return;
        }

        setIsSubmitting(true);
        await new Promise((res) => setTimeout(res, 800));

        const newParticipant: Participant = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim(),
            registeredAt: new Date(),
        };

        setParticipants((prev) => [...prev, newParticipant]);
        setName('');
        setEmail('');
        setIsSubmitting(false);

        toast.success(`${newParticipant.name} foi inscrito(a) com sucesso!`);
    };

    const handleEdit = (participant: Participant) => {
        setEditingId(participant.id);
        setEditName(participant.name);
        setEditEmail(participant.email);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditEmail('');
    };

    const handleSaveEdit = () => {
        if (!editName.trim() || !editEmail.trim()) {
            toast.error('Por favor, preencha nome e e-mail.');
            return;
        }

        if (!editEmail.includes('@')) {
            toast.warning('Por favor, insira um e-mail válido.');
            return;
        }

        const emailExists = participants.some(
            (p) =>
                p.email.toLowerCase() === editEmail.toLowerCase() && p.id !== editingId
        );

        if (emailExists) {
            toast.warning('Este e-mail já está inscrito no evento.');
            return;
        }

        setParticipants((prev) =>
            prev.map((p) =>
                p.id === editingId
                    ? {
                        ...p,
                        name: editName.trim(),
                        email: editEmail.trim().toLowerCase(),
                    }
                    : p
            )
        );

        toast.success('Participante atualizado com sucesso.');
        handleCancelEdit();
    };

    const handleDelete = (id: string) => {
        const participant = participants.find((p) => p.id === id);
        setParticipants((prev) => prev.filter((p) => p.id !== id));
        if (participant) {
            toast.success(`${participant.name} foi removido da lista.`);
        }
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
                                                    {editingId === p.id ? (
                                                        <>
                                                            <Form.Control
                                                                className="mb-2"
                                                                value={editName}
                                                                onChange={(e) => setEditName(e.target.value)}
                                                                placeholder="Nome"
                                                            />
                                                            <Form.Control
                                                                className="mb-2"
                                                                value={editEmail}
                                                                onChange={(e) => setEditEmail(e.target.value)}
                                                                placeholder="E-mail"
                                                            />
                                                            <div className="d-flex gap-2">
                                                                <Button size="sm" onClick={handleSaveEdit}>
                                                                    Salvar
                                                                </Button>
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    size="sm"
                                                                    onClick={handleCancelEdit}
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h6 className="mb-1 text-truncate">{p.name}</h6>
                                                            <div className="small text-muted d-flex align-items-center gap-1">
                                                                <Mail size={14} />
                                                                <span className="text-truncate">{p.email}</span>
                                                            </div>
                                                            <div className="text-muted small mt-1">
                                                                Inscrito em {formatDate(p.registeredAt)}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {editingId !== p.id && (
                                                    <div className="d-flex flex-column align-items-end gap-2">
                                                        <Badge bg="success">#{index + 1}</Badge>
                                                        <div className="d-flex gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="outline-secondary"
                                                                onClick={() => handleEdit(p)}
                                                            >
                                                                <Edit size={14} />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline-danger"
                                                                onClick={() => handleDelete(p.id)}
                                                            >
                                                                <Trash2 size={14} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
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