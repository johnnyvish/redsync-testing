import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function GET() {
  const request = {
    user: {
      client_user_id: "user-abc",
      email_address: "user@example.com",
    },
    client_name: "redsync",
    products: ["transactions"],
    country_codes: ["US"],
    language: "en",
  };

  try {
    const response = await plaidClient.linkTokenCreate(request);
    const linkToken = response.data.link_token;
    return NextResponse.json({ result: linkToken }, { status: 200 });
  } catch (error) {
    console.error(`Error with Plaid link token request: ${error.message}`);
    return NextResponse.json(
      { error: "An error occurred during your plaid link token request." },
      { status: 500 }
    );
  }
}
