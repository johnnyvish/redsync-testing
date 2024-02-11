import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SANDBOX_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(request) {
  try {
    const req = await request.json();
    const token = req.token;
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: token,
    });
    const accessToken = response.data.access_token;
    return NextResponse.json({ result: accessToken }, { status: 200 });
  } catch (error) {
    console.error(`Error with Plaid access token request: ${error.message}`);
    return NextResponse.json(
      { error: "An error occurred during your plaid access token request." },
      { status: 500 }
    );
  }
}
