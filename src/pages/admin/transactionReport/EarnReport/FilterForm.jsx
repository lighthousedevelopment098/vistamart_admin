import React from "react";
import { IoFilter } from "react-icons/io5";
import { Form, Col, Button } from "react-bootstrap";
const FilterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your form submission logic here
  };

  return (
    <div className="card-body snipcss-WAc9G">
      <Form id="form-data" onSubmit={handleSubmit}>
        <h4 className="mb-3">Filter Data</h4>
        <div className="row gy-3 gx-2 align-items-center text-left">
          <Col sm={6} md={3}>
            <Form.Select
              className="form-control __form-control outline-none hover:border-primary"
              name="date_type"
              id="date_type"
            >
              <option value="this_year" selected>
                This Year
              </option>
              <option value="this_month">This Month</option>
              <option value="this_week">This Week</option>
              <option value="today">Today</option>
              <option value="custom_date">Custom Date</option>
            </Form.Select>
          </Col>
          <Col sm={6} md={3} className="style-Xh1Nb" id="from_div">
            <Form.Group className="form-floating">
              <Form.Control
                type="date"
                name="from"
                id="from_date"
                className="form-control"
              />
              <Form.Label>Start Date</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={6} md={3} className="style-Cvapg" id="to_div">
            <Form.Group className="form-floating">
              <Form.Control
                type="date"
                name="to"
                id="to_date"
                className="form-control"
              />
              <Form.Label>End Date</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={6} md={3}>
            <Button
              type="submit"
              className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark  w-100"
            >
              <IoFilter /> Filter
            </Button>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default FilterForm;
