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
    const publicToken = req.token;
    // Exchange public token for access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = exchangeResponse.data.access_token;

    // Now fetch transactions using the access token
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const startDate = thirtyDaysAgo.toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    const transactionsResponse = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
      options: {
        count: 10, // Adjust this value as needed
      },
    });

    const transactions = transactionsResponse.data.transactions;

    // Return the transactions in the response
    return NextResponse.json({ result: transactions }, { status: 200 });
  } catch (error) {
    console.error(`Error in Plaid transactions request: ${error.message}`);
    return NextResponse.json(
      { error: "An error occurred during the Plaid transactions request." },
      { status: 500 }
    );
  }
}
