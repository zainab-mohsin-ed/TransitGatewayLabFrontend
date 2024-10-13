import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MealCard from './MealCard';
import LoaderCard from './loading/LoaderCard';

function CardList({
  data, type, setField, setTitle, setIngredients, setImgUrl, setInstructions,
}) {
  let listCards = <div />;
  if (data) {
    listCards = data.data.map((object) => {
      const dataObjStr = JSON.stringify(object);
      if (type === 'meals') {
        return (
          <Col key={object.ID} xs={12} style={{ marginBottom: '20px' }}>
            <div className="colored-card card-hover">
              <MealCard
                mealJSON={dataObjStr}
                setField={setField}
                setTitle={setTitle}
                setIngredients={setIngredients}
                setImgUrl={setImgUrl}
                setInstructions={setInstructions}
              />
            </div>
          </Col>
        );
      }
      if (type === 'loader') {
        return (
          <Col key={object.id} xs={12} style={{ marginBottom: '20px' }}>
            <LoaderCard />
          </Col>
        );
      }
      return (<div />);
    });
  } else {
    return (
      <Container fluid>
        <h3 className="header5-design">{`No ${type}s Found`}</h3>
      </Container>
    );
  }
  if (data.length === 0) {
    return (
      <Container fluid>
        <h3 className="header5-design">{`No ${type}s Found`}</h3>
      </Container>
    );
  }
  return (
    <Row className="flex-column">
      { listCards }
    </Row>
  );
}

CardList.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  setField: PropTypes.func,
  setTitle: PropTypes.func,
  setIngredients: PropTypes.func,
  setImgUrl: PropTypes.func,
  setInstructions: PropTypes.func,
};

CardList.defaultProps = {
  setField: null,
  setTitle: null,
  setIngredients: null,
  setImgUrl: null,
  setInstrcutions: null,
};

export default CardList;
