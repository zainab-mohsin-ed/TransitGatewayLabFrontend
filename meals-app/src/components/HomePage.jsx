import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageError from './errorPages/PageError';
import Loading from './loading/Loading';
import useFetch from '../hooks/useFetch';
import CardList from './CardList';

export default function HomePage() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const queryParams = {
    MealName: `${title}`,
    Ingredients:  `${ingredients}`,
    Instructions:  `${instructions}`,
    ImageURL: `${imgUrl}`,
  };

  console.log("AT HOME PAGE")

  // Initializing API Call with a useFetch function
  const {
    data: mealsData,
    success: callSuccess,
    loading: callLoading,
  } = useFetch(
    JSON.stringify(queryParams),
  );

  console.log(callLoading)

  // Function to re-update GraphQL query parameters fetch list of courses
  // when either a course had been added, edited, or deleted
  useEffect(() => {
    setTitle('');
    setIngredients('');
    setInstructions('');
    setImgUrl('');
  }, [callLoading]);

  if (callLoading) {
    return (
      <Loading />
    );
  }

  if (!(callSuccess)) {
    if (!mealsData.success) {
      console.error(`The following errors were encountered:\nError -> ${mealsData.error}\n`);
      return (
        <PageError errorMessage={`The following errors were encountered:\nError -> ${mealsData.error}\n`} />
      );
    }
    return (
      <PageError errorMessage="Oops! Something went wrong" />
    );
  }

  console.log("DOING SMTHN", mealsData)

  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '10px' }}>
          <h1 className="header1-design">Meals List</h1>
        </Row>
        <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <CardList data={mealsData} type="meals" setTitle={setTitle} setIngredients={setIngredients} setImgUrl={setImgUrl} setInstructions={setInstructions} />
        </Row>
        <hr style={{ color: '#ffffff' }} />
      </Col>
    </Container>
  );
}