import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Image } from 'react-bootstrap'
import styles from '../styles/ArtistsList.module.css'
import classnames from 'classnames'

export default function ArtistsList({ artists  }) {
    const getPopularity = (score) => {
        let text;
        let bg;
        if (score <= 25) {
            text = 'Who?', bg='who'
        } else if (score <= 50) {
            text = 'Underground', bg='underground'
        } else if (score <= 70) {
            text = 'Rising Star', bg='rising'
        } else if (score <= 85) {
            text = 'Famous', bg='famous'
        } else {
            text = 'Super Star', bg='super'
        }
        return <Badge pill bg={bg} className={'px-3 py-2 badge-' + bg}>{text}</Badge>
    }

    return (
        <>
            <style rel='text/css'>
                {`
                .badge-who {
                    background-color: #245501;
                }

                .badge-underground {
                    background-color: #8cb369;
                }

                .badge-rising {
                    background-color: #f4a259;
                }

                .badge-famous {
                    background-color: #5b8e7d;
                }

                .badge-super {
                    background-color: #bc4b51;
                }
                `}
            </style>
            <Row className='my-5'>
                <Col md={12} lg={6}>
                    <ListGroup as="ol">
                    {artists.slice(0, Math.floor(artists.length / 2)).map((item, index) => (
                        <ListGroup.Item
                        as="li"
                        className="d-flex align-items-center w-100 mx-auto mb-2 bg-success-subtle"
                        key={item.id}
                        >
                            <div className="me-auto d-flex align-items-center">
                                <div>{index + 1}.</div>
                                <Image className={styles.artistImg} src={item.images[0]?.url} height={75} width={75} rounded/>
                                <div className="fw-semibold">{item.name}</div>
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
                        className="d-flex justify-content-between align-items-center w-100 mx-auto mb-2 bg-success-subtle"
                        key={item.id}
                        >
                            <div className="me-auto d-flex align-items-center">
                                <div >{index + 1 + Math.floor(artists.length / 2)}.</div>
                                <Image className={styles.artistImg} src={item.images[0]?.url} height={75} width={75} rounded/>
                                <div className="fw-semibold">{item.name}</div>
                            </div>
                            {getPopularity(item.popularity)}
                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                </Col>
            </Row>
        </>
        
    )
} 