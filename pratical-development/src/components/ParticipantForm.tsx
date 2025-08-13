import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { validateParticipant, emailExists } from '../utils/participantUtils';
import { toast } from 'react-toastify';
import type { Participant } from '../types/Participant';

interface ParticipantFormProps {
    participants: Participant[];
    onAdd: (participant: Participant) => void;
}

const ParticipantForm = ({ participants, onAdd }: ParticipantFormProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateParticipant({ name, email })) return;

        if (emailExists(participants, email)) {
            toast.warning('Este e-mail já está inscrito no evento.');
            return;
        }

        setIsSubmitting(true);
        await new Promise(res => setTimeout(res, 800));

        const newParticipant = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim(),
            registeredAt: new Date(),
        };

        onAdd(newParticipant);
        setName('');
        setEmail('');
        setIsSubmitting(false);
        toast.success(`${newParticipant.name} foi inscrito(a) com sucesso!`);
    };

    return (
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
                    <>Inscreva-se</>
                )}
            </Button>
        </Form>
    );
};

export default ParticipantForm;
