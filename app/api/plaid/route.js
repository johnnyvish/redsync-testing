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

export async function GET() {
  const request = {
    user: {
      client_user_id: "user-id",
      phone_number: "+1 415 5550123",
    },
    client_name: "Personal Finance App",
    products: ["transactions"],
    transactions: {
      days_requested: 730,
    },
    country_codes: ["US"],
    language: "en",
    android_package_name: "com.johnnyvish.redsyncnative",
    account_filters: {
      depository: {
        account_subtypes: ["checking", "savings"],
      },
      credit: {
        account_subtypes: ["credit card"],
      },
    },
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
