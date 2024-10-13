import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function MealCard({
  mealJSON, setTitle, setUrl, setImgUrl, setId,
}) {
  const [readMore, setReadMore] = useState(false);
  
  const mealsData = JSON.parse(mealJSON);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const shortText = mealsData.instructions.slice(0, 180); // Adjust the length as needed

  return (
    <Col xs={12} style={{ paddingBottom: '24px' }}>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={4}>
              <Card.Img
                variant="top"
                src={mealsData.image_name}
                alt="Image Not Found"
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </Col>
            <Col xs={8}>
              <Card.Header>{mealsData.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Ingredients:</strong>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ul>
                      {firstColumn.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <ul>
                      {secondColumn.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </Card.Text>
                <Card.Text>
                  <strong>Directions: </strong> 
                  {readMore ? mealsData.instructions : `${shortText}...`}
                  <Button variant="link" onClick={toggleReadMore} style={{ display: 'inline', padding: 0, marginLeft: '5px' }}>
                    {readMore ? 'Read Less' : 'Read More'}
                  </Button>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

MealCard.propTypes = {
  mealJSON: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  setImgUrl: PropTypes.func.isRequired
};
