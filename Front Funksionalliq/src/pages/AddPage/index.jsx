import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    fetch("http://localhost:7000/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  function deleteById(id) {
    fetch("http://localhost:7000/" + id, { method: "Delete" })
      .then((res) => res.json())
      .then((data) => {
        getAll();
      });
  }

  function handleAdd(val) {
    fetch("http://localhost:7000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    })
      .then((res) => res.json())
      .then((data) => {
        getAll();
      });
  }
  return (
    <>
      <Helmet>
        <title>Add Page</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="addPage">
        <Formik
          initialValues={{ name: "", desc: "", image: "",price: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required(" enter name"),
            desc: Yup.string().required("enter desc"),
            image: Yup.string().required("enter image"),
            price: Yup.number().required("enter price"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              handleAdd(values);
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="name"></label>
            <Field name="name" type="text" placeholder="name"/>
            <ErrorMessage name="name" />
            <br />
            <label htmlFor="desc"></label>
            <Field name="desc" type="text"  placeholder="desc"/>
            <ErrorMessage name="desc" />
            <br />
            <label htmlFor="image"></label>
            <Field name="image" type="text"  placeholder="image"/>
            <ErrorMessage name="image" />
            <br />
            <label htmlFor="price"></label>
            <Field name="price" type="text"  placeholder="price"/>
            <ErrorMessage name="price" />
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
      <br />
      <br />
      <div className="table" >
        <table border={"1px solid black"}>
          <tr>
            <th>image</th>
            <th>name</th>
            <th>desc</th>
            <th>price</th>
            <th>delete</th>
          </tr>
          {products.map((x) => (
            < >
              <tr >
                <th border={"1px solid black"}>
                  <i className={x.image}></i>
                </th>
                <th>
                  <h4>{x.name}</h4>
                </th>
                <th>
                  <p>{x.desc}</p>
                </th>
                <th>${x.price}</th>
                <th>
                  <button onClick={() => deleteById(x._id)}>delete</button>
                </th>
              </tr>
            </>
          ))}
        </table>
      </div>
    </>
  );
}

export default AddPage;
