import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
const SampleLink = () => {
    return (  
        // here you put a simple intro to the page 
        <Container fluid>

        <Jumbotron fluid >
            
        <h1>Lab Information System</h1>
        <p>
          From here you can view all the lab orders you made making it easier to follow up your patianets .
        </p>
        
        </Jumbotron>
            {/* in this row you place the needed information! prefrabley in a jumbtron */}
        <Row>


        </Row>

        </Container>
    );
}
export default SampleLink;