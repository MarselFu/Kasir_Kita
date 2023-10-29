import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
        <>
        {/* web */}
        <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <div style={{ border: "2px solid black", padding: "1rem" }}>
              <h4>
                <strong>Total Harga : </strong>
                <strong className="float-right">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
            </div>
            <Button
              variant="success"
              block
              className="mb-2 mt-4 mr-2"
              size="lg"
              onClick={() => this.submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>

      {/* mobile */}
      <div className="d-sm-block d-md-none">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <div style={{ border: "2px solid black", padding: "1rem" }}>
              <h4>
                <strong>Total Harga : </strong>
                <strong className="float-right">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
            </div>
            <Button
              variant="success"
              block
              className="mb-2 mt-4 mr-2"
              size="lg"
              onClick={() => this.submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>
      </>
    );
  }
}
