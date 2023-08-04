import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Image } from 'react-bootstrap'

export default function ArtistsList({ artists  }) {
    const getPopularity = (score) => {
        let text;
        let bg;
        if (score <= 25) {
            text = 'Who?', bg='dark'
        } else if (score <= 50) {
            text = 'Underground', bg='primary'
        } else if (score <= 70) {
            text = 'Come Up', bg='success'
        } else if (score <= 85) {
            text = 'Famous', bg='warning'
        } else {
            text = 'Super Star', bg='danger'
        }
        return <Badge pill bg={bg} className='px-3 py-2'>{text}</Badge>
    }

    return (
        <Row className='my-5'>
            <Col md={12} lg={6}>
                <ListGroup as="ol">
                {artists.slice(0, Math.floor(artists.length / 2)).map((item, index) => (
                    <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center w-100 mx-auto mb-2"
                    key={item.id}
                    >
                        <div className="ms-2 me-auto d-flex align-items-center">
                            <div>{index + 1}.</div>
                            <Image className='mx-2' src={item.images[0]?.url} height={75} width={75} rounded/>
                            <div className="fw-bold">{item.name}</div>
                        </div>
                        {getPopularity(item.popularity)}
                    </ListGroup.Item>
                ))}
                </ListGroup>
            </Col>
            <Col md={12} lg={6}>
                <ListGroup as="ol">
                {artists.slice(Math.floor(artists.length / 2)).map((item, index) => (
                    <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-center w-100 mx-auto mb-2"
                    key={item.id}
                    >
                        <div className="ms-2 me-auto d-flex align-items-center">
                            <div >{index + 1 + Math.floor(artists.length / 2)}.</div>
                            <Image className='mx-2' src={item.images[0]?.url} height={75} width={75} rounded/>
                            <div className="fw-bold">{item.name}</div>
                        </div>
                        {getPopularity(item.popularity)}
                    </ListGroup.Item>
                ))}
                </ListGroup>
            </Col>
        </Row>
        
    )
} 