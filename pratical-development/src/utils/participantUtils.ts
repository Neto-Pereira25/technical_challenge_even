import { CreateParticipantSchema } from '../schema/participant.schema';
import { toast } from 'react-toastify';
import type { Participant } from '../types/Participant';

export const validateParticipant = (data: { name: string; email: string }) => {
    const validation = CreateParticipantSchema.safeParse(data);
    if (!validation.success) {
        validation.error.issues.forEach(err => {
            toast.warning(err.message);
        });
        return false;
    }
    return true;
};

export const formatDate = (date: Date | string) =>
    new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));

export const emailExists = (participants: Participant[], email: string, excludeId?: string) =>
    participants.some(
        p => p.email.toLowerCase() === email.toLowerCase() && p.id !== excludeId
    );
