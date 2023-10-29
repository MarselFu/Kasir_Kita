import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {

  componentDidMount() {
    axios
    .get(API_URL + "keranjangs")
    .then((res) => {
      const keranjangs = res.data;
      keranjangs.map(function(item){
        return axios 
            .delete(API_URL + "keranjangs/" + item.id)
            .then ((res) => console.log(res))
            .catch((error) => console.log(error))
      })
    })
    .catch((error) => {
      console.log("Yah Error", error);
    });
}

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="500" />
        <h1>Pesanan Sukses Dibuat ✔</h1>
        <div className="mt-4">
          <h3>Terimakasih Sudah Memesan 😊</h3>
        </div>

        <div className="mt-4">
          <Button variant="primary" as={Link} to="/">
            Kembali Ke Menu Utuma
          </Button>
        </div>
      </div>
    );
  }
}
