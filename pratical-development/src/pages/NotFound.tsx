import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error('404 Error: Usuário tentou acessar uma rota inexistente:',
            location.pathname
        );
    }, [location.pathname]);

    return (
        <Container fluid className='vh-100 d-flex align-items-center justify-content-center bg-light'>
            <Row className='text-center'>
                <Col>
                    <AlertTriangle size={88} className='text-warning mb-3' />
                    <h1 className='display-4'>404</h1>
                    <p className='lead text-muted'>Oops! Página não encontrada</p>
                    <Button as={Link} to='/' variant='primary'>
                        Voltar para a Página Inicial
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;