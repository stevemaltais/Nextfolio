import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Text } from "@nextui-org/react";

console.log(Card, CardHeader, CardBody, CardFooter, Button, Text);

const TestCard = () => {
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
