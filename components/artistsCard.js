import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function ArtistsCard({ artists }) {
  const getPopularity = (score) => {
    let text;
    let bg;
    if (score <= 25) {
      (text = "Who?"), (bg = "success");
    } else if (score <= 50) {
      (text = "Underground"), (bg = "primary");
    } else if (score <= 75) {
      (text = "Famous"), (bg = "warning");
    } else {
      (text = "Super Star"), (bg = "danger");
    }
    return (
      <Badge pill bg={bg} className="px-3 py-2">
        {text}
      </Badge>
    );
  };

  return (
    <Row>
      {artists.map((item, index) => (
        <Col key={item.id} sm={12} md={6} lg={4} className="mb-3">
          <Card className="w-75 mx-auto">
              <Card.Img variant="top" src={item.images[0]?.url} />
              <Card.Body>
                <Card.Title>
                  <p> {item.name}</p>
                </Card.Title>
                <Card.Text>{getPopularity(item.popularity)}</Card.Text>
              </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
