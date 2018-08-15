import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Quotes extends Component {
  state = {
    quotes: [],
    content: "",
    votes: "",
    isAppropriate: ""
  };

  componentDidMount() {
    this.loadQuotes();
  };

  loadQuotes = () => {
    API.getQuotes()
      .then(res =>
        this.setState({ quotes: res.data, content: "", votes: "", isAppropriate: "" }),
      console.log("Got here")
      )
      .catch(err => console.log(err));
  };

  deleteQuote = id => {
    API.deleteQuote(id)
      .then(res => this.loadQuotes())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    console.log("Handling shit");
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Did submit shit");
    console.log(this.state.content);
    if (this.state.content) {
      API.saveQuote({
        content: this.state.content,
        votes: 0,
        isAppropriate: true
      })
        .then(res => this.loadQuotes())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Bullshit Have You Heard?</h1>
            </Jumbotron>
            <form>       
              <Input
                value={this.state.content}
                onChange={this.handleInputChange}
                name="content"
                placeholder="Quote (required)"
              />
              <FormBtn
                disabled={!(this.state.content)}
                onClick={this.handleFormSubmit}
              >
                Submit Some Shit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Bullshit Other People Have Been Told</h1>
            </Jumbotron>
            {this.state.quotes.length ? (
              <List>
                {this.state.quotes.map(quote => (
                  <ListItem key={quote._id}>
                    <Link to={"/quotes/" + quote._id}>
                      <strong>
                        {quote.content}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteQuote(quote._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Quotes;
