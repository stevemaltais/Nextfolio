// pages/testcard.js
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Text } from '@nextui-org/react';

const TestCard = () => {
  // Ajoutez des logs pour vérifier que les composants sont bien importés
  console.log('Card:', Card);
  console.log('CardHeader:', CardHeader);
  console.log('CardBody:', CardBody);
  console.log('CardFooter:', CardFooter);
  console.log('Button:', Button);
  console.log('Text:', Text);

  return (
    <Card>
      <CardHeader>
        <Text h3>Header</Text>
      </CardHeader>
      <CardBody>
        <Text>This is the body of the card.</Text>
      </CardBody>
      <CardFooter>
        <Button>Click Me</Button>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
