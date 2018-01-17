import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import LHCrawlDelete from './LHCrawlDelete.jsx';
var dateFormat = require('dateformat');

class LHCrawlDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleLHCrawlDelete = this.handleLHCrawlDelete.bind(this);
  }

  handleLHCrawlDelete(id) {
    // id sent from LHSummaryDelete comp to create axios Delete request
    axios.delete('crawlLH/' + id)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentWillMount() {

  }

  render() {
    let url = this.props.url;
    let date = dateFormat(this.props.createdAt);
    let offscreenHelp = this.props.offscreenHelp;
    let offscreenImages = this.props.offscreenImages;

    return (
      <div>
        <Grid>
          <div>
            <div>
              <Row>
                <Col xs={6} md={6}>
                  <h5>{url}</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={3} md={3}>
                  <p>{date}</p>
                </Col>
                <Col xs={9} md={9}>
                  <p>{offscreenHelp}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <p>{offscreenImages}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={4} md={4}>
                  <LHCrawlDelete
                    id={this.props.id}
                    onLHCrawlDelete={ this.handleLHCrawlDelete}
                  />
                </Col>
              </Row>
              <hr/>
            </div>
          </div>
        </Grid>
      </div>
    )
  }
}

export default LHCrawlDetail;
