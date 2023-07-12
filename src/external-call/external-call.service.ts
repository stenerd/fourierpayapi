import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalApiCalls {
  axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  async postData(
    url: string,
    dataToPost: unknown,
    headers: Record<string, any> = {},
  ): Promise<any> {
    let result = null;
    let err = null;

    const axiosHeader = {
      ...this.axiosConfig.headers,
      ...headers,
    };

    try {
      const response = await axios.post(url, dataToPost, {
        headers: axiosHeader,
      });
      console.log('response >> ');

      result = await response.data;
    } catch (error) {
      console.log('error >> ', error.response);
      err = error.response;
    }

    return { result, err };
  }

  async fetchData(
    url: string,
    headers: Record<string, any> = {},
  ): Promise<any> {
    let result = null;
    let err = null;

    const axiosHeader = {
      ...this.axiosConfig.headers,
      ...headers,
    };

    try {
      const response = await axios.get(url, { headers: axiosHeader });
      result = await response.data;
      console.log('response >> ', result);
    } catch (error) {
      console.log('error >> ', error.response);
      err = error.response;
    }

    return { result, err };
  }
}
