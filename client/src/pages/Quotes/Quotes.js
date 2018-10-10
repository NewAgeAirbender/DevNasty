import React, { Component } from "react";
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
    //wanted to add a voting system so people could like their favorites
    votes: "",
    //wanted a way to be able to pull content submitted by trolls
    isAppropriate: ""
  };

  componentDidMount() {
    this.loadQuotes();
  };

  loadQuotes = () => {
    API.getQuotes()
      .then(res =>
        this.setState({ quotes: res.data, content: "", votes: "", isAppropriate: "" })
      )
      .catch(err => console.log(err));
  };

  deleteQuote = id => {
    API.deleteQuote(id)
      .then(res => this.loadQuotes())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
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
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Local Resources</h1>
            </Jumbotron>
            <h4>Meet Ups</h4>
              <a href="https://www.meetup.com/gdimpls/">Girl Develop It MPLS</a><br/>
              <a href="https://www.meetup.com/Women-Who-Code-Twin-Cities/">Women Who Code - Twin Cities</a><br/>
              <a href="https://www.meetup.com/Minneapolis-St-Paul-WordPress-User-Group/">MSP Women Who WP</a><br/>
              <br/><br/>
            <h4>Books</h4>
              <a href="https://www.amazon.com/Lean-Out-Struggle-Equality-Start-Up/dp/1939293863">Lean Out: The Struggle for Gender Equality in Tech and Start-Up Culture</a> edited by Elissa Shevinsky<br/>
              <a href="https://www.amazon.com/Brotopia-Breaking-Boys-Silicon-Valley/dp/0735213534/ref=pd_lpo_sbs_14_t_2?_encoding=UTF8&psc=1&refRID=4PM8MB5Z5MCQXMJ66319">Brotopia: Breaking Up the Boys' Club of Silicon Valley</a> by Emily Chang<br/>
              <a href="https://www.amazon.com/Female-Innovators-Work-Women-Tech/dp/1484223632/ref=mt_paperback?_encoding=UTF8&me=&qid=">Female Innovators at Work: Women on Top of Tech</a> by Danielle Newnham<br />
              <a href="https://www.amazon.com/Life-Code-Personal-History-Technology/dp/0374534519/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr=">Life in Code</a> by Ellen Ullman<br />
              <a href="https://www.amazon.com/Reset-Fight-Inclusion-Lasting-Change/dp/039959101X/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1535167095&sr=1-1">Reset: My Fight for Inclusion and Lasting Change</a> by Ellen Pao<br />
              <a href="https://www.amazon.com/Thrilling-Adventures-Lovelace-Babbage-Computer/dp/0307908275/ref=sr_1_2?ie=UTF8&qid=1505450282&sr=8-2&keywords=ada+lovelace">The Thrilling Adventures of Lovelace and Babbage: The (Mostly) True Story of the First Computer</a> by Sydney Padua<br />
              <a href="https://www.amazon.com/Women-Tech-Practical-Inspiring-Stories/dp/1632170663">Women in Tech</a> by Tarah Wheeler Van Vlack<br />
              <br/><br/>
            <h4>Cool Sites to Check Out</h4>
              <a href="http://shegeeks.net/">SheGeeks</a><br/>
              <a href="http://www.women2.com/">women2.0</a><br />
              <a href="https://femgineer.com/">Femgineer</a><br />
              <a href="https://medium.com/tech-diversity-files">Tech Diversity Files Blog</a><br />
              <a href="https://medium.com/@melindagates">Melinda Gate's Blog</a><br />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Quotes;
