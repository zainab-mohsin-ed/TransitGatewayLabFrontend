import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export default function MealCard({
  mealJSON, setTitle, setUrl, setImgUrl, setId,
}) {
  const mealsData = JSON.parse(mealJSON);
  console.log(mealsData.imageUrl);

  const validJsonString = mealsData.ingredients.replace(/'/g, '"').replace(/½/g, "\u00BD").replace(/¾/g, "\u00BE");

  console.log(validJsonString)

  // Parse the JSON string to an array
  const ingredientsArray = JSON.parse(validJsonString);

  // Log the array to the console
  console.log(ingredientsArray);
   

 
  return (
    <Col xs={12} style={{ paddingBottom: '24px' }}>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={4}>
              <Card.Img
                variant="top"
                src={mealsData.imageUrl}
                alt="Image Not Found"
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </Col>
            <Col xs={8}>
              <Card.Header>{mealsData.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Ingredients:</strong> 
                  <ul>
                    {ingredientsArray.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </Card.Text>
                <Card.Text>
                  <strong>Directions:</strong> {mealsData.instructions}
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
