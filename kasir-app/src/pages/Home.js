import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategories, Hasil, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        console.log("response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Yah Error", error);
      });

      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Yah Error", error);
      });
  }

  componentDidUpdate(prevState) {
    if(this.state.keranjangs !== prevState.keranjangs) {
      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Yah Error", error);
      });
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Yah Error", error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses 😃",
                text:
                  keranjang.product.nama + " Berhasil Dimasukan Ke Keranjang",
                icon: "success",
                button: "Oke",
                timer : "2000"
              });
            })
            .catch((error) => {
              console.log("Yah Error", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
          .put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
          .then((res) => {
            swal({
              title: "Sukses 😃",
              text:
                keranjang.product.nama + " Berhasil Dimasukan Ke Keranjang",
              icon: "success",
              button: "Oke",
              timer : "2000"
            });
          })

        }
      })
      .catch((error) => {
        console.log("Yah Error", error);
      });
  };
  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col className="mt-3">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props}/>
            </Row>
          </Container>
        </div>
    );
  }
}
