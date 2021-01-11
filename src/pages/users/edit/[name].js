import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";

import baseUrl from "../../../utils/baseUrl";
import UserForm from "../../../components/Users/Form";

const Edit = ({ user }) => {
  return (
    <>
      {user ? (
        <UserForm user={user} isEditing={true} />
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { name } = ctx.query;
  const url = `${baseUrl}/api/users/${name}`;
  const response = await axios.get(url);

  return {
    props: { user: response.data.user },
  };
}

export default Edit;
