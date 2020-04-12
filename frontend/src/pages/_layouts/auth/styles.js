import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(0deg, #7159c1, #7b68ee);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  max-width: 315px;
  text-align: center;
  align-items: center;
  padding-top: 30px;
  border-radius: 4px;

  img {
    padding-top: 20px;
    padding-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin: 0 15px 15px 0;

    label {
      text-align: left;
      font-size: 12px;
      font-weight: bold;
      color: #333;
      padding: 0 15px;
      margin-top: 10px;
    }

    input {
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #7159c1;
      margin: 0 10px 10px;
    }

    span {
      color: #f64c75;
      margin: 0 0 10px;
    }

    button {
      height: 44px;
      background: #7159c1;
      font-weight: bold;
      font-size: 14px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      margin: 0 10px 10px;
      margin-bottom: 30px;

      &:hover {
        background: ${darken(0.3, '#7159c1')};
      }
    }
  }
`;
