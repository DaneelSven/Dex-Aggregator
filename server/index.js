const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;
require("dotenv").config();

app.use(cors());

app.get("/pairs", async (req, res) => {
  const { chain } = req.query;

  const url = `https://api.1inch.dev/swap/v6.0/${chain}/tokens`;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    params: {},
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await axios.get(url, config);

    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error in the API request");
  }
});

app.get("/quote", async (req, res) => {
  const { src, dst, amount, from, origin, slippage, chain } = req.query;

  const url = `https://api.1inch.dev/swap/v6.0/${chain}/quote/`;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    params: {
      chain: chain,
      src: src,
      dst: dst,
      amount: amount,
      from: from,
      slippage: slippage,
    },
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await axios.get(url, config);

    console.log("response", response);

    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Error in the API request");
  }
});

app.get("/swap", async (req, res) => {
  const { src, dst, amount, from, origin, slippage, chain } = req.query;

  const url = `https://api.1inch.dev/swap/v6.0/${chain}/swap/`;

  const fee = process.env.FEE;
  const referrer = process.env.REFERRER;

  const config = {
    headers: {
      Authorization: `Bearer iFPdHWv7WJIqdsJNphq0RNnmrMoxCGZX`,
    },
    params: {
      chain: chain,
      src: src,
      dst: dst,
      amount: amount,
      from: from,
      slippage: slippage,
      fee: fee,
      referrer: referrer,
    },
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await axios.get(url, config);

    console.log(
      `Swapping token:${src} with token:${dst} on chain:${chain} with slippage of:${slippage}% with fee:${fee}% and fee receiver:${referrer}`
    );

    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Error in the API request");
  }
});

app.get("/approve", async (req, res) => {
  const { tokenAddress, amount, chain } = req.query;

  const url = "https://api.1inch.dev/swap/v6.0/1/approve/transaction";
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    params: {
      chain: chain,
      tokenAddress: tokenAddress,
      amount: amount,
    },
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await axios.get(url, config);

    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error in the API request");
  }
});

app.listen(PORT, () => {
  console.log(`Swapping server is running on http://localhost:${PORT}`);
});
