import { css } from "@emotion/react";
import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px; 
  margin-left: -50px; 
  z-index:999;
  position:fixed
`;

export default function Spinner({loading})
{
    return(
        <ClipLoader color={'#000'} css={override} loading={loading} size={150} />

    )
}